import { createContext, useEffect, useState } from 'react';
import { AuthContextData, AuthContextChildrens, LoginPayload } from './types';
import { getSession, setSession } from './session';
import { ApiUser } from '../ApiProvider/types';
import { useApi } from '../ApiProvider/useApi';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextChildrens) => {

    const api = useApi();

    const [user, setUser] = useState<ApiUser | null>(null);

    async function SignIn(data: LoginPayload) {

        try {

            const responseToken = await api.RequestLogin(data);
            const apiUser: ApiUser = {};
            apiUser.token = responseToken.token;
            setSession(apiUser);

            if (responseToken.token) {
                const responseUser = await api.RequestUserAuthenticated();
                apiUser.nome = responseUser.nome;
                apiUser.email = responseUser.email;
                apiUser.rules = responseUser.rules;
                setUser(apiUser);
            }

        } catch (excpetion: any) {
            throw excpetion;
        }
    }

    function SignOut() {
        setUser(null);
        setSession(null);
    }

    useEffect(() => {
        setUser(getSession());
    }, []);

    return (
        <AuthContext.Provider value={{ SignIn, SignOut, user, signed: Boolean(user) }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;



