import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { transacaoService } from "../services/transacaoService";
import { ModalNovaTransacao } from "../components/ModalNovaTransacao";
import { ModalAlterarTransacao } from "../components/ModalAlterarTransacao";

export function DashboardPage() {
  const { usuario, efetuarLogout } = useContext(AuthContext);

  const [resumo, setResumo] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldo: 0,
  });
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAlterarOpen, setIsModalAlterarOpen] = useState(false);
  const [memoria, setMemoria] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");

  async function carregarDados() {
    setLoading(true);

    try {
      const dadosResumo = await transacaoService.obterResumo();
      setResumo(dadosResumo);

      if (filtroCategoria === "") {
        const dadosPagina = await transacaoService.listarTransacoes(0);
        setTransacoes(dadosPagina.content);
      } else {
        const dadosCategoria = await transacaoService.listarPorCategoria(
          filtroCategoria,
          0,
        );

        setTransacoes(dadosCategoria.listarCategoria.content);
      }
    } catch (error) {
      console.error(error);
      alert("Sessão expirada.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExcluir(id) {
    const confirmou = window.confirm("Tem certeza que deseja excluir?");

    if (confirmou) {
      try {
        await transacaoService.excluirTransacao(id);

        carregarDados();
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir transação.");
      }
    }
  }

  useEffect(() => {
    carregarDados();
  }, [filtroCategoria]);

  if (loading)
    return (
      <div className="p-8 text-center mt-20 text-xl">Buscando finanças...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Meu Dashboard</h1>
            <p className="text-gray-500">Bem vindo, {usuario?.email}!</p>
          </div>
          <button
            onClick={efetuarLogout}
            className="text-red-600 hover:underline"
          >
            Sair da Conta
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Receitas</h3>
            <p className="text-2xl font-bold text-green-600">
              R$ {Number(resumo.totalReceitas || 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Despesas</h3>
            <p className="text-2xl font-bold text-red-600">
              R$ {Number(resumo.totalDespesas || 0).toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Saldo Total</h3>
            <p
              className={`text-2xl font-bold ${Number(resumo.saldo) >= 0 ? "text-blue-600" : "text-red-600"}`}
            >
              R$ {Number(resumo.saldo || 0).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Últimas Transações
            </h2>

            <div className="flex items-center gap-4">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Nova Transação
            </button>
          </div>

          <ul className="divid-y divide-gray-100">
            {transacoes.length === 0 ? (
              <li className="p-6 text-center text-gray-500">
                Nenhuma transação encontrada.
              </li>
            ) : (
              transacoes.map((transacao) => (
                <li
                  key={transacao.id}
                  className="p-6 flex justify-between items-center hover:bg-gray-50 group transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {transacao.descricao}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transacao.categoria}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p
                        className={`font-bold ${transacao.tipoTransacao === "RECEITA" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transacao.tipoTransacao === "RECEITA" ? "+" : "-"} R${" "}
                        {Number(transacao.valor).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transacao.data).toLocaleString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <button
                      onClick={() => handleExcluir(transacao.id)}
                      className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      title="Excluir Transação"
                    >
                      🗑️
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMemoria(transacao);
                        setIsModalAlterarOpen(true);
                      }}
                      className="text-gray opacity-0 group-hover:opacity-100 transition-opacity "
                    >
                      ✏️
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <ModalAlterarTransacao
        transacaoSelecionada={memoria}
        isOpen={isModalAlterarOpen}
        onClose={() => setIsModalAlterarOpen(false)}
        onSuccess={() => {
          setIsModalAlterarOpen(false);
          carregarDados();
        }}
      />

      <ModalNovaTransacao
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          carregarDados();
        }}
      />
    </div>
  );
}
