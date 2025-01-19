import { createContext, useEffect, useState } from 'react';
import { AuthContextData, AuthContextChildrens, UserApi, LoginData } from './types';
import api from '../../services/api';
import { getSession, setSession } from './session';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } :AuthContextChildrens ) => {
    
    const [user, setUser] = useState<UserApi | null>(null);

    async function SignIn(data: LoginData) {

        try {

            const responseLogin = await api.post('/auth/login', data);

            if (responseLogin.data.token) {
                api.defaults.headers.Authorization = `Bearer ${responseLogin.data.token}`
                const responseUser = await api.post('/auth/user/authenticated');
                const userApi: UserApi = {
                    nome: responseUser.data.nome,
                    email: responseUser.data.email,
                    token: responseLogin.data.token,
                    rules: responseUser.data.rules
                }

                setUser(userApi);
                setSession(userApi);
            }

        } catch (excpetion: any) {
            throw excpetion;
        }
    }

    function SignOut() {
        setUser(null);
        setSession(null);
    }
 
    useEffect(()=>{
        setUser(getSession());
    },[]);

    return (
        <AuthContext.Provider value={{ SignIn, SignOut, user, signed: Boolean(user) }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

