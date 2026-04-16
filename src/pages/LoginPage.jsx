import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { InputPadrao } from '../components/InputPadrao';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const { efetuarLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    
    try {
      await efetuarLogin(email, senha);
      navigate('/dashboard');
    } catch (error) {
      setErro(error.message || "Erro ao logar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100  flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">

        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo</h1>
          <p className="text-gray-500 mt-2">Acesse sua conta para continuar</p>
        </div>
          {erro && <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center"> {erro} </div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputPadrao label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <InputPadrao label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg disable:opacity-70">
                {loading ? 'Entrando...' : 'Acessar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Ainda não tem uma conta? <button onClick={() => navigate('/cadastro')} className="text-blue-600 hover:underline">Cadastre-se</button>
          </div>
      </div>
    </div>
  );
}