import { api } from './api';

export const transacaoService = {

    obterResumo: async() => {
        const response  = await api.get('/transacoes/dashboard');   
        return response.data;
    },

    listarTransacoes: async(pagina = 0) => {
        const response = await api.get(`/transacoes?page=${pagina}&size=10&sort=data,asc`);
        return response.data;
    },

    criarTransacao: async(dadosTransacao) => {
        const response = await api.post('/transacoes', dadosTransacao);
        return response.data;
    },

    excluirTransacao: async(id) =>{
        await api.delete(`/transacoes/${id}`);
    },

    listarPorCategoria: async(categoria, pagina = 0) => {
        const response = await api.get(`transacoes/por-categoria?categoria=${categoria}&page=${pagina}&size=10&sort=data,desc`);
        return response.data;
    }
};