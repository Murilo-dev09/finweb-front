import { api } from "./api";

export const relatorioService = {
    baixarRelatorioTransacoes: async () => {
        const response = await api.get('/relatorios/transacoes', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio-finweb.pdf');
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}
