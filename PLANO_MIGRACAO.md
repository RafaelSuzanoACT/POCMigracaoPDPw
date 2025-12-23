# Plano de Migração - PDPw Frontend

## 📋 Visão Geral

Este documento descreve o plano incremental de migração do frontend legado ASP.NET WebForms para React + Vite, mantendo a identidade visual original com design responsivo moderno.

## 🎯 Objetivos

- ✅ Migrar todas as páginas do sistema legado para React
- ✅ Manter cores, fontes e ícones originais
- ✅ Implementar design responsivo
- ✅ Criar testes unitários para cada componente (100% de aprovação)
- ✅ Documentar progresso com checklist

## 📊 Status Geral

**Total de Páginas Identificadas:** 142 páginas ASPX

### Progresso por Categoria

| Categoria | Total | Migradas | Pendentes | Progresso |
|-----------|-------|----------|-----------|-----------|
| **Infraestrutura** | 4 | 2 | 2 | 50% |
| **Coleta de Dados** | 38 | 7 | 31 | 18.4% |
| **Consultas** | 48 | 0 | 48 | 0% |
| **Administração** | 12 | 2 | 10 | 16.7% |
| **Relatórios** | 8 | 0 | 8 | 0% |
| **Utilitários** | 10 | 0 | 10 | 0% |
| **Integração** | 4 | 0 | 4 | 0% |
| **Outros** | 18 | 0 | 18 | 0% |
| **TOTAL** | **142** | **13** | **129** | **9.2%** |

---

## 🏗️ Estrutura de Migração

### Fase 0: Infraestrutura Base ✅ CONCLUÍDA CONCLUÍDA

#### 0.1 Layout e Navegação ✅
- [x] Layout principal (Header, Navigation, Footer)
- [x] Sistema de roteamento (React Router)
- [x] Integração com Menu.json
- [x] Testes unitários (22 testes - 100%)

**Arquivos Criados:**
- `frontend/src/components/Layout/Header.tsx`
- `frontend/src/components/Layout/Navigation.tsx`
- `frontend/src/components/Layout/Footer.tsx`
- `frontend/src/components/Layout/Layout.tsx`
- `frontend/src/App.tsx` (com BrowserRouter)
- Testes correspondentes

**Dependências Instaladas:**
- `react-router-dom` - Roteamento SPA

---

### Fase 1: Páginas Essenciais (Prioridade Alta) ✅ CONCLUÍDA

#### 1.1 Página Inicial e Dashboard ✅
- [x] **TelaInicialVazia.aspx** → `pages/Home/Home.tsx`
  - Componente: Dashboard principal
  - Funcionalidades: Visão geral do sistema, mensagem de boas-vindas
  - Testes: 4 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Home/Home.tsx`
- `frontend/src/pages/Home/Home.module.css`
- `frontend/tests/pages/Home.test.tsx`

- [x] **Exemplo.aspx** → `pages/Example/Example.tsx`
  - Componente: Página de exemplo/template
  - Funcionalidades: Demonstração de funcionalidades
  - Testes: 18 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Example/Example.tsx`
- `frontend/src/pages/Example/Example.module.css`
- `frontend/tests/pages/Example.test.tsx`

#### 1.2 Autenticação e Controle de Acesso ✅
- [x] **frmSplash.aspx** → `pages/Auth/Splash.tsx`
  - Componente: Tela de carregamento inicial
  - Funcionalidades: Loading, verificação de sessão
  - Testes: 22 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Auth/Splash.tsx`
- `frontend/src/pages/Auth/Splash.module.css`
- `frontend/tests/pages/Splash.test.tsx`

- [x] **IntegracaoIntUnica.aspx** → `pages/Auth/IntegrationAuth.tsx`
  - Componente: Integração com sistema de autenticação
  - Funcionalidades: SSO, validação de token
  - Testes: 32 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Auth/IntegrationAuth.tsx`
- `frontend/src/pages/Auth/IntegrationAuth.module.css`
- `frontend/tests/pages/IntegrationAuth.test.tsx`

---

### Fase 2: Módulo de Coleta de Dados (Prioridade Alta)

#### 2.1 Coleta - Dados Hidráulicos
- [x] **frmColVazao.aspx** → `pages/Collection/Hydraulic/Flow.tsx`
  - Funcionalidades: Coleta de vazão de usinas hidráulicas
  - Componentes: Formulário, validação, grid de dados
  - Testes: CRUD, validações, cálculos
  - Status: ✅ CONCLUÍDO

- [x] **frmColDisponibilidade.aspx** → `pages/Collection/Hydraulic/Availability.tsx`
  - Funcionalidades: Disponibilidade de usinas
  - Componentes: Formulário multi-step, calendário
  - Testes: ⏳ Pendente
  - Status: ✅ CONCLUÍDO

- [x] **frmColBalanco.aspx** → `pages/Collection/Hydraulic/Balance.tsx`
  - Funcionalidades: Balanço hídrico
  - Componentes: Tabela editável, gráficos
  - Testes: ⏳ Pendente
  - Status: ✅ CONCLUÍDO

#### 2.2 Coleta - Dados Térmicos
- [x] **frmColGeracao.aspx** → `pages/Collection/Thermal/Generation.tsx`
  - Funcionalidades: Geração térmica
  - Componentes: Grid editável, validações
  - Testes: ⏳ Pendente
  - Status: ✅ CONCLUÍDO

- [x] **frmColInflexibilidade.aspx** → `pages/Collection/Thermal/Inflexibility.tsx`
  - Funcionalidades: Inflexibilidade térmica
  - Componentes: Formulário, validações complexas, tabela dinâmica 48 intervalos
  - Testes: 25 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Collection/Thermal/Inflexibility.tsx`
- `frontend/src/pages/Collection/Thermal/Inflexibility.module.css`
- `frontend/src/types/inflexibility.ts`
- `frontend/tests/pages/Inflexibility.test.tsx`

- [x] **frmColModOpTermica.aspx** → `pages/Collection/Thermal/OperatingMode.tsx`
  - Funcionalidades: Modalidade operativa térmica
  - Componentes: Seleção de modo, configurações, tabela 48 intervalos
  - Testes: 22 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Collection/Thermal/OperatingMode.tsx`
- `frontend/src/pages/Collection/Thermal/OperatingMode.module.css`
- `frontend/src/types/operatingMode.ts`
- `frontend/tests/pages/OperatingMode.test.tsx`

- [x] **frmColDespInflex.aspx** → `pages/Collection/Thermal/InflexibilityDispatch.tsx`
  - Funcionalidades: Despacho de inflexibilidade térmica
  - Componentes: Grid com cálculos automáticos, edição por usina/todas, 48 intervalos
  - Testes: 22 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Collection/Thermal/InflexibilityDispatch.tsx`
- `frontend/src/pages/Collection/Thermal/InflexibilityDispatch.module.css`
- `frontend/src/types/inflexibilityDispatch.ts`
- `frontend/tests/pages/InflexibilityDispatch.test.tsx`

- [ ] **frmColOfertaExportacao.aspx** → `pages/Collection/Thermal/ExportOffer.tsx`
  - Funcionalidades: Oferta de exportação
  - Componentes: Formulário, validações
  - Testes: Validações, cálculos

#### 2.3 Coleta - Dados Elétricos
- [ ] **frmColEletrica.aspx** → `pages/Collection/Electrical/Electrical.tsx`
  - Funcionalidades: Dados elétricos
  - Componentes: Formulário técnico, validações
  - Testes: Validações elétricas, cálculos

- [ ] **frmColEnergetica.aspx** → `pages/Collection/Electrical/Energy.tsx`
  - Funcionalidades: Dados energéticos
  - Componentes: Grid, gráficos
  - Testes: Cálculos energéticos

- [ ] **frmColPotSinc.aspx** → `pages/Collection/Electrical/SyncPower.tsx`
  - Funcionalidades: Potência sincronizada
  - Componentes: Formulário, validações
  - Testes: Validações técnicas

#### 2.4 Coleta - Intercâmbio
- [ ] **frmColIntercambio.aspx** → `pages/Collection/Interchange/Interchange.tsx`
  - Funcionalidades: Intercâmbio entre subsistemas
  - Componentes: Grid multi-região, validações
  - Testes: Cálculos de intercâmbio, validações

- [ ] **frmColExportacao.aspx** → `pages/Collection/Interchange/Export.tsx`
  - Funcionalidades: Exportação de energia
  - Componentes: Formulário, validações
  - Testes: Validações de exportação
  - **Data-testid:** ⏳ Pendente

- [ ] **frmColImportacao.aspx** → `pages/Collection/Interchange/Import.tsx`
  - Funcionalidades: Importação de energia
  - Componentes: Formulário, validações
  - Testes: Validações de importação
  - **Data-testid:** ⏳ Pendente
  - Funcionalidades: Importação de energia
  - Componentes: Formulário, validações
  - Testes: Validações de importação

#### 2.5 Coleta - Carga
- [ ] **frmColCarga.aspx** → `pages/Collection/Load/Load.tsx`
  - Funcionalidades: Previsão de carga
  - Componentes: Grid temporal, gráficos
  - Testes: Validações, cálculos

- [ ] **frmColConsumo.aspx** → `pages/Collection/Load/Consumption.tsx`
  - Funcionalidades: Consumo de energia
  - Componentes: Formulário, histórico
  - Testes: Cálculos de consumo

#### 2.6 Coleta - Restrições e Manutenção
- [ ] **frmColRestricaoUG.aspx** → `pages/Collection/Restrictions/UnitRestriction.tsx`
  - Funcionalidades: Restrições de unidades geradoras
  - Componentes: Formulário, lista de restrições
  - Testes: CRUD, validações

- [ ] **frmColRestricaoUS.aspx** → `pages/Collection/Restrictions/PlantRestriction.tsx`
  - Funcionalidades: Restrições de usinas
  - Componentes: Formulário, validações
  - Testes: CRUD, validações

- [ ] **frmColManutencaoUG.aspx** → `pages/Collection/Maintenance/UnitMaintenance.tsx`
  - Funcionalidades: Manutenção de unidades
  - Componentes: Calendário, formulário
  - Testes: Agendamento, validações

- [ ] **frmColParadaUG.aspx** → `pages/Collection/Maintenance/UnitOutage.tsx`
  - Funcionalidades: Paradas de unidades
  - Componentes: Formulário, timeline
  - Testes: Validações de período

- [ ] **frmColMaqGerando.aspx** → `pages/Collection/Maintenance/GeneratingMachines.tsx`
  - Funcionalidades: Máquinas gerando
  - Componentes: Grid, status
  - Testes: Atualização de status

- [ ] **frmColMaqOperando.aspx** → `pages/Collection/Maintenance/OperatingMachines.tsx`
  - Funcionalidades: Máquinas operando
  - Componentes: Grid, monitoramento
  - Testes: Status em tempo real

- [ ] **frmColMaqParada.aspx** → `pages/Collection/Maintenance/StoppedMachines.tsx`
  - Funcionalidades: Máquinas paradas
  - Componentes: Grid, motivos
  - Testes: Registro de paradas

#### 2.7 Coleta - Outros Dados
- [ ] **frmColRampa.aspx** → `pages/Collection/Other/Ramp.tsx`
  - Funcionalidades: Rampas de geração
  - Componentes: Formulário, validações
  - Testes: Cálculos de rampa

- [ ] **frmColGEC.aspx** → `pages/Collection/Other/GEC.tsx`
  - Funcionalidades: Geração de Energia Contratada
  - Componentes: Grid, cálculos
  - Testes: Validações contratuais

- [ ] **frmColGES.aspx** → `pages/Collection/Other/GES.tsx`
  - Funcionalidades: Geração de Energia Secundária
  - Componentes: Formulário, validações
  - Testes: Cálculos secundários

- [ ] **frmColSOM.aspx** → `pages/Collection/Other/SOM.tsx`
  - Funcionalidades: Sistema de Operação em Malha
  - Componentes: Grid complexo, validações
  - Testes: Validações de malha

- [ ] **frmColDCA.aspx** → `pages/Collection/Other/DCA.tsx`
  - Funcionalidades: Declaração de Carga Adicional
  - Componentes: Formulário, validações
  - Testes: Validações de carga

- [ ] **frmColDCR.aspx** → `pages/Collection/Other/DCR.tsx`
  - Funcionalidades: Declaração de Carga Reduzida
  - Componentes: Formulário, validações
  - Testes: Validações de redução

- [ ] **frmColDespRE.aspx** → `pages/Collection/Other/REDispatch.tsx`
  - Funcionalidades: Despacho de Reserva de Energia
  - Componentes: Grid, cálculos
  - Testes: Cálculos de reserva

- [ ] **frmColRRO.aspx** → `pages/Collection/Other/RRO.tsx`
  - Funcionalidades: Restrição de Rampa Operativa
  - Componentes: Formulário, validações
  - Testes: Validações de rampa

- [ ] **frmColCompensacao.aspx** → `pages/Collection/Other/Compensation.tsx`
  - Funcionalidades: Compensação de energia
  - Componentes: Grid, cálculos
  - Testes: Cálculos de compensação

- [ ] **frmColCreForaMerito.aspx** → `pages/Collection/Other/OutOfMeritCRE.tsx`
  - Funcionalidades: CRE fora de mérito
  - Componentes: Formulário, justificativas
  - Testes: Validações especiais

- [ ] **frmColGerForaMerito.aspx** → `pages/Collection/Other/OutOfMeritGeneration.tsx`
  - Funcionalidades: Geração fora de mérito
  - Componentes: Formulário, justificativas
  - Testes: Validações especiais

- [ ] **frmColResFaltaComb.aspx** → `pages/Collection/Other/FuelShortageRestriction.tsx`
  - Funcionalidades: Restrição por falta de combustível
  - Componentes: Formulário, alertas
  - Testes: Validações críticas

- [ ] **frmColEnergiaRepPer.aspx** → `pages/Collection/Other/ReplacementEnergy.tsx`
  - Funcionalidades: Energia de reposição por período
  - Componentes: Grid temporal, cálculos
  - Testes: Cálculos de reposição

- [ ] **frmColOfertaSemanalDespComp.aspx** → `pages/Collection/Other/WeeklyOfferCompDispatch.tsx`
  - Funcionalidades: Oferta semanal de despacho complementar
  - Componentes: Grid semanal, validações
  - Testes: Validações semanais

#### 2.8 Coleta - Estrutural (Dados Estimados)
- [ ] **frmColCargaEst.aspx** → `pages/Collection/Structural/EstimatedLoad.tsx`
  - Funcionalidades: Carga estimada
  - Componentes: Formulário, previsões
  - Testes: Cálculos de estimativa

- [ ] **frmColGeracaoEst.aspx** → `pages/Collection/Structural/EstimatedGeneration.tsx`
  - Funcionalidades: Geração estimada
  - Componentes: Grid, previsões
  - Testes: Cálculos de estimativa

- [ ] **frmColIntercambioEst.aspx** → `pages/Collection/Structural/EstimatedInterchange.tsx`
  - Funcionalidades: Intercâmbio estimado
  - Componentes: Grid multi-região, previsões
  - Testes: Cálculos de estimativa

#### 2.9 Coleta - Insumos Regulatórios
- [ ] **frmColIR1.aspx** → `pages/Collection/Regulatory/IR1.tsx`
  - Funcionalidades: Insumo Regulatório 1
  - Componentes: Formulário específico
  - Testes: Validações regulatórias

- [ ] **frmColIR2.aspx** → `pages/Collection/Regulatory/IR2.tsx`
  - Funcionalidades: Insumo Regulatório 2
  - Componentes: Formulário específico
  - Testes: Validações regulatórias

- [ ] **frmColIR3.aspx** → `pages/Collection/Regulatory/IR3.tsx`
  - Funcionalidades: Insumo Regulatório 3
  - Componentes: Formulário específico
  - Testes: Validações regulatórias

- [ ] **frmColIR4.aspx** → `pages/Collection/Regulatory/IR4.tsx`
  - Funcionalidades: Insumo Regulatório 4
  - Componentes: Formulário específico
  - Testes: Validações regulatórias

---

### Fase 3: Módulo de Consultas (Prioridade Média)

#### 3.1 Consultas - Dados Hidráulicos
- [ ] **frmCnsVazao.aspx** → `pages/Query/Hydraulic/FlowQuery.tsx`
  - Funcionalidades: Consulta de vazão
  - Componentes: Filtros, grid, exportação
  - Testes: Filtros, paginação

- [ ] **frmCnsDisponibilidade.aspx** → `pages/Query/Hydraulic/AvailabilityQuery.tsx`
  - Funcionalidades: Consulta de disponibilidade
  - Componentes: Filtros, calendário, grid
  - Testes: Filtros temporais

- [ ] **frmCnsBalanco.aspx** → `pages/Query/Hydraulic/BalanceQuery.tsx`
  - Funcionalidades: Consulta de balanço hídrico
  - Componentes: Filtros, gráficos, tabelas
  - Testes: Visualizações

#### 3.2 Consultas - Dados Térmicos
- [ ] **frmCnsGeracao.aspx** → `pages/Query/Thermal/GenerationQuery.tsx`
  - Funcionalidades: Consulta de geração térmica
  - Componentes: Filtros, grid, gráficos
  - Testes: Filtros, exportação

- [ ] **frmCnsInflexibilidade.aspx** → `pages/Query/Thermal/InflexibilityQuery.tsx`
  - Funcionalidades: Consulta de inflexibilidade
  - Componentes: Filtros, grid
  - Testes: Filtros complexos

- [ ] **frmCnsModOpTermica.aspx** → `pages/Query/Thermal/OperatingModeQuery.tsx`
  - Funcionalidades: Consulta de modalidade operativa
  - Componentes: Filtros, histórico
  - Testes: Histórico de mudanças

- [ ] **frmCnsDespInflex.aspx** → `pages/Query/Thermal/InflexibilityDispatchQuery.tsx`
  - Funcionalidades: Consulta de despacho de inflexibilidade
  - Componentes: Filtros, grid
  - Testes: Filtros, cálculos

#### 3.3 Consultas - Dados Elétricos
- [ ] **frmCnsEletrica.aspx** → `pages/Query/Electrical/ElectricalQuery.tsx`
  - Funcionalidades: Consulta de dados elétricos
  - Componentes: Filtros, grid técnico
  - Testes: Filtros técnicos

- [ ] **frmCnsEnergetica.aspx** → `pages/Query/Electrical/EnergyQuery.tsx`
  - Funcionalidades: Consulta de dados energéticos
  - Componentes: Filtros, gráficos
  - Testes: Visualizações

#### 3.4 Consultas - Intercâmbio
- [ ] **frmCnsIntercambio.aspx** → `pages/Query/Interchange/InterchangeQuery.tsx`
  - Funcionalidades: Consulta de intercâmbio
  - Componentes: Filtros multi-região, grid
  - Testes: Filtros regionais

- [ ] **frmCnsExportacao.aspx** → `pages/Query/Interchange/ExportQuery.tsx`
  - Funcionalidades: Consulta de exportação
  - Componentes: Filtros, grid
  - Testes: Filtros, totalizadores

- [ ] **frmCnsImportacao.aspx** → `pages/Query/Interchange/ImportQuery.tsx`
  - Funcionalidades: Consulta de importação
  - Componentes: Filtros, grid
  - Testes: Filtros, totalizadores

- [ ] **frmCnsOfertaExportacao.aspx** → `pages/Query/Interchange/ExportOfferQuery.tsx`
  - Funcionalidades: Consulta de oferta de exportação
  - Componentes: Filtros, grid, status
  - Testes: Filtros, validações

- [ ] **frmCnsAnaliseOfertaExportacao.aspx** → `pages/Query/Interchange/ExportOfferAnalysis.tsx`
  - Funcionalidades: Análise de oferta de exportação
  - Componentes: Dashboard analítico, gráficos
  - Testes: Cálculos analíticos

#### 3.5 Consultas - Carga
- [ ] **frmCnsCarga.aspx** → `pages/Query/Load/LoadQuery.tsx`
  - Funcionalidades: Consulta de carga
  - Componentes: Filtros temporais, gráficos
  - Testes: Filtros, visualizações

- [ ] **frmCnsConsumo.aspx** → `pages/Query/Load/ConsumptionQuery.tsx`
  - Funcionalidades: Consulta de consumo
  - Componentes: Filtros, histórico
  - Testes: Filtros, totalizadores

#### 3.6 Consultas - Restrições e Manutenção
- [ ] **frmCnsRestricao.aspx** → `pages/Query/Restrictions/RestrictionQuery.tsx`
  - Funcionalidades: Consulta de restrições
  - Componentes: Filtros, grid, status
  - Testes: Filtros, status

- [ ] **frmCnsManutencao.aspx** → `pages/Query/Maintenance/MaintenanceQuery.tsx`
  - Funcionalidades: Consulta de manutenção
  - Componentes: Calendário, filtros
  - Testes: Filtros temporais

- [ ] **frmCnsParadaUG.aspx** → `pages/Query/Maintenance/UnitOutageQuery.tsx`
  - Funcionalidades: Consulta de paradas
  - Componentes: Filtros, timeline
  - Testes: Filtros, visualizações

- [ ] **frmCnsMaqGerando.aspx** → `pages/Query/Maintenance/GeneratingMachinesQuery.tsx`
  - Funcionalidades: Consulta de máquinas gerando
  - Componentes: Filtros, grid em tempo real
  - Testes: Atualização automática

- [ ] **frmCnsMaqOperando.aspx** → `pages/Query/Maintenance/OperatingMachinesQuery.tsx`
  - Funcionalidades: Consulta de máquinas operando
  - Componentes: Filtros, monitoramento
  - Testes: Status em tempo real

- [ ] **frmCnsMaqParada.aspx** → `pages/Query/Maintenance/StoppedMachinesQuery.tsx`
  - Funcionalidades: Consulta de máquinas paradas
  - Componentes: Filtros, motivos
  - Testes: Filtros, histórico

#### 3.7 Consultas - Outros Dados
- [ ] **frmCnsRampa.aspx** → `pages/Query/Other/RampQuery.tsx`
  - Funcionalidades: Consulta de rampas
  - Componentes: Filtros, gráficos
  - Testes: Visualizações

- [ ] **frmCnsGEC.aspx** → `pages/Query/Other/GECQuery.tsx`
  - Funcionalidades: Consulta GEC
  - Componentes: Filtros, grid
  - Testes: Filtros contratuais

- [ ] **frmCnsGES.aspx** → `pages/Query/Other/GESQuery.tsx`
  - Funcionalidades: Consulta GES
  - Componentes: Filtros, grid
  - Testes: Filtros secundários

- [ ] **frmCnsSOM.aspx** → `pages/Query/Other/SOMQuery.tsx`
  - Funcionalidades: Consulta SOM
  - Componentes: Filtros, grid complexo
  - Testes: Filtros de malha

- [ ] **frmCnsDCA.aspx** → `pages/Query/Other/DCAQuery.tsx`
  - Funcionalidades: Consulta DCA
  - Componentes: Filtros, grid
  - Testes: Filtros de carga

- [ ] **frmCnsDCR.aspx** → `pages/Query/Other/DCRQuery.tsx`
  - Funcionalidades: Consulta DCR
  - Componentes: Filtros, grid
  - Testes: Filtros de redução

- [ ] **frmCnsDespRE.aspx** → `pages/Query/Other/REDispatchQuery.tsx`
  - Funcionalidades: Consulta despacho RE
  - Componentes: Filtros, grid
  - Testes: Filtros de reserva

- [ ] **frmCnsRRO.aspx** → `pages/Query/Other/RROQuery.tsx`
  - Funcionalidades: Consulta RRO
  - Componentes: Filtros, grid
  - Testes: Filtros de rampa

- [ ] **frmCnsCompensacao.aspx** → `pages/Query/Other/CompensationQuery.tsx`
  - Funcionalidades: Consulta compensação
  - Componentes: Filtros, grid
  - Testes: Filtros, cálculos

- [ ] **frmCnsCreForaMerito.aspx** → `pages/Query/Other/OutOfMeritCREQuery.tsx`
  - Funcionalidades: Consulta CRE fora de mérito
  - Componentes: Filtros, justificativas
  - Testes: Filtros especiais

- [ ] **frmCnsGerForaMerito.aspx** → `pages/Query/Other/OutOfMeritGenerationQuery.tsx`
  - Funcionalidades: Consulta geração fora de mérito
  - Componentes: Filtros, justificativas
  - Testes: Filtros especiais

- [ ] **frmCnsResFaltaComb.aspx** → `pages/Query/Other/FuelShortageRestrictionQuery.tsx`
  - Funcionalidades: Consulta restrição por falta de combustível
  - Componentes: Filtros, alertas
  - Testes: Filtros críticos

- [ ] **frmCnsEnergiaRepPer.aspx** → `pages/Query/Other/ReplacementEnergyQuery.tsx`
  - Funcionalidades: Consulta energia de reposição
  - Componentes: Filtros temporais, grid
  - Testes: Filtros, cálculos

- [ ] **frmCnsPropGeracao.aspx** → `pages/Query/Other/GenerationProposalQuery.tsx`
  - Funcionalidades: Consulta proposta de geração
  - Componentes: Filtros, grid, status
  - Testes: Filtros, aprovações

#### 3.8 Consultas - Insumos Regulatórios
- [ ] **frmCnsIR1.aspx** → `pages/Query/Regulatory/IR1Query.tsx`
  - Funcionalidades: Consulta IR1
  - Componentes: Filtros, grid
  - Testes: Filtros regulatórios

- [ ] **frmCnsIR2.aspx** → `pages/Query/Regulatory/IR2Query.tsx`
  - Funcionalidades: Consulta IR2
  - Componentes: Filtros, grid
  - Testes: Filtros regulatórios

- [ ] **frmCnsIR3.aspx** → `pages/Query/Regulatory/IR3Query.tsx`
  - Funcionalidades: Consulta IR3
  - Componentes: Filtros, grid
  - Testes: Filtros regulatórios

- [ ] **frmCnsIR4.aspx** → `pages/Query/Regulatory/IR4Query.tsx`
  - Funcionalidades: Consulta IR4
  - Componentes: Filtros, grid
  - Testes: Filtros regulatórios

#### 3.9 Consultas - Cadastros
- [ ] **frmCnsUsina.aspx** → `pages/Query/Registry/PlantQuery.tsx`
  - Funcionalidades: Consulta de usinas
  - Componentes: Filtros, grid, detalhes
  - Testes: Filtros, navegação

- [ ] **frmCnsUsiDados.aspx** → `pages/Query/Registry/PlantDataQuery.tsx`
  - Funcionalidades: Consulta dados de usinas
  - Componentes: Filtros, detalhes técnicos
  - Testes: Visualização de dados

- [ ] **frmCnsEmpresa.aspx** → `pages/Query/Registry/CompanyQuery.tsx`
  - Funcionalidades: Consulta de empresas
  - Componentes: Filtros, grid
  - Testes: Filtros, detalhes

- [ ] **frmCnsCadInter.aspx** → `pages/Query/Registry/InterconnectionQuery.tsx`
  - Funcionalidades: Consulta cadastro de interligações
  - Componentes: Filtros, grid técnico
  - Testes: Filtros técnicos

#### 3.10 Consultas - Validação e Envio
- [ ] **frmCnsValidacao.aspx** → `pages/Query/Validation/ValidationQuery.tsx`
  - Funcionalidades: Consulta de validações
  - Componentes: Filtros, status, erros
  - Testes: Filtros, alertas

- [ ] **frmCnsEnvioEmp.aspx** → `pages/Query/Validation/CompanySendQuery.tsx`
  - Funcionalidades: Consulta envio por empresa
  - Componentes: Filtros, status, histórico
  - Testes: Filtros, rastreamento

- [ ] **frmCnsRecibo.aspx** → `pages/Query/Validation/ReceiptQuery.tsx`
  - Funcionalidades: Consulta de recibos
  - Componentes: Filtros, grid, download
  - Testes: Filtros, download

#### 3.11 Consultas - Arquivos e Importação
- [ ] **frmCnsArquivo.aspx** → `pages/Query/Files/FileQuery.tsx`
  - Funcionalidades: Consulta de arquivos
  - Componentes: Filtros, grid, download
  - Testes: Filtros, operações de arquivo

- [ ] **frmCnsArquivoEst.aspx** → `pages/Query/Files/StructuralFileQuery.tsx`
  - Funcionalidades: Consulta arquivos estruturais
  - Componentes: Filtros, grid, download
  - Testes: Filtros, validações

- [ ] **frmCnsImportacao.aspx** → `pages/Query/Files/ImportQuery.tsx`
  - Funcionalidades: Consulta de importações
  - Componentes: Filtros, status, log
  - Testes: Filtros, rastreamento

#### 3.12 Consultas - Outros
- [ ] **frmCnsMotivo.aspx** → `pages/Query/Other/ReasonQuery.tsx`
  - Funcionalidades: Consulta de motivos
  - Componentes: Filtros, grid
  - Testes: Filtros, categorias

- [ ] **frmCnsMotivoInfl.aspx** → `pages/Query/Other/InflexibilityReasonQuery.tsx`
  - Funcionalidades: Consulta motivos de inflexibilidade
  - Componentes: Filtros, grid
  - Testes: Filtros específicos

- [ ] **frmCnsMotivoRestr.aspx** → `pages/Query/Other/RestrictionReasonQuery.tsx`
  - Funcionalidades: Consulta motivos de restrição
  - Componentes: Filtros, grid
  - Testes: Filtros específicos

- [ ] **frmCnsObservacao.aspx** → `pages/Query/Other/ObservationQuery.tsx`
  - Funcionalidades: Consulta de observações
  - Componentes: Filtros, grid, detalhes
  - Testes: Filtros, visualização

- [ ] **frmCnsObservacoes.aspx** → `pages/Query/Other/ObservationsQuery.tsx`
  - Funcionalidades: Consulta múltiplas observações
  - Componentes: Filtros, grid agregado
  - Testes: Filtros, agrupamento

- [ ] **frmConsultaMarcoProgramacao.aspx** → `pages/Query/Other/ProgrammingMilestoneQuery.tsx`
  - Funcionalidades: Consulta marcos de programação
  - Componentes: Timeline, filtros
  - Testes: Filtros temporais

---

### Fase 4: Módulo de Administração (Prioridade Média)

#### 4.1 Cadastros Básicos
- [x] **frmCnsEmpresa.aspx** → `pages/Administration/Company.tsx`
  - Funcionalidades: Consulta e listagem de empresas do sistema PDP
  - Componentes: Tabela paginada com 11 colunas, paginação customizada
  - Testes: 22 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Administration/Company.tsx`
- `frontend/src/pages/Administration/Company.module.css`
- `frontend/src/types/company.ts`
- `frontend/tests/pages/Company.test.tsx`

#### 4.2 Gestão de Usuários
- [x] **frmCadUsuario.aspx** → `pages/Administration/UserRegistry.tsx`
  - Funcionalidades: Cadastro, alteração, exclusão e consulta de usuários
  - Componentes: Formulário (Login, Nome, E-mail, Telefone), tabela paginada (4 itens/página)
  - Testes: 36 testes unitários (100% aprovação)
  - Status: ✅ CONCLUÍDO

**Arquivos Criados:**
- `frontend/src/pages/Administration/UserRegistry.tsx`
- `frontend/src/pages/Administration/UserRegistry.module.css`
- `frontend/src/types/user.ts`
- `frontend/tests/pages/UserRegistry.test.tsx`

- [ ] **frmAssocUsuar.aspx** → `pages/Admin/Users/UserAssociation.tsx`
  - Funcionalidades: Associação de usuários
  - Componentes: Seleção múltipla, grupos
  - Testes: Associações, validações

- [ ] **frmAssocUsuarEquipe.aspx** → `pages/Admin/Users/UserTeamAssociation.tsx`
  - Funcionalidades: Associação usuário-equipe
  - Componentes: Grid, seleção
  - Testes: Associações, permissões

#### 4.3 Gestão de Equipes e Requisitos
- [ ] **frmCadEquipePDP.aspx** → `pages/Admin/Teams/TeamRegistry.tsx`
  - Funcionalidades: Cadastro de equipes PDP
  - Componentes: Formulário, membros
  - Testes: CRUD, validações

- [ ] **frmCadRequisito.aspx** → `pages/Admin/Requirements/RequirementRegistry.tsx`
  - Funcionalidades: Cadastro de requisitos
  - Componentes: Formulário, categorias
  - Testes: CRUD, validações

#### 4.3 Gestão de Agentes
- [ ] **frmControleAgente.aspx** → `pages/Admin/Agents/AgentControl.tsx`
  - Funcionalidades: Controle de agentes
  - Componentes: Grid, status, ações
  - Testes: Operações, validações

- [ ] **frmControleAgenteCad.aspx** → `pages/Admin/Agents/AgentRegistry.tsx`
  - Funcionalidades: Cadastro de agentes
  - Componentes: Formulário completo
  - Testes: CRUD, validações

#### 4.4 Gestão de Dados Mestre
- [ ] **frmManutencaoUG.aspx** → `pages/Admin/Master/UnitMaintenance.tsx`
  - Funcionalidades: Manutenção de unidades geradoras
  - Componentes: Formulário técnico, validações
  - Testes: CRUD, validações técnicas

- [ ] **frmManutencaoResponsaveis.aspx** → `pages/Admin/Master/ResponsibleMaintenance.tsx`
  - Funcionalidades: Manutenção de responsáveis
  - Componentes: Formulário, associações
  - Testes: CRUD, validações

- [ ] **frmRampasUsinasTerm.aspx** → `pages/Admin/Master/ThermalPlantRamps.tsx`
  - Funcionalidades: Rampas de usinas térmicas
  - Componentes: Grid editável, validações
  - Testes: Edição, cálculos

- [ ] **frmModalidadeOpTermica.aspx** → `pages/Admin/Master/ThermalOperatingMode.tsx`
  - Funcionalidades: Modalidade operativa térmica
  - Componentes: Formulário, configurações
  - Testes: CRUD, validações

- [ ] **frmUsinaConversora.aspx** → `pages/Admin/Master/ConverterPlant.tsx`
  - Funcionalidades: Usinas conversoras
  - Componentes: Formulário técnico
  - Testes: CRUD, validações técnicas

- [ ] **frmInflxContratada.aspx** → `pages/Admin/Master/ContractedInflexibility.tsx`
  - Funcionalidades: Inflexibilidade contratada
  - Componentes: Formulário, validações contratuais
  - Testes: CRUD, validações

- [ ] **frmInflxContratadaModal.aspx** → `pages/Admin/Master/ContractedInflexibilityModal.tsx`
  - Funcionalidades: Modal de inflexibilidade contratada
  - Componentes: Modal, formulário
  - Testes: Interação modal

---

### Fase 5: Módulo de Relatórios (Prioridade Baixa)

#### 5.1 Relatórios Gerais
- [ ] **frmRelatorio.aspx** → `pages/Reports/General/Report.tsx`
  - Funcionalidades: Relatórios gerais
  - Componentes: Seleção de relatório, parâmetros, visualização
  - Testes: Geração, exportação

- [ ] **frmPlanilha.aspx** → `pages/Reports/General/Spreadsheet.tsx`
  - Funcionalidades: Planilhas
  - Componentes: Grid, exportação Excel
  - Testes: Geração, download

- [ ] **frmRelOfertaReducaoSemana.aspx** → `pages/Reports/Specific/WeeklyReductionOfferReport.tsx`
  - Funcionalidades: Relatório oferta redução semanal
  - Componentes: Filtros, visualização, exportação
  - Testes: Geração, cálculos

#### 5.2 Programação
- [ ] **PDPProgDiaria.aspx** → `pages/Reports/Programming/DailyProgramming.tsx`
  - Funcionalidades: Programação diária
  - Componentes: Calendário, grid, exportação
  - Testes: Visualização, exportação

- [ ] **PDPProgSemanal.aspx** → `pages/Reports/Programming/WeeklyProgramming.tsx`
  - Funcionalidades: Programação semanal
  - Componentes: Calendário semanal, grid
  - Testes: Visualização, exportação

- [ ] **frmPDOC.aspx** → `pages/Reports/Programming/PDOC.tsx`
  - Funcionalidades: PDOC (Programa Diário de Operação Coordenada)
  - Componentes: Visualização complexa, exportação
  - Testes: Geração, validações

#### 5.3 Recibos e Resultados
- [ ] **frmRecibo.aspx** → `pages/Reports/Receipts/Receipt.tsx`
  - Funcionalidades: Recibo individual
  - Componentes: Visualização, impressão
  - Testes: Geração, impressão

- [ ] **frmReciboEst.aspx** → `pages/Reports/Receipts/StructuralReceipt.tsx`
  - Funcionalidades: Recibo estrutural
  - Componentes: Visualização, impressão
  - Testes: Geração, impressão

- [ ] **frmResultado.aspx** → `pages/Reports/Results/Result.tsx`
  - Funcionalidades: Resultados
  - Componentes: Dashboard, gráficos, exportação
  - Testes: Visualização, cálculos

---

### Fase 6: Módulo de Utilitários (Prioridade Baixa)

#### 6.1 Upload e Importação
- [ ] **frmUpload.aspx** → `pages/Utils/Upload/Upload.tsx`
  - Funcionalidades: Upload de arquivos
  - Componentes: Drag & drop, validação, progresso
  - Testes: Upload, validações

- [ ] **frmUploadRel.aspx** → `pages/Utils/Upload/ReportUpload.tsx`
  - Funcionalidades: Upload de relatórios
  - Componentes: Upload específico, validações
  - Testes: Upload, validações

- [ ] **frmMsgUpload.aspx** → `pages/Utils/Upload/UploadMessage.tsx`
  - Funcionalidades: Mensagem de upload
  - Componentes: Feedback, status
  - Testes: Exibição, estados

- [ ] **frmMsgUploadPac.aspx** → `pages/Utils/Upload/PackageUploadMessage.tsx`
  - Funcionalidades: Mensagem upload de pacote
  - Componentes: Feedback, progresso
  - Testes: Exibição, estados

#### 6.2 Envio e Exportação
- [ ] **frmEnviaDados.aspx** → `pages/Utils/Send/SendData.tsx`
  - Funcionalidades: Envio de dados
  - Componentes: Seleção, validação, envio
  - Testes: Envio, validações

- [ ] **frmEnviaDadosEst.aspx** → `pages/Utils/Send/SendStructuralData.tsx`
  - Funcionalidades: Envio dados estruturais
  - Componentes: Seleção, validação, envio
  - Testes: Envio, validações

- [ ] **frmExporta.aspx** → `pages/Utils/Export/Export.tsx`
  - Funcionalidades: Exportação de dados
  - Componentes: Seleção, formatos, download
  - Testes: Exportação, formatos

#### 6.3 Gestão de Arquivos
- [ ] **frmGerArquivo.aspx** → `pages/Utils/Files/FileManagement.tsx`
  - Funcionalidades: Gerenciamento de arquivos
  - Componentes: Grid, operações, download
  - Testes: Operações, validações

- [ ] **frmManDiretorio.aspx** → `pages/Utils/Files/DirectoryManagement.tsx`
  - Funcionalidades: Gerenciamento de diretórios
  - Componentes: Árvore, operações
  - Testes: Operações, validações

#### 6.4 Recuperação e Abertura
- [ ] **frmRecuperarDados.aspx** → `pages/Utils/Recovery/DataRecovery.tsx`
  - Funcionalidades: Recuperação de dados
  - Componentes: Seleção, validação, recuperação
  - Testes: Recuperação, validações

- [ ] **frmAberturaDia.aspx** → `pages/Utils/Opening/DayOpening.tsx`
  - Funcionalidades: Abertura de dia operativo
  - Componentes: Calendário, validações, confirmação
  - Testes: Abertura, validações

---

### Fase 7: Módulo de Integração (Prioridade Baixa)

#### 7.1 Mensagens e Notificações
- [ ] **frmMensagem.aspx** → `pages/Integration/Messages/Message.tsx`
  - Funcionalidades: Mensagens do sistema
  - Componentes: Lista, detalhes, ações
  - Testes: Exibição, interações

- [ ] **frmMensagemValidacaoEnvio.aspx** → `pages/Integration/Messages/ValidationSendMessage.tsx`
  - Funcionalidades: Mensagem validação de envio
  - Componentes: Feedback, erros, ações
  - Testes: Exibição, validações

- [ ] **PDP_frm_Aguarde.aspx** → `pages/Integration/Messages/WaitMessage.tsx`
  - Funcionalidades: Mensagem de aguarde
  - Componentes: Loading, progresso
  - Testes: Exibição, animação

#### 7.2 Páginas Auxiliares
- [ ] **health/teste.aspx** → `pages/Integration/Health/HealthCheck.tsx`
  - Funcionalidades: Health check
  - Componentes: Status, métricas
  - Testes: Verificações, status

---

### Fase 8: Páginas Especiais (Prioridade Baixa)

#### 8.1 Páginas Antigas (Old)
- [ ] **OldfrmAssocUsuarEquipe.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmRestricaoUG.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmRestricaoUS.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmColMaqParada.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsIR2.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmParadaUG.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsCadInter.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsRestricao.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsDCR.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsIR3.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsIntercambio.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmColMaqGerando.aspx** → Avaliar se ainda é necessário
- [ ] **OldfrmCnsCadInter.aspx** → Avaliar se ainda é necessário

**Nota:** Páginas com prefixo "Old" devem ser avaliadas para verificar se ainda são utilizadas ou se foram substituídas pelas versões mais recentes.

---

## 🧪 Estratégia de Testes

### Cobertura Mínima por Componente
- **Testes Unitários:** 100% de aprovação obrigatória
- **Testes de Integração:** Fluxos principais
- **Testes E2E:** Fluxos críticos de negócio

### Estrutura de Testes
```
frontend/
├── src/
│   ├── pages/
│   │   └── [Module]/
│   │       └── [Page]/
│   │           ├── [Page].tsx
│   │           └── [Page].test.tsx
│   └── components/
│       └── [Component]/
│           ├── [Component].tsx
│           └── [Component].test.tsx
```

### Checklist de Testes por Página
- [ ] Renderização sem erros
- [ ] Validações de formulário
- [ ] Interações do usuário
- [ ] Chamadas de API (mock)
- [ ] Estados de loading/erro
- [ ] Responsividade
- [ ] Acessibilidade (a11y)

---

## 📝 Convenções de Código

### Nomenclatura
- **Componentes:** PascalCase (ex: `FlowQuery.tsx`)
- **Arquivos de teste:** `[Component].test.tsx`
- **Hooks customizados:** `use[Name].ts`
- **Utilitários:** camelCase (ex: `formatDate.ts`)

### Estrutura de Componente
```typescript
// Imports
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Types
interface ComponentProps {
  // ...
}

// Component
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return (
    // JSX
  );
};

export default Component;
```

---

## 🔄 Processo de Migração Incremental

### Para cada página:

1. **Análise**
   - [ ] Estudar página legada (.aspx)
   - [ ] Identificar funcionalidades
   - [ ] Mapear componentes necessários
   - [ ] Identificar APIs/endpoints

2. **Desenvolvimento**
   - [ ] Criar estrutura de pastas
   - [ ] Criar tipos TypeScript
   - [ ] Implementar componente React
   - [ ] Implementar lógica de negócio
   - [ ] Aplicar estilos responsivos
   - [ ] Integrar com APIs

3. **Testes**
   - [ ] Criar testes unitários
   - [ ] Executar testes (100% aprovação)
   - [ ] Testar responsividade
   - [ ] Testar acessibilidade

4. **Revisão**
   - [ ] Code review
   - [ ] Validação com stakeholders
   - [ ] Ajustes finais

5. **Documentação**
   - [ ] Atualizar checklist
   - [ ] Documentar componentes
   - [ ] Atualizar README se necessário

---

## 📊 Métricas de Progresso

### Acompanhamento Semanal
- Páginas migradas
- Testes criados e aprovados
- Bugs encontrados e corrigidos
- Cobertura de código

### Relatório de Status
Atualizar semanalmente:
- Data: [DD/MM/YYYY]
- Páginas migradas: X/142
- Testes passando: X/X (100%)
- Bloqueios: [Descrição]
- Próximos passos: [Descrição]

---

## 🚀 Próximos Passos Imediatos

1. **Criar estrutura de pastas para páginas**
   ```bash
   mkdir -p frontend/src/pages/{Home,Auth,Collection,Query,Admin,Reports,Utils,Integration}
   ```

2. **Iniciar Fase 1: Páginas Essenciais**
   - Começar com `TelaInicialVazia.aspx` → `Home.tsx`
   - Implementar dashboard básico
   - Criar testes unitários

3. **Configurar React Router**
   - Instalar `react-router-dom`
   - Configurar rotas principais
   - Implementar navegação

4. **Configurar gerenciamento de estado**
   - Avaliar: Context API, Redux, Zustand
   - Implementar store global
   - Configurar persistência

5. **Configurar cliente HTTP**
   - Instalar `axios` ou `fetch`
   - Configurar interceptors
   - Implementar tratamento de erros

---

## 📚 Recursos e Referências

### Documentação
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Bootstrap Documentation](https://getbootstrap.com/)

### Ferramentas
- **Desenvolvimento:** Vite, React DevTools
- **Testes:** Vitest, Testing Library, Coverage
- **Linting:** ESLint, Prettier
- **Versionamento:** Git, GitHub

---

## ✅ Checklist de Conclusão

### Critérios de Aceitação
- [ ] Todas as 142 páginas migradas
- [ ] 100% dos testes unitários passando
- [ ] Design responsivo em todas as páginas
- [ ] Cores, fontes e ícones preservados
- [ ] Documentação completa
- [ ] Code review aprovado
- [ ] Validação com stakeholders
- [ ] Deploy em ambiente de homologação
- [ ] Testes de aceitação do usuário (UAT)
- [ ] Deploy em produção

---

**Última Atualização:** [Data Atual]
**Responsável:** Equipe de Desenvolvimento Frontend
**Status:** 🟢 Em Andamento (0.7% concluído)
