import { useState } from "react";
import { relatorioService } from "../services/relatorioService";

export function BaixarRelatorio(){
  const [loading, setLoading] = useState(false);

  const handleBaixar = async () => {
    setLoading(true);

    try {
      await relatorioService.baixarRelatorioTransacoes();
    } catch (error) {
      console.error("Erro ao baixar o relatório", error);
      alert("Não foi possível gerar o relatório. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBaixar}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        {loading ? "Gerando PDF..." : "📄 Baixar Relatório"}
      </button>
    </div>
  );
};
