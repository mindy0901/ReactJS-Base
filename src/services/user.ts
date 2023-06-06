import axiosInstance from './index';

export const getMe = () => axiosInstance.get('/api/users/me');
