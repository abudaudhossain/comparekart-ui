import axios, {
    AxiosInstance,
   
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from "axios";

export const instance: AxiosInstance = axios.create({
    baseURL: "https://some-domain.com/api/",
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        // Do something before request is sent
        return config;
    },
    function (error: AxiosError): Promise<never> {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response: AxiosResponse): AxiosResponse {
        // Any status code within the range of 2xx triggers this function
        return response;
    },
    function (error: AxiosError): Promise<never> {
        // Any status codes outside the range of 2xx trigger this function
        return Promise.reject(error);
    }
);
