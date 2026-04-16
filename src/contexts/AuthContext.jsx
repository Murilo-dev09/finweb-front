import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }){
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('@Finweb:token');
        if(token){
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUsuario({ email: "Usuário Logado" });
        }
    }, []);

    async function efetuarLogin(email, senha){
        try{
            

            //Limpa o token antigo antes de tentar um novo login, para evitar usar um token inválido
            delete api.defaults.headers.Authorization;
            localStorage.removeItem('@Finweb:token');

            //email e senha que mandamos para o backend
            const response = await api.post('/login', { email, senha});

            //token que recebemos do backend(a parte do data dele que tem o token) existem tambem status e headers.
            const {token} = response.data;

            localStorage.setItem('@Finweb:token', token);

            api.defaults.headers.Authorization = `Bearer ${token}`; 

            setUsuario({ email });

            return true;

            //Se der erro no try, o JavaScript pega esse erro e entrega pra mim dentro do catch, e eu escolho o nome da variável pra acessar ele
        } catch (error){
            console.error("Erro na autenticação:", error);
            throw new Error("E-mail ou senha inválidos.");
        }
    }

    function efetuarLogout(){
        localStorage.removeItem('@Finweb:token');
        delete api.defaults.headers.Authorization;
        setUsuario(null);
    }

    return(
        <AuthContext.Provider value={{ usuario, logado: !!usuario, efetuarLogin, efetuarLogout }}>
            {children}
        </AuthContext.Provider>
    );
}
