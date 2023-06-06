import axiosInstance from './index';
import { loginForm } from '../types/authType';

export const login = (form: loginForm) => axiosInstance.post('/auth/login', form);
export const refresh = (refreshToken: string) => axiosInstance.post('/auth/refresh', { refreshToken: refreshToken });
