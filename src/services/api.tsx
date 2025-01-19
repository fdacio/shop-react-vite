
import axios from 'axios';
import { UserApi } from '../context/AuthProvider/types';
import { getSession } from '../context/AuthProvider/session';

const api = axios.create({
    baseURL: 'http://138.197.210.74:8880', //Pegar .env
});


axios.interceptors.request.use(
    
    (config) => {
        const userApi: UserApi = getSession();
        const token = userApi.token;
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },

    (error) => {
        Promise.reject(error)
    }
)

export default api;