import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import errorMessage from "../../errorMessage";
import { cookies } from "@/lib/cookies";
import { useStore } from "@/context/StoreContext";


export const clientSideAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  timeout: 6000,

  headers: {},
  // Removed invalid 'credentials' property
});

// Add a request interceptor

clientSideAxios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = cookies.get("jwt")

    if (token && config.headers.Authorization !== token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error: AxiosError): Promise<never> {

    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientSideAxios.interceptors.response.use(

  function (response: AxiosResponse): AxiosResponse {

    // Do something with response data
    return response;
  },
  function (error: AxiosError): Promise<never> {
    if (error.code === "ECONNABORTED") {
      errorMessage("The request took too long to complete. Please try again later.");
    }



    // Example handling 401
    if (error.response?.status === 401) {
      errorMessage("Unauthorized access. Please log in again.");
      // Optionally, you can redirect the user to the login page or show a modal

      cookies.remove("jwt"); // Remove the JWT token from cookies
      cookies.remove("user_info"); // Remove the user data from cookies
      window.location.href = "/signin"; // Redirect to login page

    }

    return Promise.reject(error);
  }
);
