import { useEffect, useState } from "react";
import { transacaoService } from "../services/transacaoService";

export function ModalAlterarTransacao({
  isOpen,
  onClose,
  onSuccess,
  transacaoSelecionada,
}) {
  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (transacaoSelecionada) {
      setId(transacaoSelecionada.id);
      setDescricao(transacaoSelecionada.descricao);
      setValor(transacaoSelecionada.valor);
      setCategoria(transacaoSelecionada.categoria);
    }
  }, [transacaoSelecionada]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const dadosAlterarTransacao = {
        id,
        descricao,
        valor: Number(valor),
        categoria,
      };

      await transacaoService.alterarTransacao(dadosAlterarTransacao);

      setId(0);
      setDescricao("");
      setValor(0);
      setCategoria("");

      onSuccess();
    } catch (error) {
      setErro("Erro ao alterar transação");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Alterando Transação
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {erro && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desricao
            </label>
            <input
              type="text"
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus-ring-blue-500 outline-none"
            ></input>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 outline-none"
              ></input>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <select
                value={categoria}
                required
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring-blue-500 outline-none"
              >
                <option value="AGUA">AGUA</option>
                <option value="ALIMENTACAO">ALIMENTACAO</option>
                <option value="ALUGUEL">ALUGUEL</option>
                <option value="ASSINATURA">ASSINATURA</option>
                <option value="CAIXINHA">CAIXINHA</option>
                <option value="COMPRAS_INTERNET">COMPRAS_INTERNET</option>
                <option value="ENERGIA">ENERGIA</option>
                <option value="FACULDADE">FACULDADE</option>
                <option value="GASOLINA">GASOLINA</option>
                <option value="INTERNET">INTERNET</option>
                <option value="LAZER">LAZER</option>
                <option value="MERCADO">MERCADO</option>
                <option value="OUTROS">OUTROS</option>
                <option value="POUPANCA">POUPANCA</option>
                <option value="RENDA_EXTRA">RENDA_EXTRA</option>
                <option value="SALARIO">SALARIO</option>
                <option value="SAUDE">SAUDE</option>
                <option value="TRANSPORTE">TRANSPORTE</option>
                <option value="VALE">VALE</option>
                <option value="VENDA">VENDA</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 rounded-lg text-gray-700 font-semibold py-2.5"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg disable:opacity-70"
            >
              {loading ? "Confirmando Alterações" : "Confirmar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
