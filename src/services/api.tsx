
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://138.197.210.74:8880',
});

export default api;