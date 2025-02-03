
import axios, { AxiosError } from 'axios';
import { getSession } from '../AuthProvider/session';
import { ApiToken, ApiUser } from './Auth/types';
import { useAuth } from '../AuthProvider/useAuth';
import { useAppShop } from '../AppProvider/useAppShop';

const URL_BASE = import.meta.env.VITE_API_URL;

let isRefreshing = false;

// Variavel para armazenar a fila de requisições que falharam por token expirado

let failedRequestQueue: {
    // Se a requisição der sucesso, chama o onSuccess
    onSuccess: (token: string) => void;
    // Se a requisição der erro, chama o onFailure
    onFailure: (err: AxiosError) => void;
}[] = [];

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


axiosInstance.interceptors.response.use(

    (response) => {

      // Se a requisição der sucesso, retorna a resposta

      return response;

    },

    (error: AxiosError) => {

      // Se a requisição der erro, verifica se o erro é de autenticação
      console.log(error.response);

      if (error.response?.status === 401) {

        const auth = useAuth();
        const app = useAppShop();
        // Se o erro for de autenticação, verifica se o erro foi de token expirado
        console.log(error.response.data);

        if (error.response.data === "token") {

          // Recupera o refresh token do localStorage

          const refreshToken = localStorage.getItem("refreshToken");

          // Recupera toda a requisição que estava sendo feita e deu erro para ser refeita após o refresh token

          const originalConfig = error.config;


          // Verifica se já existe uma request de refreshToken acontecendo

          if (!isRefreshing) {

            // Se não existir, inicia a requisição de refreshToken

            isRefreshing = true;


            // Faz uma requisição de refreshToken
            app.setMessage("Refreshing token");
            console.log('refresh token');
            axiosInstance.post("/auth/refresh-token", {refreshToken,})

              .then((response) => {

                // Recupera os dados do response e cria o newRefreshToken por que já está sendo utilizado a variável refreshToken

                const { token: newRefreshToken } = response.data.token as ApiToken;


                // Salva o token no localStorage

                localStorage.setItem("token", newRefreshToken);

                // Salva o refreshToken no localStorage

                localStorage.setItem("refreshToken", newRefreshToken);


                // Define novamente o header de autorização nas requisições

                axiosInstance.defaults.headers["Authorization"] = 'Bearer ' + newRefreshToken


                // Faz todas as requisições que estavam na fila e falharam

                failedRequestQueue.forEach((request) =>

                  request.onSuccess(newRefreshToken)

                );

                // Limpa a fila de requisições que falharam

                failedRequestQueue = [];

              })

              .catch((err) => {

                // Retorna os erros que estão salvos na fila de requisições que falharam

                failedRequestQueue.forEach((request) => request.onFailure(err));

                // Limpa a fila de requisições que falharam

                failedRequestQueue = [];


                // Caso der erro desloga o usuário

                 auth.SignOut();

              })

              .finally(() => {

                // Indica que a requisição de refreshToken acabou
                app.setMessage("");
                isRefreshing = false;

              });

          }


          // Usando a Promise no lugar do async await, para que a requisição seja feita após o refresh token

          return new Promise((resolve, reject) => {

            // Adiciona a requisição na fila de requisições que falharam com as informações necessárias para refazer a requisição novamente

            failedRequestQueue.push({

              // Se a requisição der sucesso, chama o onSuccess

              onSuccess: (token: string) => {

                // Adiciona o novo token gerado no refresh token no header de autorização
                if (originalConfig) {
                originalConfig.headers["Authorization"] = 'Bearer ' + token;


                // Faz a requisição novamente passando as informações originais da requisição que falhou

                resolve(axiosInstance(originalConfig));
                }

              },

              // Se a requisição der erro, chama o onFailure

              onFailure: (err: AxiosError) => {

                // Se não for possivel refazer a requisição, retorna o erro

                reject(err);

              },

            });

          });

        } else {

          // Caso der erro desloga o usuário

          auth.SignOut();

        }

      }


      // Se não cair em nenhum if retorna um error padrão

      return Promise.reject(error);

    }

  );

export default axiosInstance;