import axios from 'axios';
import { AxiosError } from 'axios';

export interface errorResponse {
    expiredAt: string;
    message: string;
    name: string;
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            config.headers.Authorization = access_token;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error?.response?.status === 403) {
        const ForbiddenError = (error.response.data as { error: errorResponse }).error;
        throw ForbiddenError;
    }

    return Promise.reject(error);
});

export default axiosInstance;
