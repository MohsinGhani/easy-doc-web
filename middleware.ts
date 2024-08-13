import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";

// Importing the constants from the constants file
import { userPoolId, identityPoolId, userPoolClientId } from "./constants";

// Configuring Amplify with the Cognito credentials
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPoolId!,
      identityPoolId: identityPoolId!,
      userPoolClientId: userPoolClientId!,
    },
  },
});

/**
 * Middleware function to handle authentication and authorization
 * @param {NextRequest} req - The request object
 * @param {NextResponse} res - The response object
 * @returns {Promise<NextResponse>} - The next response object
 */
export async function middleware(req: NextRequest, res: NextResponse) {
  // Getting the token from the cookies
  const token = req.cookies.get("token")?.value || "";
  // Getting the pathname from the request
  const { pathname } = req.nextUrl;

  // If the user is not authenticated and trying to access the /auth or root path, allow access
  if ((!token && pathname.startsWith("/auth")) || pathname === "/") {
    return NextResponse.next();
  }
  // If the user is not authenticated and trying to access any other path, redirect to sign-in
  else if (!token && !pathname.startsWith("/auth") && pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  try {
    // Decoding the JWT token to get the email verification status and role
    const { email_verified, "custom:role": role } = decodeJWT(token).payload;

    // If the email is not verified, redirect to confirm-email
    if (!email_verified) {
      return NextResponse.redirect(new URL("/auth/confirm-email", req.url));
    }

    // If the user is logged in and trying to access the /auth or root path, redirect to home
    if (email_verified && pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If the email is verified, allow access
    return NextResponse.next();
  } catch (error: any) {
    // If there is an error decoding the token, default to redirect to sign-in if not authorized and not in /auth path
    if (!pathname.startsWith("/auth") && pathname !== "/") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Continue to next if none of the conditions were met
  return NextResponse.next();
}

// Configuration for the route matching
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
