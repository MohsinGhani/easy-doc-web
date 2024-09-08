"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";
import { Amplify } from "aws-amplify";
import { userPoolId, identityPoolId, userPoolClientId } from "@/constants";
import { authThunks } from "./features/auth/authThunks";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPoolId!,
      identityPoolId: identityPoolId!,
      userPoolClientId: userPoolClientId!,
    },
  },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    if (!isClient) {
      return null;
    }

    storeRef.current = makeStore();
    storeRef.current.dispatch(authThunks.initializeAuth());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
