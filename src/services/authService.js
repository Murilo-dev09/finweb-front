import { api } from "./api";

export const authService = {
    cadastrar: async (email, senha) => {
        try{
            const response = await api.post('/login/cadastrar', { email, senha });
            return response.data;

        } catch (error){
            const mensagemErro = error.response?.data?.message || "Erro ao cadastrar usuário.";
            throw new Error(mensagemErro);
        }

    }
};
