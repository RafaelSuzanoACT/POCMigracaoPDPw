import React from 'react';
import './App.css';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="app">
      <header>
        <h1>PDPw - Programação Diária de Produção</h1>
        <p>Sistema de coleta e gerenciamento de dados para a PDP</p>
      </header>
      <main>
        <section>
          <h2>Bem-vindo</h2>
          <p>Módulos disponíveis:</p>
          <ul>
            <li>Dados Hidráulicos</li>
            <li>Dados Térmicos</li>
            <li>Oferta de Exportação</li>
            <li>Comentários DESSEM</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
