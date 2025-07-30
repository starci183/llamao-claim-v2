import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  headers: { "Content-Type": "application/json" },
});

let authInterceptorId: number | null = null;

/** Helper so we can replace the interceptor when the token changes */
export const attachAuthHeader = (token: string | null) => {
  // eject previous interceptor (if any)
  if (authInterceptorId !== null) {
    axiosClient.interceptors.request.eject(authInterceptorId);
    authInterceptorId = null;
  }

  if (token) {
    console.log("token", token);
    authInterceptorId = axiosClient.interceptors.request.use((cfg) => {
      cfg.headers!.Authorization = `Bearer ${token}`;
      return cfg;
    });
  }
};

export default axiosClient;
