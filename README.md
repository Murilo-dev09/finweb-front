# 💰 FinWeb - Gestão Financeira Pessoal

O **FinWeb** é uma aplicação web moderna para controle financeiro pessoal. Ele permite que os usuários registrem suas receitas e despesas, visualizem um resumo dinâmico do seu saldo e filtrem suas movimentações por categoria, tudo em uma interface limpa e responsiva.

Este é o repositório do **Front-end** da aplicação, construído para se comunicar com uma API Restful em Spring Boot.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **[React](https://reactjs.org/)** - Biblioteca JavaScript para construção de interfaces.
* **[Vite](https://vitejs.dev/)** - Ferramenta de build super rápida para projetos web.
* **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário para estilização rápida e responsiva.
* **[React Router DOM](https://reactrouter.com/)** - Gerenciamento de rotas e navegação da aplicação.
* **[Axios](https://axios-http.com/)** - Cliente HTTP para comunicação com a API (Back-end).

---

## ✨ Funcionalidades

* **Autenticação JWT:** Login e Cadastro de usuários com proteção de rotas privadas.
* **Dashboard Interativo:** Resumo em tempo real de Receitas, Despesas e Saldo Total.
* **Gestão de Transações (CRUD):** * Criação de novas transações (Modal interativo).
    * Exclusão de transações existentes.
    * Listagem paginada e ordenada.
* **Filtros Dinâmicos:** Filtragem de transações por categorias (Mercado, Salário, Alimentação, etc.) com recarregamento automático da lista.
* **Formatação Nativa:** Datas e valores monetários formatados nativamente para o padrão Brasileiro (pt-BR).

---

## 📁 Estrutura do Projeto

A arquitetura do projeto foi pensada para ser escalável e de fácil manutenção:

```text
src/
 ├── assets/      # Imagens estáticas e logos (fundo-dash.png, etc)
 ├── components/  # Componentes reutilizáveis (Inputs, Modais, Proteção de Rota)
 ├── contexts/    # Context API (Gerenciamento global de Sessão e Autenticação)
 ├── pages/       # Páginas da aplicação (Login, Cadastro, Dashboard)
 ├── services/    # Comunicação com a API (authService, transacaoService)
 ├── App.jsx      # Configuração central de rotas
 └── main.jsx     # Ponto de entrada da aplicação


 ⚙️ Como executar o projeto localmente
Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina o Node.js e ter o repositório do Back-end do FinWeb (Spring Boot) rodando na porta http://localhost:8080.

Passo a Passo
Clone este repositório:

Bash
git clone https://github.com/Murilo-dev09/finweb-front.git
Acesse a pasta do projeto:

Bash
cd finweb-front
Instale as dependências:

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
O servidor iniciará localmente (geralmente na porta http://localhost:5173). Acesse o link no seu navegador para ver a aplicação rodando!

👨‍💻 Desenvolvedor
Criado e desenvolvido por Murilo.

Projeto focado no aperfeiçoamento de habilidades em desenvolvimento Full-Stack (React + Spring Boot).