import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { userPoolId, identityPoolId, userPoolClientId } from "./constants";
import {
  publicRoutes,
  doctorRoutes,
  adminRoutes,
  patientRoutes,
} from "./Routes";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPoolId!,
      identityPoolId: identityPoolId!,
      userPoolClientId: userPoolClientId!,
    },
  },
});

export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    const { pathname } = req.nextUrl;

    const isPublicRoute = publicRoutes.includes(pathname);
    const isPatientRoute = patientRoutes.includes(pathname);
    const isDoctorRoute = doctorRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);

    const cookies = req.cookies;

    const token = Array.from(cookies.getAll()).find((key) =>
      key.name.includes(".idToken")
    )?.value;

    if (
      (!token && isAdminRoute) ||
      (!token && isDoctorRoute) ||
      (!token && isPatientRoute)
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    const { "custom:role": role } = decodeJWT(token as string).payload;

    if ((isPublicRoute && role) || (role && pathname === "/")) {
      return NextResponse.redirect(
        new URL(
          role === "doctor"
            ? "/dashboard"
            : role === "admin"
            ? "/admin"
            : "/doctors",
          req.url
        )
      );
    }

    if (!role) return NextResponse.redirect(new URL("/auth/sign-in", req.url));

    if (isDoctorRoute && role !== "doctor") {
      return NextResponse.redirect(
        new URL(role === "patient" ? "/doctors" : "/admin", req.url)
      );
    }

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(
        new URL(role === "patient" ? "/doctors" : "/dashboard", req.url)
      );
    }

    if (isPatientRoute && role !== "patient") {
      return NextResponse.redirect(
        new URL(role === "admin" ? "/admin" : "/dashboard", req.url)
      );
    }

    return NextResponse.next();
  } catch (error: any) {
    console.log("🚀 ~ middleware ~ error:", error);
    return null;
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
