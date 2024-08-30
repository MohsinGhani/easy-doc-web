"use client";

import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initializeAuthState } from "@/lib/features/auth/authSlice";
import Cookies from "js-cookie";

import { Amplify } from "aws-amplify";
import {
  userPoolId,
  identityPoolId,
  userPoolClientId,
  API_URL,
} from "@/constants";
import axios from "axios";
import { useAppSelector } from "./hooks";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: userPoolId!,
      identityPoolId: identityPoolId!,
      userPoolClientId: userPoolClientId!,
    },
  },
});

const configureAxios = (token: string) => {
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("🚀 ~ configureAxios ~ error:", error);
      }
      return Promise.reject(error);
    }
  );
};

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
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      configureAxios(token);
    }
  }, [token]);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    if (!isClient) {
      return null;
    }

    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeAuthState());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
