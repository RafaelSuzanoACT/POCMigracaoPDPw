# 🎯 Plano de Tarefas - Conexão Backend e Páginas Pendentes

## 📋 Visão Geral

Este documento detalha o plano de ação para:
1. Conectar as páginas já migradas ao backend (APIs em ONS_PoC-PDPW_V2)
2. Migrar as páginas pendentes das rotinas críticas do PDP
3. Consultar regras de negócio no repositório legado (pdpw_act)

---

## 🔴 FASE 1: ROTINAS CRÍTICAS DO PDP (PRIORIDADE MÁXIMA)

### 1.1 Cadastro de Programação Energética, Elétrica e Previsão Eólica

#### ✅ Páginas Migradas - Conectar ao Backend

**1.1.1 Razão Energética (frmColEnergetica.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Energetic/Energetic.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColEnergetica.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/energeticService.ts`
  - [ ] Implementar hooks React Query: `useEnergeticData`, `useSaveEnergetic`
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar cálculos de totais e médias
  - [ ] Testar edição em bloco (textarea overlay)
  - [ ] Validar salvamento dos 48 intervalos

**1.1.2 Razão Elétrica (frmColEletrica.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Electrical/Electrical.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColEletrica.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/electricalService.ts`
  - [ ] Implementar hooks React Query: `useElectricalData`, `useSaveElectrical`
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar cálculos de totais e médias
  - [ ] Testar edição por usina e todas as usinas
  - [ ] Validar salvamento dos 48 intervalos

#### ⏳ Páginas Pendentes - Migrar e Conectar

**1.1.3 Previsão Eólica (frmColPrevisaoEolica.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Collection/Wind/WindForecast.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmColPrevisaoEolica.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmColPrevisaoEolica.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/windForecast.ts`
  - [ ] Criar componente React: `frontend/src/pages/Collection/Wind/WindForecast.tsx`
  - [ ] Criar estilos: `frontend/src/pages/Collection/Wind/WindForecast.module.css`
  - [ ] Implementar formulário cascata (Data→Empresa→Parque Eólico)
  - [ ] Implementar grid 48 intervalos de meia hora
  - [ ] Implementar gráficos de previsão
  - [ ] Implementar textarea overlay para edição em bloco
  - [ ] Implementar cálculos de totais e médias
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/windForecastService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários: `frontend/tests/pages/WindForecast.test.tsx`
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

---

### 1.2 Geração de Arquivos para Modelos

#### ⏳ Páginas Pendentes - Migrar e Conectar

**1.2.1 Gerenciamento de Arquivos (frmGerArquivo.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Utils/Files/FileManagement.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmGerArquivo.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmGerArquivo.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/fileManagement.ts`
  - [ ] Criar componente React: `frontend/src/pages/Utils/Files/FileManagement.tsx`
  - [ ] Implementar grid de arquivos com filtros
  - [ ] Implementar operações: visualizar, download, excluir
  - [ ] Implementar validações de arquivo
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/fileManagementService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

**1.2.2 Geração de Modelos (frmGerModelos.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Utils/Models/ModelGeneration.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmGerModelos.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmGerModelos.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/modelGeneration.ts`
  - [ ] Criar componente React: `frontend/src/pages/Utils/Models/ModelGeneration.tsx`
  - [ ] Implementar seleção de modelos (DESSEM, DECOMP, etc.)
  - [ ] Implementar configuração de parâmetros
  - [ ] Implementar progresso de geração
  - [ ] Implementar validações
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/modelGenerationService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

---

### 1.3 Finalização da Programação

#### ⏳ Páginas Pendentes - Migrar e Conectar

**1.3.1 Finalização (frmFinalizacao.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Programming/Finalization.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmFinalizacao.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmFinalizacao.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/finalization.ts`
  - [ ] Criar componente React: `frontend/src/pages/Programming/Finalization.tsx`
  - [ ] Implementar checklist de validações
  - [ ] Implementar resumo de dados coletados
  - [ ] Implementar confirmação de finalização
  - [ ] Implementar geração de relatórios
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/finalizationService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

**1.3.2 Programação Diária (PDPProgDiaria.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Reports/Programming/DailyProgramming.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/PDPProgDiaria.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/PDPProgDiaria.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/dailyProgramming.ts`
  - [ ] Criar componente React: `frontend/src/pages/Reports/Programming/DailyProgramming.tsx`
  - [ ] Implementar calendário de programação
  - [ ] Implementar grid de dados consolidados
  - [ ] Implementar exportação (Excel, PDF)
  - [ ] Implementar visualização por subsistema
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/dailyProgrammingService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

---

### 1.4 Recebimento de Insumos Regulatórios

#### ✅ Páginas Migradas - Conectar ao Backend

**1.4.1 Insumo Regulatório 1 - Nível de Partida (frmColIR1.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Insumos/IR1.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIR1.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/ir1Service.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar recebimento de dados dos agentes

**1.4.2 Insumo Regulatório 2 - Dia -1 (frmColIR2.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Insumos/IR2.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIR2.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/ir2Service.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar 24 intervalos horários

**1.4.3 Insumo Regulatório 3 - Dia -2 (frmColIR3.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Insumos/IR3.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIR3.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/ir3Service.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar 24 intervalos horários

**1.4.4 Insumo Regulatório 4 - Carga da Ande (frmColIR4.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Insumos/IR4.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIR4.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/ir4Service.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar 24 intervalos horários

---

### 1.5 Recebimento de Ofertas de Exportação

#### ✅ Páginas Migradas - Conectar ao Backend

**1.5.1 Oferta de Exportação (frmColOfertaExportacao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/ExportOffer.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColOfertaExportacao.aspx.vb`
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/exportOfferService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Testar integração completa
  - [ ] Validar recebimento de ofertas dos agentes
  - [ ] Validar edição por usina e todas as usinas
  - [ ] Validar 48 intervalos

---

### 1.6 Recebimento de Ofertas de Resposta Voluntária da Demanda

#### ⏳ Páginas Pendentes - Migrar e Conectar

**1.6.1 Oferta RVD (frmColOfertaRVD.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Collection/Demand/VoluntaryDemandResponse.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmColOfertaRVD.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmColOfertaRVD.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/voluntaryDemandResponse.ts`
  - [ ] Criar componente React: `frontend/src/pages/Collection/Demand/VoluntaryDemandResponse.tsx`
  - [ ] Implementar formulário cascata (Data→Empresa→Agente)
  - [ ] Implementar grid 48 intervalos
  - [ ] Implementar validações de oferta
  - [ ] Implementar textarea overlay para edição em bloco
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/voluntaryDemandResponseService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

---

### 1.7 Recebimento de Energia Vertida Turbinável

#### ⏳ Páginas Pendentes - Migrar e Conectar

**1.7.1 Energia Vertida (frmColEnergiaVertida.aspx)** 🔴 **CRÍTICA**
- **Status:** ⏳ Não Migrada
- **Destino:** `frontend/src/pages/Collection/Hydraulic/SpilledEnergy.tsx`
- **Tarefas:**
  - [ ] Analisar página legada em `pdpw_act/frmColEnergiaVertida.aspx`
  - [ ] Analisar regra de negócio em `pdpw_act/frmColEnergiaVertida.aspx.vb`
  - [ ] Criar tipos TypeScript: `frontend/src/types/spilledEnergy.ts`
  - [ ] Criar componente React: `frontend/src/pages/Collection/Hydraulic/SpilledEnergy.tsx`
  - [ ] Implementar formulário cascata (Data→Empresa→Usina)
  - [ ] Implementar grid 48 intervalos
  - [ ] Implementar cálculos de energia turbinável
  - [ ] Implementar validações
  - [ ] Identificar endpoints da API em `ONS_PoC-PDPW_V2`
  - [ ] Criar service layer: `frontend/src/services/spilledEnergyService.ts`
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente aos hooks
  - [ ] Criar testes unitários
  - [ ] Testar integração completa
  - [ ] Adicionar rota no sistema

---

## 🔵 FASE 2: PÁGINAS MIGRADAS - CONEXÃO COM BACKEND (PRIORIDADE ALTA)

### 2.1 Coleta de Dados Hidráulicos

**2.1.1 Vazão (frmColVazao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Hydraulic/Flow.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColVazao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.1.2 Disponibilidade (frmColDisponibilidade.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Hydraulic/Availability.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColDisponibilidade.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.1.3 Balanço Hídrico (frmColBalanco.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Hydraulic/Balance.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColBalanco.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.2 Coleta de Dados Térmicos

**2.2.1 Geração Térmica (frmColGeracao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/Generation.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColGeracao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.2.2 Inflexibilidade (frmColInflexibilidade.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/Inflexibility.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColInflexibilidade.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.2.3 Modalidade Operativa (frmColModOpTermica.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/OperatingMode.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColModOpTermica.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.2.4 Despacho de Inflexibilidade (frmColDespInflex.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/InflexibilityDispatch.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColDespInflex.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.2.5 Exportação (frmColExportacao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/Export.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColExportacao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.3 Coleta de Intercâmbio

**2.3.1 Intercâmbio (frmColIntercambio.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Interchange/Interchange.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIntercambio.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.3.2 Importação (frmColImportacao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Interchange/Import.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColImportacao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.4 Coleta de Carga

**2.4.1 Carga (frmColCarga.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Load/Load.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColCarga.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.4.2 Consumo (frmColConsumo.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Load/Consumption.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColConsumo.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.5 Coleta de Restrições e Manutenção

**2.5.1 Restrição de Unidade Geradora (frmColRestricaoUG.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Restrictions/UnitRestriction.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColRestricaoUG.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.2 Restrição de Usina (frmColRestricaoUS.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Restrictions/PlantRestriction.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColRestricaoUS.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.3 Manutenção de UG (frmColManutencaoUG.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Maintenance/UnitMaintenance.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColManutencaoUG.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.4 Parada de UG (frmColParadaUG.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Maintenance/UnitOutage.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColParadaUG.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.5 Máquinas Gerando (frmColMaqGerando.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Maintenance/GeneratingMachines.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColMaqGerando.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.6 Máquinas Operando (frmColMaqOperando.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Maintenance/OperatingMachines.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColMaqOperando.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.5.7 Máquinas Paradas (frmColMaqParada.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Maintenance/StoppedMachines.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColMaqParada.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.6 Coleta de Outros Dados

**2.6.1 Rampa (frmColRampa.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/Ramp.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColRampa.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.2 GEC (frmColGEC.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/GEC.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColGEC.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.3 GES (frmColGES.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/GES.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColGES.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.4 SOM (frmColSOM.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/SOM.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColSOM.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.5 DCA (frmColDCA.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/DCA.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColDCA.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.6 DCR (frmColDCR.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/DCR.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColDCR.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.7 Despacho RE (frmColDespRE.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/REDispatch.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColDespRE.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.8 RRO (frmColRRO.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/RRO.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColRRO.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.9 Compensação (frmColCompensacao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/Compensation.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColCompensacao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.10 CRE Fora de Mérito (frmColCreForaMerito.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/OutOfMeritCRE.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColCreForaMerito.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.11 Geração Fora de Mérito (frmColGerForaMerito.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/OutOfMeritGeneration.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColGerForaMerito.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.12 Restrição Falta de Combustível (frmColResFaltaComb.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/FuelShortageRestriction.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColResFaltaComb.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.13 Energia de Reposição (frmColEnergiaRepPer.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Other/ReplacementEnergy.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColEnergiaRepPer.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.6.14 Despacho Semanal (frmColOfertaSemanalDespComp.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Thermal/WeeklyDispatch.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColOfertaSemanalDespComp.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.7 Coleta de Dados Estimados

**2.7.1 Carga Estimada (frmColCargaEst.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Load/EstimatedLoad.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColCargaEst.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.7.2 Geração Estimada (frmColGeracaoEst.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Load/EstimatedGeneration.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColGeracaoEst.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.7.3 Intercâmbio Estimado (frmColIntercambioEst.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Interchange/EstimatedInterchange.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColIntercambioEst.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.8 Potência Sincronizada

**2.8.1 Potência Sincronizada (frmColPotSinc.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Collection/Electrical/SyncPower.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmColPotSinc.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.9 Administração

**2.9.1 Empresa (frmCnsEmpresa.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/Company.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsEmpresa.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.2 Cadastro de Usinas (frmCnsUsina.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/PlantRegistry.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsUsina.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.3 Cadastro de Usuários (frmCadUsuario.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/UserRegistry.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCadUsuario.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.4 Associação de Usuários (frmAssocUsuar.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/UserAssociation.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmAssocUsuar.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.5 Motivo de Despacho Elétrico (frmCnsMotivo.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/ElectricalDispatchReason.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsMotivo.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.6 Motivo de Inflexibilidade (frmCnsMotivoInfl.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/InflexibilityDispatchReason.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsMotivoInfl.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.9.7 Inflexibilidade Contratada (frmInflxContratada.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Administration/ContractedInflexibility.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmInflxContratada.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

### 2.10 Consultas

**2.10.1 Consulta de Vazão (frmCnsVazao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Query/Hydraulic/FlowQuery.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsVazao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

**2.10.2 Consulta de Geração (frmCnsGeracao.aspx)**
- **Status:** ✅ Migrada | ⏳ Backend Pendente
- **Arquivo:** `frontend/src/pages/Query/Other/GenerationQuery.tsx`
- **Tarefas:**
  - [ ] Analisar regra de negócio em `pdpw_act/frmCnsGeracao.aspx.vb`
  - [ ] Identificar endpoints da API
  - [ ] Criar service layer
  - [ ] Implementar hooks React Query
  - [ ] Conectar componente
  - [ ] Testar integração

---

## 📚 Recursos e Referências

### Repositórios
- **Frontend React:** `POCMigracaoPDPw/frontend`
- **Backend APIs:** `ONS_PoC-PDPW_V2`
- **Legado ASP.NET:** `pdpw_act`

### Documentação
- **Plano de Migração:** `POCMigracaoPDPw/.github/PLANO_MIGRACAO.md`
- **Guia de Agentes:** `POCMigracaoPDPw/.github/AGENTS.md`

### Padrões de Desenvolvimento
- **Service Layer:** `frontend/src/services/[module]Service.ts`
- **React Query Hooks:** `useQuery`, `useMutation`
- **Tipos TypeScript:** `frontend/src/types/[module].ts`
- **Testes:** `frontend/tests/pages/[Page].test.tsx`

---

## 📊 Resumo de Prioridades

### 🔴 PRIORIDADE MÁXIMA (Rotinas Críticas do PDP)
1. Previsão Eólica (frmColPrevisaoEolica.aspx) - **MIGRAR**
2. Gerenciamento de Arquivos (frmGerArquivo.aspx) - **MIGRAR**
3. Geração de Modelos (frmGerModelos.aspx) - **MIGRAR**
4. Finalização (frmFinalizacao.aspx) - **MIGRAR**
5. Programação Diária (PDPProgDiaria.aspx) - **MIGRAR**
6. Oferta RVD (frmColOfertaRVD.aspx) - **MIGRAR**
7. Energia Vertida (frmColEnergiaVertida.aspx) - **MIGRAR**
8. Razão Energética (frmColEnergetica.aspx) - **CONECTAR BACKEND**
9. Razão Elétrica (frmColEletrica.aspx) - **CONECTAR BACKEND**
10. Oferta de Exportação (frmColOfertaExportacao.aspx) - **CONECTAR BACKEND**
11. IR1, IR2, IR3, IR4 - **CONECTAR BACKEND**

### 🔵 PRIORIDADE ALTA (Páginas Migradas)
- Todas as 48 páginas já migradas precisam ser conectadas ao backend
- Seguir ordem: Coleta → Administração → Consultas

### 🟢 PRIORIDADE MÉDIA
- Páginas de consulta pendentes
- Páginas de relatórios
- Páginas de utilitários

---

## ✅ Checklist de Implementação

Para cada página, seguir este checklist:

### Análise
- [ ] Estudar página legada (.aspx)
- [ ] Analisar código VB (.aspx.vb)
- [ ] Identificar regras de negócio
- [ ] Mapear endpoints da API

### Desenvolvimento (se não migrada)
- [ ] Criar tipos TypeScript
- [ ] Criar componente React
- [ ] Criar estilos CSS Module
- [ ] Implementar funcionalidades

### Integração Backend
- [ ] Criar service layer
- [ ] Implementar hooks React Query
- [ ] Conectar componente aos hooks
- [ ] Tratar estados de loading/erro

### Testes
- [ ] Criar testes unitários
- [ ] Testar integração com API
- [ ] Validar cálculos e regras de negócio
- [ ] Testar casos de erro

### Finalização
- [ ] Code review
- [ ] Atualizar documentação
- [ ] Marcar como concluído no plano
