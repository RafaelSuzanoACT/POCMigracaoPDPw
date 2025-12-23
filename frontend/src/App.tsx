import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home/Home';
import Example from './pages/Example/Example';
import Splash from './pages/Auth/Splash';
import IntegrationAuth from './pages/Auth/IntegrationAuth';
import Flow from './pages/Collection/Hydraulic/Flow';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Layout userName="Usuário Teste">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exemplo" element={<Example />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/auth/integration" element={<IntegrationAuth />} />
          <Route path="/coleta/hidraulico/vazao" element={<Flow />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
