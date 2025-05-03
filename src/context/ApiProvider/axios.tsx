import axios from 'axios';
import { getTokenSession, setTokenSession } from '../AuthProvider/session';

const URL_BASE = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
	baseURL: URL_BASE
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});

	failedQueue = [];
};


axiosInstance.interceptors.request.use(

	(config) => {

		let urlRequest = config.url ?? "";

		const PUBLIC_END_POINTS = [
			"/auth/login",
			"/auth/refresh-token",
			"/customer/user",
			"/product/all/home",
			"/product/all/home*",
			"/product/*/photo",
		];

		function matchPath(pattern: string, path: string) {
			const regex = new RegExp('^' + pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*') + '$');
			return regex.test(path);
		}

		let isAuthenticable = true;

		for (const pattern of PUBLIC_END_POINTS) {
			if (matchPath(pattern, urlRequest)) {
				isAuthenticable = false;
			}
		}

		if (isAuthenticable) {
			const token = getTokenSession();
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		config.headers['Content-Type'] = 'application/json';
		return config;

	},

	(error) => {
		Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(

	(response) => {
		// Se a requisição der sucesso, retorna a resposta
		return response;
	},

	async error => {

		const originalRequest = error.config;

		const message = error.response?.data?.message;
		const regex = /token/i; // Case-insensitive search for "world"

		// Se a requisição der erro, verifica se o erro é de autenticação
		const isTokenExpired =regex.test(message); // true
		
		if (error.response?.status === 401 && !originalRequest._retry && isTokenExpired) {


			// Se o erro for de autenticação, verifica se o erro foi de token expirado

			console.log('Refreahing token...');

			if (isRefreshing) {

				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers['Authorization'] = `Bearer ${token}`;
						return axiosInstance(originalRequest);
					})
					.catch(err => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await axiosInstance.post('/auth/refresh-token', { 'token': getTokenSession() });
				const newToken = response.data.token;
				setTokenSession(newToken);

				axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

				processQueue(null, newToken);
				return axiosInstance(originalRequest);

			} catch (err) {
				console.log('erro ao atualizar token', err);
				processQueue(err, null);
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}

		}

		return Promise.reject(error);
	}

);

export default axiosInstance;


