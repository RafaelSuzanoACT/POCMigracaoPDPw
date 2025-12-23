import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home/Home';
import Example from './pages/Example/Example';
import Splash from './pages/Auth/Splash';
import IntegrationAuth from './pages/Auth/IntegrationAuth';
import Flow from './pages/Collection/Hydraulic/Flow';
import Availability from './pages/Collection/Hydraulic/Availability';
import Balance from './pages/Collection/Hydraulic/Balance';
import Generation from './pages/Collection/Thermal/Generation';
import Inflexibility from './pages/Collection/Thermal/Inflexibility';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Layout userName="Usuário Teste">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exemplo" element={<Example />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/coleta/hidraulico/disponibilidade" element={<Availability />} />
          <Route path="/coleta/hidraulico/balanco" element={<Balance />} />
          <Route path="/coleta/termico/geracao" element={<Generation />} />
          <Route path="/coleta/termico/inflexibilidade" element={<Inflexibility />} />
          <Route path="/auth/integration" element={<IntegrationAuth />} />
          <Route path="/coleta/hidraulico/vazao" element={<Flow />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
