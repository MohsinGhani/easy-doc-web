import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { userPoolId, identityPoolId, userPoolClientId } from "./constants";
import {
  // patientRoutes,
  privateRoutes,
  publicRoutes,
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
    const isProtectedRoute = privateRoutes.includes(pathname);
    // const isPatientRoute = patientRoutes.includes(pathname) || pathname === "/";
    const token = req.cookies.get("token")?.value || "";

    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    const { "custom:role": role } = decodeJWT(token).payload;

    if (!role) return NextResponse.redirect(new URL("/auth/sign-in", req.url));

    if (isPublicRoute && token) {
      return NextResponse.redirect(
        new URL(
          role === "doctor" ? "/dashboard" : role === "admin" ? "/admin" : "/",
          req.url
        )
      );
    }

    // if (isPatientRoute && role !== "patient") {
    //   return NextResponse.redirect(
    //     new URL(role === "doctor" ? "/dashboard" : "/admin", req.url)
    //   );
    // }

    return NextResponse.next();
  } catch (error: any) {
    console.log("🚀 ~ middleware ~ error:", error);
    return null;
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
