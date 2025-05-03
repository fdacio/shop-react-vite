import { createContext, ReactNode, useEffect, useState } from 'react';
import { useApi } from '../ApiProvider/useApi';
import { setUserSession, setTokenSession, clearSession, getUserSession } from './session';
import { AuthContextData, ApiLogin } from './types';
import { ApiUser } from '../ApiProvider/Auth/types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {

    const api = useApi();

    const [user, setUser] = useState<ApiUser | null>(null);

    async function SignIn(payload: ApiLogin) {

        try {

            const apiToken = await api.ApiAuth.RequestLogin(payload);
            const token = apiToken.token;
            if (token) {
                setTokenSession(token);
                const responseUser = await api.ApiAuth.RequestUserAuthenticated();
                const apiUser: ApiUser = {                    
                    nome  : responseUser.nome,
                    email : responseUser.email,
                    rules : responseUser.rules
                };
                setUserSession(apiUser);
                setUser(apiUser);
            }

        } catch (excpetion: any) {
            throw excpetion;
        }
    }

    function SignOut() {
        clearSession();
        setUser(null);
    }

    useEffect(() => {
        const userSession = getUserSession();
        setUser(userSession);    
    },[]);


    return (
        <AuthContext.Provider value={{ SignIn, SignOut, user, signed: Boolean(user) }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;



