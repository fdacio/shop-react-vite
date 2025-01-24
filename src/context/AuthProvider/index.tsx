import { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiUser } from '../ApiProvider/types';
import { useApi } from '../ApiProvider/useApi';
import { getSession, setSession } from './session';
import { AuthContextData, ApiLogin } from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {

    const api = useApi();

    const [user, setUser] = useState<ApiUser | null>(null);

    async function SignIn(payload: ApiLogin) {

        try {

            const responseToken = await api.RequestLogin(payload);
            const apiUser: ApiUser = {token: responseToken.token};
            setSession(apiUser);

            if (responseToken.token) {
                const responseUser = await api.RequestUserAuthenticated();
                console.log(responseUser);
                apiUser.nome = responseUser.nome;
                apiUser.email = responseUser.email;
                apiUser.rules = responseUser.rules;
                setUser(apiUser);
                setSession(apiUser);
            }

        } catch (excpetion: any) {
            console.log(excpetion);
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



