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
import OperatingMode from './pages/Collection/Thermal/OperatingMode';
import InflexibilityDispatch from './pages/Collection/Thermal/InflexibilityDispatch';
import ExportOffer from './pages/Collection/Thermal/ExportOffer';
import ExportOfferAnalysis from './pages/Collection/Thermal/ExportOfferAnalysis';
import RRO from './pages/Collection/Thermal/RRO';
import WeeklyDispatch from './pages/Collection/Thermal/WeeklyDispatch';
import Load from './pages/Collection/Load/Load';
import Consumption from './pages/Collection/Load/Consumption';
import UnitRestriction from './pages/Collection/Restrictions/UnitRestriction';
import GEC from './pages/Collection/Other/GEC';
import Company from './pages/Administration/Company';
import UserRegistry from './pages/Administration/UserRegistry';
import UserAssociation from './pages/Administration/UserAssociation';
import PlantRegistry from './pages/Administration/PlantRegistry';
import ElectricalDispatchReasonPage from './pages/Administration/ElectricalDispatchReasonPage';
import InflexibilityDispatchReasonPage from './pages/Administration/InflexibilityDispatchReasonPage';
import ContractedInflexibility from './pages/Administration/ContractedInflexibility';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Layout userName="Usuário Teste">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exemplo" element={<Example />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/coleta/hidraulico/vazao" element={<Flow />} />
          <Route path="/coleta/hidraulico/disponibilidade" element={<Availability initialType="H" />} />
          <Route path="/coleta/hidraulico/balanco" element={<Balance />} />
          <Route path="/coleta/termico/geracao" element={<Generation />} />
          <Route path="/coleta/termico/disponibilidade" element={<Availability initialType="T" />} />
          <Route path="/frmColDisponibilidade.aspx" element={<Availability initialType="T" />} />
          <Route path="/coleta/termico/inflexibilidade" element={<Inflexibility />} />
          <Route path="/coleta/termico/modalidade-operativa" element={<OperatingMode />} />
          <Route
            path="/coleta/termico/despacho-inflexibilidade"
            element={<InflexibilityDispatch />}
          />
          <Route path="/coleta/termico/oferta-exportacao" element={<ExportOffer />} />
          <Route path="/frmCnsOfertaExportacao.aspx" element={<ExportOffer />} />
          <Route path="/coleta/termico/analise-oferta-exportacao" element={<ExportOfferAnalysis />} />
          <Route path="/frmCnsAnaliseOfertaExportacao.aspx" element={<ExportOfferAnalysis />} />
          <Route path="/coleta/termico/rro" element={<RRO />} />
          <Route path="/frmColRRO.aspx" element={<RRO />} />
          <Route path="/coleta/termico/oferta-semanal" element={<WeeklyDispatch />} />
          <Route path="/frmColOfertaSemanalDespComp.aspx" element={<WeeklyDispatch />} />
          <Route path="/coleta/carga/carga" element={<Load />} />
          <Route path="/coleta/carga/consumo" element={<Consumption />} />
          <Route path="/coleta/restricoes/restricao-ug" element={<UnitRestriction />} />
          <Route path="/coleta/outros/gec" element={<GEC />} />
          <Route path="/auth/integration" element={<IntegrationAuth />} />
          <Route path="/admin/empresas" element={<Company />} />
          <Route path="/admin/usuarios" element={<UserRegistry />} />
          <Route path="/admin/associacao-usuario-empresa" element={<UserAssociation />} />
          <Route path="/admin/usinas" element={<PlantRegistry />} />
          <Route path="/admin/motivos-despacho-eletrica" element={<ElectricalDispatchReasonPage />} />
          <Route path="/frmCnsMotivo.aspx" element={<ElectricalDispatchReasonPage />} />
          <Route path="/admin/motivos-despacho-inflexibilidade" element={<InflexibilityDispatchReasonPage />} />
          <Route path="/frmCnsMotivoInfl.aspx" element={<InflexibilityDispatchReasonPage />} />
          <Route path="/admin/inflexibilidade-contratada" element={<ContractedInflexibility />} />
          <Route path="/frmInflxContratada.aspx" element={<ContractedInflexibility />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;