import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputPadrao } from '../components/InputPadrao';
import { authService } from '../services/authService';


export function CadastroPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      await authService.cadastrar(email, senha);
      alert('Conta criada com sucesso! Faça login.');
      navigate('/');
    } catch (error) {
      setErro(error.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nova Conta</h1>
          <p className="text-gray-500 mt-2">Junte-se ao FinWeb agora mesmo</p>
        </div>

        {erro && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">{erro}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputPadrao label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputPadrao label="Senha (mín. 6 char)" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

          <button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg disabled:opacity-70">
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta? <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Fazer Login</button>
        </div>
      </div>
    </div>
  );
}