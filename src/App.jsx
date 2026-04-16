import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CadastroPage } from './pages/CadastroPage';
import { DashboardPage } from './pages/DashboardPage';
import { RotaProtegida } from './components/RotaProtegida';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        
        <Route path="/dashboard" element={
            <RotaProtegida>
              <DashboardPage />
            </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}