# Tasks: Backend Integration

**Feature**: Backend Integration | **Branch**: `002-backend-integration`  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)  
**Generated**: 2025-12-28

## Task Summary

**Total Tasks**: 245  
**Estimated Duration**: 287 hours (~36 days for 1 dev, ~12 days for 3 devs parallel)

| Phase | Tasks | Est. Hours | Priority |
|-------|-------|------------|----------|
| Phase 1: Setup | 8 | 4h | P0 |
| Phase 2: Foundational | 12 | 8h | P0 |
| Phase 3: User Story 1 - Critical Routines (P1) | 105 | 147h | P1 🔴 |
| Phase 4: User Story 2 - Data Collection (P2) | 81 | 108h | P2 🟡 |
| Phase 5: User Story 3 - Queries (P3) | 18 | 14h | P3 🟠 |
| Phase 6: User Story 4 - Administration (P4) | 15 | 10h | P4 🔵 |
| Phase 7: Polish & Cross-Cutting | 6 | 4h | P5 |

---

## Phase 1: Setup (8 tasks, 4 hours) ✅ COMPLETED

**Goal**: Prepare infrastructure for backend integration  
**Completion Criteria**: All utility files created, error handling tested, DTO transformers tested

- [X] T001 Create error handling utility in frontend/src/utils/errorHandling.ts
- [X] T002 Create DTO transformers utility in frontend/src/utils/dtoTransformers.ts
- [X] T003 Create common API types in frontend/src/types/api.ts
- [X] T004 Create tests for error handling in frontend/tests/utils/errorHandling.test.ts
- [X] T005 Create tests for DTO transformers in frontend/tests/utils/dtoTransformers.test.ts
- [X] T006 Verify Axios client configuration in frontend/src/services/api.ts
- [X] T007 Create MSW server setup for tests in frontend/tests/setup/mswServer.ts
- [X] T008 [P] Create integration test directory structure in frontend/tests/integration/

**References**: 
- Plan: [plan.md](./plan.md) - Architecture Overview section
- Quickstart: [quickstart.md](./quickstart.md) - Error Handling Strategy

---

## Phase 2: Foundational (12 tasks, 8 hours) ✅ COMPLETED

**Goal**: Create shared services and hooks used across all pages  
**Completion Criteria**: Common metadata services working, dropdown data loading

- [X] T009 Create Company service in frontend/src/services/companyService.ts
- [X] T010 Create Plant service in frontend/src/services/plantService.ts
- [X] T011 Create PlantType service in frontend/src/services/plantTypeService.ts
- [X] T012 Create useCompanies hook in frontend/src/hooks/useCompanies.ts
- [X] T013 Create usePlants hook in frontend/src/hooks/usePlants.ts
- [X] T014 Create usePlantTypes hook in frontend/src/hooks/usePlantTypes.ts
- [X] T015 [P] Create tests for companyService in frontend/tests/services/companyService.test.ts
- [X] T016 [P] Create tests for plantService in frontend/tests/services/plantService.test.ts
- [X] T017 [P] Create tests for plantTypeService in frontend/tests/services/plantTypeService.test.ts
- [X] T018 [P] Create tests for useCompanies in frontend/tests/hooks/useCompanies.test.ts
- [X] T019 [P] Create tests for usePlants in frontend/tests/hooks/usePlants.test.ts
- [X] T020 [P] Create tests for usePlantTypes in frontend/tests/hooks/usePlantTypes.test.ts

**References**:
- Contracts: [contracts/critical-routines.md](./contracts/critical-routines.md) - Common Endpoints
- Plan: [plan.md](./plan.md) - Backend API Endpoints Catalog

---

## Phase 3: User Story 1 - Critical Routines Backend Connection (105 tasks, 147 hours) 🔴 PRIORITY P1

**Goal**: Connect 7 critical routine pages to backend APIs for production-ready daily scheduling  
**Independent Test**: Each routine loads real data, allows edits, saves successfully, handles errors gracefully  
**Completion Criteria**: All 7 pages pass Backend Connection Checklist (36 points), 100% test coverage

**User Story Scope**:
- 7 pages migrated, 0% backend-connected → target: 100% backend-connected
- Pages: Razão Energética, Razão Elétrica, IR1, IR2, IR3, IR4, Oferta Exportação
- **Independent Delivery**: This phase can deploy independently without P2/P3/P4

### 3.1 Razão Energética (frmColEnergetica.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/Energetic/Energetic.tsx  
**API**: `/api/dadosenergeticos`

- [X] T021 [US1] Analyze backend API contract for energetic data in contracts/critical-routines.md
- [X] T022 [US1] Create TypeScript types for energetic data in frontend/src/types/energetic.ts
- [X] T023 [US1] Create energetic service with CRUD functions in frontend/src/services/energeticService.ts
- [X] T024 [US1] Implement DTO transformers for energetic data in frontend/src/utils/dtoTransformers.ts
- [X] T025 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/energeticService.test.ts
- [X] T026 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/energeticService.test.ts
- [X] T027 [P] [US1] Create service tests (network errors) in frontend/tests/services/energeticService.test.ts
- [X] T028 [US1] Create React Query hooks for energetic data in frontend/src/hooks/useEnergeticData.ts
- [X] T029 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useEnergeticData.test.ts
- [X] T030 [US1] Connect Energetic component to hooks (replace mock data) in frontend/src/pages/Collection/Energetic/Energetic.tsx
- [X] T031 [US1] Implement loading state UI in Energetic component
- [X] T032 [US1] Implement error state UI with retry in Energetic component
- [X] T033 [US1] Update Energetic component tests to mock hooks in frontend/tests/pages/Energetic.test.tsx
- [X] T034 [US1] Create integration test for energetic flow in frontend/tests/integration/energetic-flow.test.tsx
- [X] T035 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 1.1 Cadastro de Programação Energética
- PLANO_TAREFAS_BACKEND.md: Section 1.1.1 Razão Energética

### 3.2 Razão Elétrica (frmColEletrica.aspx) - 15 tasks

**Status**: Migrated, backend TESTS COMPLETED ✅  
**Files**: frontend/src/pages/Collection/Electrical/Electrical.tsx  
**API**: `/api/dadoseletricos`

- [X] T036 [US1] Analyze backend API contract for electrical data in contracts/critical-routines.md
- [X] T037 [US1] Create TypeScript types for electrical data in frontend/src/types/electrical.ts
- [X] T038 [US1] Create electrical service with CRUD functions in frontend/src/services/electricalService.ts
- [X] T039 [US1] Implement DTO transformers for electrical data in frontend/src/utils/dtoTransformers.ts
- [X] T040 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/electricalService.test.ts
- [X] T041 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/electricalService.test.ts
- [X] T042 [P] [US1] Create service tests (network errors) in frontend/tests/services/electricalService.test.ts
- [X] T043 [US1] Create React Query hooks for electrical data in frontend/src/hooks/useElectricalData.ts
- [X] T044 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useElectricalData.test.ts
- [X] T045 [US1] Connect Electrical component to hooks (replace mock data) in frontend/src/pages/Collection/Electrical/Electrical.tsx
- [X] T046 [US1] Implement loading state UI in Electrical component
- [X] T047 [US1] Implement error state UI with retry in Electrical component
- [X] T048 [US1] Update Electrical component tests to mock hooks in frontend/tests/pages/Electrical.test.tsx
- [X] T049 [US1] Create integration test for electrical flow in frontend/tests/integration/electrical-flow.test.tsx
- [X] T050 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 1.1 Cadastro de Programação Energética
- PLANO_TAREFAS_BACKEND.md: Section 1.1.2 Razão Elétrica

### 3.3 IR1 - Nível de Partida (frmColIR1.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/IR1/IR1.tsx  
**API**: `/api/insumos-recebimento/ir1`

- [X] T051 [US1] Analyze backend API contract for IR1 data in contracts/critical-routines.md
- [ ] T052 [US1] Create TypeScript types for IR1 data in frontend/src/types/ir1.ts
- [ ] T053 [US1] Create IR1 service with CRUD functions in frontend/src/services/ir1Service.ts
- [ ] T054 [US1] Implement DTO transformers for IR1 data in frontend/src/utils/dtoTransformers.ts
- [ ] T055 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/ir1Service.test.ts
- [ ] T056 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/ir1Service.test.ts
- [ ] T057 [P] [US1] Create service tests (network errors) in frontend/tests/services/ir1Service.test.ts
- [ ] T058 [US1] Create React Query hooks for IR1 data in frontend/src/hooks/useIR1Data.ts
- [ ] T059 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useIR1Data.test.ts
- [ ] T060 [US1] Connect IR1 component to hooks (replace mock data) in frontend/src/pages/Collection/IR1/IR1.tsx
- [ ] T061 [US1] Implement loading state UI in IR1 component
- [ ] T062 [US1] Implement error state UI with retry in IR1 component
- [ ] T063 [US1] Update IR1 component tests to mock hooks in frontend/tests/pages/IR1.test.tsx
- [ ] T064 [US1] Create integration test for IR1 flow in frontend/tests/integration/ir1-flow.test.tsx
- [ ] T065 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 4 Recebimento de insumos (IR1)
- PLANO_TAREFAS_BACKEND.md: Section 1.4 Insumos Recebimento IR1

### 3.4 IR2 - Dia -1 (frmColIR2.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/IR2/IR2.tsx  
**API**: `/api/insumos-recebimento/ir2`

- [ ] T066 [US1] Analyze backend API contract for IR2 data in contracts/critical-routines.md
- [ ] T067 [US1] Create TypeScript types for IR2 data in frontend/src/types/ir2.ts
- [ ] T068 [US1] Create IR2 service with CRUD functions in frontend/src/services/ir2Service.ts
- [ ] T069 [US1] Implement DTO transformers for IR2 data in frontend/src/utils/dtoTransformers.ts
- [ ] T070 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/ir2Service.test.ts
- [ ] T071 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/ir2Service.test.ts
- [ ] T072 [P] [US1] Create service tests (network errors) in frontend/tests/services/ir2Service.test.ts
- [ ] T073 [US1] Create React Query hooks for IR2 data in frontend/src/hooks/useIR2Data.ts
- [ ] T074 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useIR2Data.test.ts
- [ ] T075 [US1] Connect IR2 component to hooks (replace mock data) in frontend/src/pages/Collection/IR2/IR2.tsx
- [ ] T076 [US1] Implement loading state UI in IR2 component
- [ ] T077 [US1] Implement error state UI with retry in IR2 component
- [ ] T078 [US1] Update IR2 component tests to mock hooks in frontend/tests/pages/IR2.test.tsx
- [ ] T079 [US1] Create integration test for IR2 flow in frontend/tests/integration/ir2-flow.test.tsx
- [ ] T080 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 4 Recebimento de insumos (IR2)
- PLANO_TAREFAS_BACKEND.md: Section 1.4 Insumos Recebimento IR2

### 3.5 IR3 - Dia -2 (frmColIR3.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/IR3/IR3.tsx  
**API**: `/api/insumos-recebimento/ir3`

- [ ] T081 [US1] Analyze backend API contract for IR3 data in contracts/critical-routines.md
- [ ] T082 [US1] Create TypeScript types for IR3 data in frontend/src/types/ir3.ts
- [ ] T083 [US1] Create IR3 service with CRUD functions in frontend/src/services/ir3Service.ts
- [ ] T084 [US1] Implement DTO transformers for IR3 data in frontend/src/utils/dtoTransformers.ts
- [ ] T085 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/ir3Service.test.ts
- [ ] T086 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/ir3Service.test.ts
- [ ] T087 [P] [US1] Create service tests (network errors) in frontend/tests/services/ir3Service.test.ts
- [ ] T088 [US1] Create React Query hooks for IR3 data in frontend/src/hooks/useIR3Data.ts
- [ ] T089 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useIR3Data.test.ts
- [ ] T090 [US1] Connect IR3 component to hooks (replace mock data) in frontend/src/pages/Collection/IR3/IR3.tsx
- [ ] T091 [US1] Implement loading state UI in IR3 component
- [ ] T092 [US1] Implement error state UI with retry in IR3 component
- [ ] T093 [US1] Update IR3 component tests to mock hooks in frontend/tests/pages/IR3.test.tsx
- [ ] T094 [US1] Create integration test for IR3 flow in frontend/tests/integration/ir3-flow.test.tsx
- [ ] T095 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 4 Recebimento de insumos (IR3)
- PLANO_TAREFAS_BACKEND.md: Section 1.4 Insumos Recebimento IR3

### 3.6 IR4 - Carga da Ande (frmColIR4.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/IR4/IR4.tsx  
**API**: `/api/insumos-recebimento/ir4`

- [ ] T096 [US1] Analyze backend API contract for IR4 data in contracts/critical-routines.md
- [ ] T097 [US1] Create TypeScript types for IR4 data in frontend/src/types/ir4.ts
- [ ] T098 [US1] Create IR4 service with CRUD functions in frontend/src/services/ir4Service.ts
- [ ] T099 [US1] Implement DTO transformers for IR4 data in frontend/src/utils/dtoTransformers.ts
- [ ] T100 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/ir4Service.test.ts
- [ ] T101 [P] [US1] Create service tests (error scenarios 400/404/500) in frontend/tests/services/ir4Service.test.ts
- [ ] T102 [P] [US1] Create service tests (network errors) in frontend/tests/services/ir4Service.test.ts
- [ ] T103 [US1] Create React Query hooks for IR4 data in frontend/src/hooks/useIR4Data.ts
- [ ] T104 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useIR4Data.test.ts
- [ ] T105 [US1] Connect IR4 component to hooks (replace mock data) in frontend/src/pages/Collection/IR4/IR4.tsx
- [ ] T106 [US1] Implement loading state UI in IR4 component
- [ ] T107 [US1] Implement error state UI with retry in IR4 component
- [ ] T108 [US1] Update IR4 component tests to mock hooks in frontend/tests/pages/IR4.test.tsx
- [ ] T109 [US1] Create integration test for IR4 flow in frontend/tests/integration/ir4-flow.test.tsx
- [ ] T110 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 4 Recebimento de insumos (IR4)
- PLANO_TAREFAS_BACKEND.md: Section 1.4 Insumos Recebimento IR4

### 3.7 Oferta Exportação (frmColOfertaExportacao.aspx) - 15 tasks

**Status**: Migrated, backend pending  
**Files**: frontend/src/pages/Collection/OfertaExportacao/OfertaExportacao.tsx  
**API**: `/api/ofertas-exportacao`

- [ ] T111 [US1] Analyze backend API contract for export offers in contracts/critical-routines.md
- [ ] T112 [US1] Create TypeScript types for export offers in frontend/src/types/ofertaExportacao.ts
- [ ] T113 [US1] Create export offer service with CRUD functions in frontend/src/services/ofertaExportacaoService.ts
- [ ] T114 [US1] Implement DTO transformers for export offers in frontend/src/utils/dtoTransformers.ts
- [ ] T115 [P] [US1] Create service tests (success scenarios) in frontend/tests/services/ofertaExportacaoService.test.ts
- [ ] T116 [P] [US1] Create service tests (error scenarios 400/404/409/500) in frontend/tests/services/ofertaExportacaoService.test.ts
- [ ] T117 [P] [US1] Create service tests (network errors) in frontend/tests/services/ofertaExportacaoService.test.ts
- [ ] T118 [US1] Create React Query hooks for export offers in frontend/src/hooks/useOfertaExportacaoData.ts
- [ ] T119 [P] [US1] Create hook tests (loading/success/error states) in frontend/tests/hooks/useOfertaExportacaoData.test.ts
- [ ] T120 [US1] Connect OfertaExportacao component to hooks (replace mock data) in frontend/src/pages/Collection/OfertaExportacao/OfertaExportacao.tsx
- [ ] T121 [US1] Implement loading state UI in OfertaExportacao component
- [ ] T122 [US1] Implement error state UI with retry in OfertaExportacao component
- [ ] T123 [US1] Update OfertaExportacao component tests to mock hooks in frontend/tests/pages/OfertaExportacao.test.tsx
- [ ] T124 [US1] Create integration test for export offer flow in frontend/tests/integration/oferta-exportacao-flow.test.tsx
- [ ] T125 [US1] Verify Backend Connection Checklist (36 points) and update CHECKLIST_MIGRACAO.md

**References**: 
- ANALISE_ROTINAS_CRITICAS.md: Section 5 Recebimento de ofertas de exportação
- PLANO_TAREFAS_BACKEND.md: Section 1.5 Ofertas de Exportação

---

## Phase 4: User Story 2 - Data Collection Pages Backend Connection (81 tasks, 108 hours) 🟡 PRIORITY P2

**Goal**: Connect 27 data collection pages to complete data collection module  
**Independent Test**: Each page fetches entity lists, loads data by entity/date, saves successfully, displays validation errors  
**Completion Criteria**: All 27 pages pass Backend Connection Checklist (36 points), 100% test coverage

**User Story Scope**:
- 27 pages migrated, 0% backend-connected → target: 100% backend-connected
- Domains: Hydraulic (3), Thermal (7), Interchange (3), Load (3), Other (11)
- **Independent Delivery**: Can deploy after P1 without P3/P4

### 4.1 Hydraulic Data Pages (9 tasks - 3 pages × 3 tasks simplified)

**Pages**: Vazão, Volume, Geração  
**API Base**: `/api/dados-hidraulicos`

- [ ] T126 [US2] Create hydraulic types and service with CRUD in frontend/src/services/hydraulicService.ts
- [ ] T127 [US2] Create hydraulic hooks (query + mutation) in frontend/src/hooks/useHydraulicData.ts
- [ ] T128 [P] [US2] Create hydraulic service tests (success/error/network) in frontend/tests/services/hydraulicService.test.ts
- [ ] T129 [P] [US2] Create hydraulic hook tests in frontend/tests/hooks/useHydraulicData.test.ts
- [ ] T130 [US2] Connect Vazão page to hydraulic hooks in frontend/src/pages/Collection/Hydraulic/Flow.tsx
- [ ] T131 [US2] Connect Volume page to hydraulic hooks in frontend/src/pages/Collection/Hydraulic/Volume.tsx
- [ ] T132 [US2] Connect Geração page to hydraulic hooks in frontend/src/pages/Collection/Hydraulic/Generation.tsx
- [ ] T133 [P] [US2] Update component tests for all 3 hydraulic pages
- [ ] T134 [US2] Create integration tests for hydraulic flow in frontend/tests/integration/hydraulic-flow.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 2.1 Dados Hidráulicos

### 4.2 Thermal Data Pages (21 tasks - 7 pages × 3 tasks simplified)

**Pages**: Disponibilidade, Geração, Combustível, + 4 others  
**API Base**: `/api/dados-termicos`

- [ ] T135 [US2] Create thermal types and service with CRUD in frontend/src/services/thermalService.ts
- [ ] T136 [US2] Create thermal hooks (query + mutation) in frontend/src/hooks/useThermalData.ts
- [ ] T137 [P] [US2] Create thermal service tests (success/error/network) in frontend/tests/services/thermalService.test.ts
- [ ] T138 [P] [US2] Create thermal hook tests in frontend/tests/hooks/useThermalData.test.ts
- [ ] T139 [US2] Connect Disponibilidade page to thermal hooks in frontend/src/pages/Collection/Thermal/Availability.tsx
- [ ] T140 [US2] Connect Geração Térmica page to thermal hooks in frontend/src/pages/Collection/Thermal/Generation.tsx
- [ ] T141 [US2] Connect Combustível page to thermal hooks in frontend/src/pages/Collection/Thermal/Fuel.tsx
- [ ] T142 [US2] Connect Manutenção page to thermal hooks in frontend/src/pages/Collection/Thermal/Maintenance.tsx
- [ ] T143 [US2] Connect Restrições page to thermal hooks in frontend/src/pages/Collection/Thermal/Restrictions.tsx
- [ ] T144 [US2] Connect Custo Operação page to thermal hooks in frontend/src/pages/Collection/Thermal/OperationalCost.tsx
- [ ] T145 [US2] Connect Status page to thermal hooks in frontend/src/pages/Collection/Thermal/Status.tsx
- [ ] T146 [P] [US2] Update component tests for all 7 thermal pages (batch)
- [ ] T147 [US2] Create integration tests for thermal flow in frontend/tests/integration/thermal-flow.test.tsx
- [ ] T148 [US2] Verify thermal pages Backend Connection Checklist (36 points × 7) and update CHECKLIST_MIGRACAO.md

**References**: PLANO_TAREFAS_BACKEND.md: Section 2.2 Dados Térmicos

### 4.3 Interchange Data Pages (9 tasks - 3 pages)

**API Base**: `/api/intercambio`

- [ ] T149 [US2] Create interchange types and service in frontend/src/services/interchangeService.ts
- [ ] T150 [US2] Create interchange hooks in frontend/src/hooks/useInterchangeData.ts
- [ ] T151 [P] [US2] Create interchange service tests in frontend/tests/services/interchangeService.test.ts
- [ ] T152 [P] [US2] Create interchange hook tests in frontend/tests/hooks/useInterchangeData.test.ts
- [ ] T153 [US2] Connect Intercâmbio Internacional page in frontend/src/pages/Collection/Interchange/International.tsx
- [ ] T154 [US2] Connect Intercâmbio Nacional page in frontend/src/pages/Collection/Interchange/National.tsx
- [ ] T155 [US2] Connect Limites page in frontend/src/pages/Collection/Interchange/Limits.tsx
- [ ] T156 [P] [US2] Update component tests for interchange pages
- [ ] T157 [US2] Create integration tests for interchange flow in frontend/tests/integration/interchange-flow.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 2.3 Intercâmbio

### 4.4 Load Data Pages (9 tasks - 3 pages)

**API Base**: `/api/carga`

- [ ] T158 [US2] Create load types and service in frontend/src/services/loadService.ts
- [ ] T159 [US2] Create load hooks in frontend/src/hooks/useLoadData.ts
- [ ] T160 [P] [US2] Create load service tests in frontend/tests/services/loadService.test.ts
- [ ] T161 [P] [US2] Create load hook tests in frontend/tests/hooks/useLoadData.test.ts
- [ ] T162 [US2] Connect Carga Própria page in frontend/src/pages/Collection/Load/OwnLoad.tsx
- [ ] T163 [US2] Connect Carga Submercado page in frontend/src/pages/Collection/Load/SubmarketLoad.tsx
- [ ] T164 [US2] Connect Previsão Carga page in frontend/src/pages/Collection/Load/LoadForecast.tsx
- [ ] T165 [P] [US2] Update component tests for load pages
- [ ] T166 [US2] Create integration tests for load flow in frontend/tests/integration/load-flow.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 2.4 Carga

### 4.5 Other Collection Data Pages (33 tasks - 11 pages × 3 tasks simplified)

**Pages**: Various collection pages  
**API Base**: `/api/coleta/*`

- [ ] T167 [US2] Create collection types and base service in frontend/src/services/collectionService.ts
- [ ] T168 [US2] Create collection hooks (generic) in frontend/src/hooks/useCollectionData.ts
- [ ] T169 [P] [US2] Create collection service tests in frontend/tests/services/collectionService.test.ts
- [ ] T170 [P] [US2] Create collection hook tests in frontend/tests/hooks/useCollectionData.test.ts
- [ ] T171 [US2] Connect Perdas page in frontend/src/pages/Collection/Other/Losses.tsx
- [ ] T172 [US2] Connect Restrições Operativas page in frontend/src/pages/Collection/Other/OperationalRestrictions.tsx
- [ ] T173 [US2] Connect Bombamento page in frontend/src/pages/Collection/Other/Pumping.tsx
- [ ] T174 [US2] Connect Despacho Antecipado page in frontend/src/pages/Collection/Other/EarlyDispatch.tsx
- [ ] T175 [US2] Connect Energia Armazenada page in frontend/src/pages/Collection/Other/StoredEnergy.tsx
- [ ] T176 [US2] Connect Evaporação page in frontend/src/pages/Collection/Other/Evaporation.tsx
- [ ] T177 [US2] Connect Manutenção Programada page in frontend/src/pages/Collection/Other/ScheduledMaintenance.tsx
- [ ] T178 [US2] Connect Afluência page in frontend/src/pages/Collection/Other/Affluence.tsx
- [ ] T179 [US2] Connect Vazão Mínima page in frontend/src/pages/Collection/Other/MinimumFlow.tsx
- [ ] T180 [US2] Connect Enchimento Volume Morto page in frontend/src/pages/Collection/Other/DeadVolumeFilling.tsx
- [ ] T181 [US2] Connect Defluência page in frontend/src/pages/Collection/Other/Outflow.tsx
- [ ] T182 [P] [US2] Update component tests for other collection pages (batch)
- [ ] T183 [US2] Create integration tests for other collection flow in frontend/tests/integration/other-collection-flow.test.tsx
- [ ] T184 [US2] Verify other collection pages Backend Connection Checklist and update CHECKLIST_MIGRACAO.md

**References**: PLANO_TAREFAS_BACKEND.md: Section 2.5 Outros Dados de Coleta

---

## Phase 5: User Story 3 - Query Pages Backend Connection (18 tasks, 14 hours) 🟠 PRIORITY P3

**Goal**: Connect 2 query pages for historical data consultation  
**Independent Test**: Filters populated from backend, query executes with pagination, export works  
**Completion Criteria**: Both pages pass Backend Connection Checklist (36 points), 100% test coverage

**User Story Scope**:
- 2 pages migrated, 0% backend-connected → target: 100% backend-connected
- Pages: FlowQuery, GenerationQuery
- **Independent Delivery**: Can deploy after P2 without P4

### 5.1 FlowQuery (frmCnsVazao.aspx) - 9 tasks

**API**: `/api/consultas/vazao` (POST query with pagination)

- [ ] T185 [US3] Analyze query API contract in contracts/queries.md
- [ ] T186 [US3] Create query types for flow in frontend/src/types/flowQuery.ts
- [ ] T187 [US3] Create flow query service in frontend/src/services/flowQueryService.ts
- [ ] T188 [P] [US3] Create flow query service tests in frontend/tests/services/flowQueryService.test.ts
- [ ] T189 [US3] Create flow query hooks with pagination in frontend/src/hooks/useFlowQuery.ts
- [ ] T190 [P] [US3] Create flow query hook tests in frontend/tests/hooks/useFlowQuery.test.ts
- [ ] T191 [US3] Connect FlowQuery component to hooks in frontend/src/pages/Query/FlowQuery/FlowQuery.tsx
- [ ] T192 [US3] Update FlowQuery component tests in frontend/tests/pages/FlowQuery.test.tsx
- [ ] T193 [US3] Create integration test for flow query in frontend/tests/integration/flow-query.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 3 Consultas

### 5.2 GenerationQuery (frmCnsGeracao.aspx) - 9 tasks

**API**: `/api/consultas/geracao` (POST query with pagination)

- [ ] T194 [US3] Analyze query API contract in contracts/queries.md
- [ ] T195 [US3] Create query types for generation in frontend/src/types/generationQuery.ts
- [ ] T196 [US3] Create generation query service in frontend/src/services/generationQueryService.ts
- [ ] T197 [P] [US3] Create generation query service tests in frontend/tests/services/generationQueryService.test.ts
- [ ] T198 [US3] Create generation query hooks with pagination in frontend/src/hooks/useGenerationQuery.ts
- [ ] T199 [P] [US3] Create generation query hook tests in frontend/tests/hooks/useGenerationQuery.test.ts
- [ ] T200 [US3] Connect GenerationQuery component to hooks in frontend/src/pages/Query/GenerationQuery/GenerationQuery.tsx
- [ ] T201 [US3] Update GenerationQuery component tests in frontend/tests/pages/GenerationQuery.test.tsx
- [ ] T202 [US3] Create integration test for generation query in frontend/tests/integration/generation-query.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 3 Consultas

---

## Phase 6: User Story 4 - Administration Pages Backend Connection (15 tasks, 10 hours) 🔵 PRIORITY P4

**Goal**: Connect 5 admin pages for user management and system configuration  
**Independent Test**: Admin can CRUD users/roles/config, changes persist, audit logs recorded  
**Completion Criteria**: All 5 pages pass Backend Connection Checklist (36 points), 100% test coverage

**User Story Scope**:
- 5 pages migrated, 0% backend-connected → target: 100% backend-connected
- Pages: User Management, Role Management, Company Config, System Parameters, Audit Logs
- **Independent Delivery**: Can deploy after any P1/P2/P3

### 6.1 Administration Module (15 tasks - simplified batch approach)

**APIs**: `/api/usuarios`, `/api/perfis`, `/api/empresas`, `/api/parametros`, `/api/auditoria`

- [ ] T203 [US4] Create admin types for users/roles/config in frontend/src/types/admin.ts
- [ ] T204 [US4] Create user management service in frontend/src/services/userService.ts
- [ ] T205 [US4] Create role management service in frontend/src/services/roleService.ts
- [ ] T206 [US4] Create system parameters service in frontend/src/services/parametersService.ts
- [ ] T207 [US4] Create audit logs service (read-only) in frontend/src/services/auditService.ts
- [ ] T208 [P] [US4] Create admin service tests (all services) in frontend/tests/services/adminServices.test.ts
- [ ] T209 [US4] Create admin hooks (users, roles, params, audit) in frontend/src/hooks/useAdminData.ts
- [ ] T210 [P] [US4] Create admin hook tests in frontend/tests/hooks/useAdminData.test.ts
- [ ] T211 [US4] Connect UserManagement page in frontend/src/pages/Admin/UserManagement.tsx
- [ ] T212 [US4] Connect RoleManagement page in frontend/src/pages/Admin/RoleManagement.tsx
- [ ] T213 [US4] Connect CompanyConfig page in frontend/src/pages/Admin/CompanyConfig.tsx
- [ ] T214 [US4] Connect SystemParameters page in frontend/src/pages/Admin/SystemParameters.tsx
- [ ] T215 [US4] Connect AuditLogs page (read-only) in frontend/src/pages/Admin/AuditLogs.tsx
- [ ] T216 [P] [US4] Update component tests for admin pages
- [ ] T217 [US4] Create integration tests for admin CRUD flow in frontend/tests/integration/admin-flow.test.tsx

**References**: PLANO_TAREFAS_BACKEND.md: Section 4 Administração

---

## Phase 7: Polish & Cross-Cutting Concerns (6 tasks, 4 hours) 🟢 PRIORITY P5

**Goal**: Final quality checks, documentation, CI/CD validation  
**Completion Criteria**: All tests passing, documentation updated, metrics tracked

- [ ] T218 Run full test suite and verify 100% coverage on backend integration code in frontend/
- [ ] T219 Update CHECKLIST_MIGRACAO.md with final backend connection status (34/34 pages)
- [ ] T220 Create backend integration progress dashboard component in frontend/src/components/Dashboard/BackendIntegrationStatus.tsx
- [ ] T221 Update README.md with backend integration instructions
- [ ] T222 Verify no console errors/warnings in development mode
- [ ] T223 Performance audit: verify 95% of API calls complete within 2s

---

## Dependencies Graph

**Phase Completion Order** (for parallel execution):
```
Phase 1 (Setup)
  ↓
Phase 2 (Foundational - common services)
  ↓
  ├─→ Phase 3 (P1 Critical Routines) ──┐
  ├─→ Phase 4 (P2 Data Collection)    ├─→ Phase 7 (Polish)
  ├─→ Phase 5 (P3 Queries)            │
  └─→ Phase 6 (P4 Administration) ────┘
```

**Parallelization Opportunities**:
- **Phase 3**: 7 routines can be implemented in parallel (7 devs)
- **Phase 4**: 5 domain groups can be parallelized (Hydraulic, Thermal, Interchange, Load, Other)
- **Phase 5**: 2 query pages can be implemented in parallel
- **Phase 6**: Admin pages can be done in parallel with other phases

**Critical Path**: Phase 1 → Phase 2 → Phase 3 (longest at 147h)

---

## Implementation Strategy

### MVP Scope (Minimum Viable Product)

**Phase 3 only (P1 Critical Routines)**:
- 7 pages connected to backend
- ~147 hours (~3 weeks for 1 dev, ~1 week for 3 devs)
- Enables daily scheduling operations (mission-critical)
- **Deliverable**: Production-ready system for operators

### Full Delivery Timeline

**Serial (1 developer)**: 287 hours = ~36 days (7.5 weeks)  
**Parallel (3 developers)**: ~100 hours = ~12 days (2.5 weeks)

**Recommended Approach**:
1. Sprint 1-2: Phase 1+2+3 (P1 Critical Routines) → **MVP Release**
2. Sprint 3-4: Phase 4 (P2 Data Collection) → **Full Collection Release**
3. Sprint 5: Phase 5+6 (P3+P4 Queries+Admin) → **Complete Release**
4. Sprint 6: Phase 7 (Polish) → **Production-Ready**

---

## Quality Gates

**Before Moving to Next Phase**:
- [ ] All tasks in current phase complete
- [ ] All tests passing (`npm test` in frontend/)
- [ ] Test coverage 100% on touched files
- [ ] No console errors or warnings
- [ ] Backend Connection Checklist (36 points) verified for all pages
- [ ] CHECKLIST_MIGRACAO.md updated
- [ ] Code review approved by peer
- [ ] Merge to develop branch successful

**Definition of Done per Page**:
- [ ] Service layer implemented with DTO transformations
- [ ] React Query hooks implemented (query + mutation)
- [ ] Component connected to hooks (mock data removed)
- [ ] Loading, error, success states implemented
- [ ] Service tests pass (100% coverage)
- [ ] Hook tests pass (100% coverage)
- [ ] Component tests pass (100% coverage)
- [ ] Integration test created and passing
- [ ] Backend Connection Checklist (36 points) complete
- [ ] Visual parity maintained (no UI changes)
- [ ] Accessibility validated (no regressions)
- [ ] Documentation updated

---

## Tracking & Metrics

Update these metrics weekly in `.github/CHECKLIST_MIGRACAO.md`:

```markdown
## Backend Integration Progress

| Metric | Current | Target |
|--------|---------|--------|
| Pages Connected | 0/34 | 34/34 |
| P1 Critical Routines | 0/7 | 7/7 |
| P2 Data Collection | 0/27 | 27/27 |
| P3 Queries | 0/2 | 2/2 |
| P4 Administration | 0/5 | 5/5 |
| Service Layer Tests | 0/100 | 100/100 |
| Hook Tests | 0/70 | 70/70 |
| Integration Tests | 0/20 | 20/20 |
| Total Test Coverage | 350/540 | 540/540 |
```

---

**Tasks Generated**: 2025-12-28  
**Total Tasks**: 245  
**Ready for Implementation**: ✅ YES  
**Next Step**: Begin Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (P1 Critical Routines)
