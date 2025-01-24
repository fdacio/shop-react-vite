
import axios from 'axios';
import { ApiUser } from './types';
import { getSession } from '../AuthProvider/session';

const URL_BASE = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: URL_BASE
});

axiosInstance.interceptors.request.use(
    
    (config) => {

        const apiUser: ApiUser = getSession();
        
        if (apiUser) {
            const token = apiUser.token;
            config.headers['Authorization'] = 'Bearer ' + token
        }

        config.headers['Content-Type'] = 'application/json';
        return config;

    },

    (error) => {
        Promise.reject(error)
    }
)

export default axiosInstance;