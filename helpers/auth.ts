import { userPoolClientId } from "@/constants";
import { decodeJWT } from "aws-amplify/auth";
import Cookies from "js-cookie";

export const handleTokenStorage = (userId: string) => {
  const token =
    localStorage.getItem(
      `CognitoIdentityServiceProvider.${userPoolClientId}.${userId}.idToken`
    ) || "";

  if (!Cookies.get("token")) {
    Cookies.set("token", token);
  }

  return decodeJWT(token).payload;
};
