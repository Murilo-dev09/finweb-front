import { useState } from "react";
import { transacaoService } from "../services/transacaoService";

export function ModalNovaTransacao({isOpen, onClose, onSuccess}) {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('OUTROS');
    const [tipoTransacao, setTipoTransacao] = useState('DESPESA');

    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setErro('');

        try {

            const dadosTransacao = {
                descricao,
                valor: Number(valor),
                data: data + ':00',
                categoria,
                tipoTransacao

            };

            await transacaoService.criarTransacao(dadosTransacao);

            setDescricao('');
            setValor('');
            setData('');

            onSuccess();

        } catch(error) {
            setErro("Erro ao salvar transação. Verifique os dados.")
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    if(!isOpen) return null;

    return(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 ">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Nova Transação</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
                    </div>

                    {erro && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">{erro}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <input type="text" required value={descricao} onChange={(e) => setDescricao(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 outline-none" placeholder="Ex: Compras Farmácia"/>
                        </div>

                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                                <input type="number" step="0.01" required value={valor} onChange={(e) => setValor(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 outline-none" placeholder="Ex: 0.00"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                                <input type="datetime-local" required value={data} onChange={(e) => setData(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 outline-none" placeholder="Ex: 0.00"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                <select value={tipoTransacao} onChange={(e) => setTipoTransacao(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                                >
                                    <option value="DESPESA">DESPESA (-)</option>
                                    <option value="RECEITA">RECEITA (+)</option>  
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                                >
                                    <option value="MERCADO">MERCADO</option>
                                    <option value="ALIMENTACAO">ALIMENTACAO</option>
                                    <option value="LAZER">LAZER</option>
                                    <option value="TRANSPORTE">TRANSPORTE</option>
                                    <option value="SAUDE">SAUDE</option>
                                    <option value="ALUGUEL">ALUGUEL</option>
                                    <option value="ASSINATURA">ASSINATURA</option>
                                    <option value="FACULDADE">FACULDADE</option>
                                    <option value="COMPRAS_INTERNET">COMPRAS_INTERNET</option>
                                    <option value="ENERGIA">ENERGIA</option>
                                    <option value="AGUA">AGUA</option>
                                    <option value="GASOLINA">GASOLINA</option>
                                    <option value="OUTROS">OUTROS</option>
                                    <option value="INTERNET">INTERNET</option>
                                    <option value="VALE">VALE</option>
                                    <option value="SALARIO">SALARIO</option>
                                    <option value="RENDA_EXTRA">RENDA_EXTRA</option>
                                    <option value="VENDA">VENDA</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button type="button" onClick={onClose} className="w-full border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50">
                                Cancelar
                            </button>

                            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg disable:opacity-70">
                                {loading ? 'Salvando' : 'Salvar'}
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        );

    
    

}