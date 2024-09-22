import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const createApiClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL: baseURL,
    responseType: "json",
  });

  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        if (idToken) {
          config.headers.Authorization = `Bearer ${idToken}`;
        } else {
          console.warn("No access token available");
        }
      } catch (error) {
        console.error("Error fetching auth token", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest._retry) {
        console.log("401 Unauthorized error, trying to refresh token");
        try {
          const session = await fetchAuthSession({ forceRefresh: true });
          const refreshToken = session.tokens?.idToken?.toString();
          if (refreshToken) {
            console.log("Refresh token obtained:", refreshToken);
            originalRequest.headers.Authorization = `Bearer ${refreshToken}`;
            originalRequest._retry = true;
            return apiClient(originalRequest);
          } else {
            console.warn("No refresh token available");
          }
        } catch (authError) {
          console.error("Error refreshing auth token", authError);
          return Promise.reject(authError);
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
