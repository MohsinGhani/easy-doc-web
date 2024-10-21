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
      userPoolId: userPoolId,
      identityPoolId: identityPoolId,
      userPoolClientId: userPoolClientId,
    },
  },
});

export async function middleware(req: NextRequest, res: NextResponse) {
  try {
    const { pathname } = req.nextUrl;

    const isPublicRoute = publicRoutes.some((route) => route === pathname);
    const isPatientRoute = patientRoutes.some((route) => route === pathname);
    const isDoctorRoute = doctorRoutes.some((route) => route === pathname);
    const isAdminRoute = adminRoutes.some((route) => route === pathname);

    const cookies = req.cookies;

    const token = Array.from(cookies.getAll()).find((key) =>
      key.name.includes(".idToken")
    )?.value;

    // Redirect if trying to access protected routes without token
    if (!token && (isAdminRoute || isDoctorRoute || isPatientRoute)) {
      return NextResponse.redirect(new URL(getUrl(""), req.url));
    }

    const { "custom:role": role } = decodeJWT(token as string).payload;

    // Handle role-based redirection
    if ((isPublicRoute && role) || (role && pathname === "/")) {
      return NextResponse.redirect(new URL(getUrl(role as string), req.url));
    }

    if (!role) return NextResponse.redirect(new URL(getUrl(""), req.url));

    // Role-based access control
    if (isDoctorRoute && role !== "doctor") {
      return NextResponse.redirect(new URL(getUrl(role as string), req.url));
    }

    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL(getUrl(role as string), req.url));
    }

    if (isPatientRoute && role !== "patient") {
      return NextResponse.redirect(new URL(getUrl(role as string), req.url));
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

const getUrl = (role?: string): string => {
  if (!role) {
    return "/auth/sign-in";
  } else if (role === "admin") {
    return "/admin";
  } else if (role === "patient") {
    return "/doctors";
  } else if (role === "doctor") {
    return "/dashboard";
  } else {
    return "/auth/sign-up";
  }
};
