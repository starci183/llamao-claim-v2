/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: { "Content-Type": "application/json" },
});

let authReqInterceptorId: number | null = null;
let respInterceptorId: number | null = null;

// External hook-in for unauthorized behavior (set from AuthProvider)
let onUnauthorized: (() => Promise<void> | void) | null = null;
let handlingUnauthorized = false; // guard to avoid duplicate redirects

export const setUnauthorizedHandler = (handler: () => Promise<void> | void) => {
  onUnauthorized = handler;
};

export const attachAuthHeader = (token: string | null) => {
  if (authReqInterceptorId !== null) {
    axiosClient.interceptors.request.eject(authReqInterceptorId);
    authReqInterceptorId = null;
  }
  authReqInterceptorId = axiosClient.interceptors.request.use((cfg) => {
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  });
};

// Setup response interceptor (once)
const setupResponseInterceptor = () => {
  if (respInterceptorId !== null) {
    axiosClient.interceptors.response.eject(respInterceptorId);
  }
  respInterceptorId = axiosClient.interceptors.response.use(
    (res) => res,
    async (error: any) => {
      // Handle cancellation errors silently - they are expected
      if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") {
        return Promise.reject(error);
      }

      const status = error?.response?.status;
      if (status === 401 && !handlingUnauthorized) {
        handlingUnauthorized = true;
        try {
          // let the app decide what "logout" means
          if (onUnauthorized) await onUnauthorized();
        } finally {
          handlingUnauthorized = false;
        }
      }
      return Promise.reject(error);
    }
  );
};

setupResponseInterceptor();

export default axiosClient;
