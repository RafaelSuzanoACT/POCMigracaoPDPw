# Tasks: PDPw Frontend Migration

**Input**: Design documents from `/specs/001-frontend-migration/`
**Prerequisites**: ✅ plan.md, ✅ spec.md, constitution.md

**Tests**: Unit tests and integration tests are MANDATORY for all tasks per Constitution Principle II (100% test coverage).

**Organization**: Tasks are grouped by user story (critical routines first) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US5)
- Include exact file paths in descriptions

## Project Structure

- **Frontend**: `frontend/src/`, `frontend/tests/`
- **Backend**: Separate repository (ONS_PoC-PDPW_V2) - API endpoints only

---

## Phase 1: Setup (Shared Infrastructure) ✅ COMPLETE

**Status**: Infrastructure complete per CHECKLIST_MIGRACAO.md - 8/8 components implemented

- [x] T001 Layout and navigation infrastructure (Header, Navigation, Footer, Layout)
- [x] T002 React Router setup with protected routes
- [x] T003 State management (Zustand stores: authStore, appStore)
- [x] T004 API client with Axios interceptors
- [x] T005 Base component library structure
- [x] T006 CSS Modules and theme configuration
- [x] T007 Testing infrastructure (Vitest, React Testing Library)
- [x] T008 Authentication pages (Splash, IntegrationAuth)

**Checkpoint**: ✅ Foundation complete - 350+ tests passing (100%)

---

## Phase 2: Foundational (Blocking Prerequisites) ✅ COMPLETE

**Status**: All foundational components implemented per PLANO_MIGRACAO.md

- [x] T009 Home dashboard page implementation
- [x] T010 Example/template page for reference
- [x] T011 Shared form components (FormField, DatePicker, CompanySelector)
- [x] T012 Shared data components (DataGrid48Intervals, TextareaOverlay)
- [x] T013 Common utilities (formatters, validators, calculators)
- [x] T014 Error handling and loading states infrastructure

**Checkpoint**: ✅ Foundation ready - user story implementation can begin

---

## Phase 3: User Story 1 - Critical Routine Migration (Priority: P1) 🔴 MAXIMUM

**Goal**: Migrate 7 remaining critical routine pages (14 pages total) to complete frontend for all 7 critical routines required for daily energy production scheduling.

**Independent Test**: Each critical routine page renders correctly with all interactive elements (48-interval grids, cascading filters, textarea overlays), performs client-side calculations, and maintains visual parity with legacy system.

**Status**: 7/14 pages migrated (50%), 7/14 pages pending

---

### 🎯 Routine 1: Cadastro de Programação Energética, Elétrica e Previsão Eólica (1/3 pages pending)

#### T015-T027: Previsão Eólica (frmColPrevisaoEolica.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T015 [P] [US1] Analyze legacy page in `legado/frmColPrevisaoEolica.aspx` and business rules in `.vb` code-behind
- [ ] T016 [P] [US1] Create TypeScript types in `frontend/src/types/windForecast.ts` (WindForecastData, WindForecastForm, WindForecastInterval)
- [ ] T017 [US1] Create WindForecast page component in `frontend/src/pages/Collection/Wind/WindForecast.tsx`
- [ ] T018 [US1] Create CSS Module in `frontend/src/pages/Collection/Wind/WindForecast.module.css` matching legacy styles
- [ ] T019 [US1] Implement cascading filters (Data PDP → Empresa → Parque Eólico)
- [ ] T020 [US1] Implement 48-interval grid (half-hour intervals, 24 hours)
- [ ] T021 [US1] Implement total and average calculations (sum of 48 intervals, average)
- [ ] T022 [US1] Implement textarea overlay for bulk data entry
- [ ] T023 [US1] Implement chart visualization (forecast vs actual generation)
- [ ] T024 [US1] Implement form validation (required fields, numeric ranges, date ranges)
- [ ] T025 [US1] Create unit tests in `frontend/tests/pages/WindForecast.test.tsx` (rendering, filters, grid editing, calculations, validation, textarea, chart)
- [ ] T026 [US1] Add route `/coleta/eolica/previsao` to `frontend/src/App.tsx`
- [ ] T027 [US1] Verify 100% test coverage and visual parity with legacy

**Checkpoint**: Previsão Eólica page complete with 100% test coverage

---

### 🗂️ Routine 2: Geração de Arquivos para Modelos (2/2 pages pending)

#### T028-T040: Gerenciamento de Arquivos (frmGerArquivo.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T028 [P] [US1] Analyze legacy page in `legado/frmGerArquivo.aspx` and business rules in `.vb` code-behind
- [ ] T029 [P] [US1] Create TypeScript types in `frontend/src/types/fileManagement.ts` (FileData, FileFilter, FileOperation)
- [ ] T030 [US1] Create FileManagement page component in `frontend/src/pages/Utils/Files/FileManagement.tsx`
- [ ] T031 [US1] Create CSS Module in `frontend/src/pages/Utils/Files/FileManagement.module.css`
- [ ] T032 [US1] Implement file list grid with filters (date range, model type, status, company)
- [ ] T033 [US1] Implement file operations (view, download, delete) with confirmation dialogs
- [ ] T034 [US1] Implement file validation (format, size, content structure)
- [ ] T035 [US1] Implement pagination and sorting for file list
- [ ] T036 [US1] Implement search functionality (file name, model type)
- [ ] T037 [US1] Create unit tests in `frontend/tests/pages/FileManagement.test.tsx` (rendering, grid, filters, operations, validation, pagination)
- [ ] T038 [US1] Add route `/utilitarios/arquivos` to `frontend/src/App.tsx`
- [ ] T039 [US1] Verify 100% test coverage
- [ ] T040 [US1] Validate file operations UI flow matches legacy

**Checkpoint**: Gerenciamento de Arquivos complete with 100% test coverage

#### T041-T054: Geração de Modelos (frmGerModelos.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T041 [P] [US1] Analyze legacy page in `legado/frmGerModelos.aspx` and business rules in `.vb` code-behind
- [ ] T042 [P] [US1] Create TypeScript types in `frontend/src/types/modelGeneration.ts` (ModelType, ModelConfig, GenerationProgress)
- [ ] T043 [US1] Create ModelGeneration page component in `frontend/src/pages/Utils/Models/ModelGeneration.tsx`
- [ ] T044 [US1] Create CSS Module in `frontend/src/pages/Utils/Models/ModelGeneration.module.css`
- [ ] T045 [US1] Implement model type selection (DESSEM, DECOMP, NEWAVE)
- [ ] T046 [US1] Implement configuration panel (date range, companies, parameters)
- [ ] T047 [US1] Implement validation checklist (all required data collected, no conflicts)
- [ ] T048 [US1] Implement generation progress indicator (stages, current step, percentage)
- [ ] T049 [US1] Implement generation log display (real-time messages, warnings, errors)
- [ ] T050 [US1] Implement file preview before generation
- [ ] T051 [US1] Create unit tests in `frontend/tests/pages/ModelGeneration.test.tsx` (rendering, model selection, configuration, validation, progress, logs)
- [ ] T052 [US1] Add route `/utilitarios/modelos` to `frontend/src/App.tsx`
- [ ] T053 [US1] Verify 100% test coverage
- [ ] T054 [US1] Validate model generation workflow matches legacy

**Checkpoint**: Geração de Modelos complete with 100% test coverage

---

### 📋 Routine 3: Finalização da Programação (2/2 pages pending)

#### T055-T068: Finalização (frmFinalizacao.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T055 [P] [US1] Analyze legacy page in `legado/frmFinalizacao.aspx` and business rules in `.vb` code-behind
- [ ] T056 [P] [US1] Create TypeScript types in `frontend/src/types/finalization.ts` (FinalizationStatus, ValidationItem, FinalizationReport)
- [ ] T057 [US1] Create Finalization page component in `frontend/src/pages/Programming/Finalization.tsx`
- [ ] T058 [US1] Create CSS Module in `frontend/src/pages/Programming/Finalization.module.css`
- [ ] T059 [US1] Implement validation checklist (all critical data collected, no errors, all confirmations)
- [ ] T060 [US1] Implement data summary view (collected data by routine, company counts, interval coverage)
- [ ] T061 [US1] Implement warnings and blocking errors display (categorized, actionable messages)
- [ ] T062 [US1] Implement finalization confirmation dialog with impact preview
- [ ] T063 [US1] Implement report generation (PDF summary, Excel export, audit log)
- [ ] T064 [US1] Implement finalization history (previous finalizations, status, timestamps)
- [ ] T065 [US1] Create unit tests in `frontend/tests/pages/Finalization.test.tsx` (rendering, checklist, summary, validation, confirmation, reports)
- [ ] T066 [US1] Add route `/programacao/finalizacao` to `frontend/src/App.tsx`
- [ ] T067 [US1] Verify 100% test coverage
- [ ] T068 [US1] Validate finalization workflow matches legacy critical logic

**Checkpoint**: Finalização complete with 100% test coverage

#### T069-T082: Programação Diária (PDPProgDiaria.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T069 [P] [US1] Analyze legacy page in `legado/PDPProgDiaria.aspx` and business rules in `.vb` code-behind
- [ ] T070 [P] [US1] Create TypeScript types in `frontend/src/types/dailyProgramming.ts` (ProgrammingData, CalendarView, ExportOptions)
- [ ] T071 [US1] Create DailyProgramming page component in `frontend/src/pages/Reports/Programming/DailyProgramming.tsx`
- [ ] T072 [US1] Create CSS Module in `frontend/src/pages/Reports/Programming/DailyProgramming.module.css`
- [ ] T073 [US1] Implement calendar view (monthly, weekly, daily navigation)
- [ ] T074 [US1] Implement programming data grid (consolidated data by subsystem, 48 intervals)
- [ ] T075 [US1] Implement subsystem filter (Norte, Nordeste, Sudeste/Centro-Oeste, Sul)
- [ ] T076 [US1] Implement export functionality (Excel with formatting, PDF with charts, CSV raw data)
- [ ] T077 [US1] Implement comparison view (planned vs actual, differences highlighted)
- [ ] T078 [US1] Implement status indicators (finalized, preliminary, in progress, not started)
- [ ] T079 [US1] Create unit tests in `frontend/tests/pages/DailyProgramming.test.tsx` (rendering, calendar, grid, filters, export, comparison)
- [ ] T080 [US1] Add route `/relatorios/programacao/diaria` to `frontend/src/App.tsx`
- [ ] T081 [US1] Verify 100% test coverage
- [ ] T082 [US1] Validate programming visualization matches legacy

**Checkpoint**: Programação Diária complete with 100% test coverage

---

### 📄 Routine 4: Recebimento de Insumos Regulatórios (0/4 pages - already migrated, listed for reference)

**Status**: ✅ ALL 4 PAGES MIGRATED (IR1, IR2, IR3, IR4) - Backend connection pending (Phase 4)

---

### 🏭 Routine 5: Oferta de Exportação (0/1 page - already migrated, listed for reference)

**Status**: ✅ PAGE MIGRATED (frmColOfertaExportacao.aspx) - Backend connection pending (Phase 4)

---

### 💡 Routine 6: Oferta RVD (1/1 page pending)

#### T083-T095: Oferta RVD (frmColOfertaRVD.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T083 [P] [US1] Analyze legacy page in `legado/frmColOfertaRVD.aspx` and business rules in `.vb` code-behind
- [ ] T084 [P] [US1] Create TypeScript types in `frontend/src/types/voluntaryDemandResponse.ts` (RVDOffer, RVDForm, RVDInterval)
- [ ] T085 [US1] Create VoluntaryDemandResponse page component in `frontend/src/pages/Collection/Demand/VoluntaryDemandResponse.tsx`
- [ ] T086 [US1] Create CSS Module in `frontend/src/pages/Collection/Demand/VoluntaryDemandResponse.module.css`
- [ ] T087 [US1] Implement cascading filters (Data PDP → Empresa → Agente)
- [ ] T088 [US1] Implement 48-interval grid for RVD offers
- [ ] T089 [US1] Implement offer validation (price ranges, capacity limits, interval consistency)
- [ ] T090 [US1] Implement textarea overlay for bulk offer entry
- [ ] T091 [US1] Implement total and average calculations for offers
- [ ] T092 [US1] Create unit tests in `frontend/tests/pages/VoluntaryDemandResponse.test.tsx` (rendering, filters, grid, validation, calculations, textarea)
- [ ] T093 [US1] Add route `/coleta/demanda/rvd` to `frontend/src/App.tsx`
- [ ] T094 [US1] Verify 100% test coverage
- [ ] T095 [US1] Validate RVD offer workflow matches legacy

**Checkpoint**: Oferta RVD complete with 100% test coverage

---

### 💧 Routine 7: Energia Vertida Turbinável (1/1 page pending)

#### T096-T108: Energia Vertida (frmColEnergiaVertida.aspx) 🔴 CRITICAL

**Status**: ❌ NOT MIGRATED

- [ ] T096 [P] [US1] Analyze legacy page in `legado/frmColEnergiaVertida.aspx` and business rules in `.vb` code-behind
- [ ] T097 [P] [US1] Create TypeScript types in `frontend/src/types/spilledEnergy.ts` (SpilledEnergyData, SpilledEnergyForm, SpilledEnergyInterval)
- [ ] T098 [US1] Create SpilledEnergy page component in `frontend/src/pages/Collection/Hydraulic/SpilledEnergy.tsx`
- [ ] T099 [US1] Create CSS Module in `frontend/src/pages/Collection/Hydraulic/SpilledEnergy.module.css`
- [ ] T100 [US1] Implement cascading filters (Data PDP → Empresa → Usina Hidrelétrica)
- [ ] T101 [US1] Implement 48-interval grid for spilled energy
- [ ] T102 [US1] Implement turbineable energy calculations (efficiency factors, turbine capacity)
- [ ] T103 [US1] Implement validation (physical limits, turbine capacity, interval consistency)
- [ ] T104 [US1] Implement textarea overlay for bulk data entry
- [ ] T105 [US1] Create unit tests in `frontend/tests/pages/SpilledEnergy.test.tsx` (rendering, filters, grid, calculations, validation, textarea)
- [ ] T106 [US1] Add route `/coleta/hidraulica/energia-vertida` to `frontend/src/App.tsx`
- [ ] T107 [US1] Verify 100% test coverage
- [ ] T108 [US1] Validate spilled energy workflow matches legacy

**Checkpoint**: ✅ User Story 1 COMPLETE - All 7 critical routine pages migrated with 100% test coverage

---

## Phase 4: User Story 2 - Backend Integration for Migrated Pages (Priority: P1) 🔴 MAXIMUM

**Goal**: Connect all 14 migrated critical routine pages (7 existing + 7 from Phase 3) to real backend APIs to enable production use with actual database data.

**Independent Test**: For each page, verify: (1) API endpoints respond with real database data, (2) data validation matches legacy system rules, (3) save operations persist to database, (4) error handling displays appropriate messages, (5) loading states display correctly.

**Status**: 0/14 pages backend-connected, all using mock data

---

### 🎯 Routine 1: Programação Energética, Elétrica, Eólica (3 pages)

#### T109-T118: Razão Energética Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T109 [P] [US2] Analyze business rules in `legado/frmColEnergetica.aspx.vb` (validation logic, calculation formulas)
- [ ] T110 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend (GET, POST, PUT for energetic data)
- [ ] T111 [US2] Create service layer in `frontend/src/services/energeticService.ts` (API client functions, DTO transformations, error normalization)
- [ ] T112 [US2] Implement React Query hooks in `frontend/src/hooks/useEnergeticData.ts` (useEnergeticData for queries, useSaveEnergetic for mutations)
- [ ] T113 [US2] Connect Energetic.tsx component to React Query hooks (replace mock data with real API calls)
- [ ] T114 [US2] Validate calculations match legacy system (totals, averages, aggregations)
- [ ] T115 [US2] Test textarea overlay bulk edit functionality with real data
- [ ] T116 [US2] Update unit tests in `frontend/tests/pages/Energetic.test.tsx` to use MSW mocking for API
- [ ] T117 [US2] Create integration tests in `frontend/tests/integration/energetic-api.test.tsx` (full CRUD flow with real API)
- [ ] T118 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Razão Energética fully integrated with backend

#### T119-T128: Razão Elétrica Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T119 [P] [US2] Analyze business rules in `legado/frmColEletrica.aspx.vb`
- [ ] T120 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T121 [US2] Create service layer in `frontend/src/services/electricalService.ts`
- [ ] T122 [US2] Implement React Query hooks in `frontend/src/hooks/useElectricalData.ts`
- [ ] T123 [US2] Connect Electrical.tsx component to React Query hooks
- [ ] T124 [US2] Validate calculations match legacy system
- [ ] T125 [US2] Test edit by unit vs all units functionality with real data
- [ ] T126 [US2] Update unit tests to use MSW mocking
- [ ] T127 [US2] Create integration tests in `frontend/tests/integration/electrical-api.test.tsx`
- [ ] T128 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Razão Elétrica fully integrated with backend

#### T129-T138: Previsão Eólica Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T129 [P] [US2] Analyze business rules in `legado/frmColPrevisaoEolica.aspx.vb`
- [ ] T130 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T131 [US2] Create service layer in `frontend/src/services/windForecastService.ts`
- [ ] T132 [US2] Implement React Query hooks in `frontend/src/hooks/useWindForecastData.ts`
- [ ] T133 [US2] Connect WindForecast.tsx component to React Query hooks
- [ ] T134 [US2] Validate chart data matches legacy system
- [ ] T135 [US2] Test forecast calculations with real historical data
- [ ] T136 [US2] Update unit tests to use MSW mocking
- [ ] T137 [US2] Create integration tests in `frontend/tests/integration/wind-forecast-api.test.tsx`
- [ ] T138 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Previsão Eólica fully integrated with backend

---

### 🗂️ Routine 2: Geração de Arquivos (2 pages)

#### T139-T148: Gerenciamento de Arquivos Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T139 [P] [US2] Analyze business rules in `legado/frmGerArquivo.aspx.vb`
- [ ] T140 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend (file listing, view, download, delete)
- [ ] T141 [US2] Create service layer in `frontend/src/services/fileManagementService.ts`
- [ ] T142 [US2] Implement React Query hooks in `frontend/src/hooks/useFileData.ts`
- [ ] T143 [US2] Connect FileManagement.tsx component to React Query hooks
- [ ] T144 [US2] Test file operations with real backend (view, download, delete)
- [ ] T145 [US2] Validate file validation logic matches legacy
- [ ] T146 [US2] Update unit tests to use MSW mocking
- [ ] T147 [US2] Create integration tests in `frontend/tests/integration/file-management-api.test.tsx`
- [ ] T148 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Gerenciamento de Arquivos fully integrated with backend

#### T149-T158: Geração de Modelos Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T149 [P] [US2] Analyze business rules in `legado/frmGerModelos.aspx.vb`
- [ ] T150 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend (model configuration, generation trigger, progress polling)
- [ ] T151 [US2] Create service layer in `frontend/src/services/modelGenerationService.ts`
- [ ] T152 [US2] Implement React Query hooks in `frontend/src/hooks/useModelGeneration.ts` (useGenerateModel mutation with polling)
- [ ] T153 [US2] Connect ModelGeneration.tsx component to React Query hooks
- [ ] T154 [US2] Test model generation flow with real backend (DESSEM, DECOMP)
- [ ] T155 [US2] Validate generation parameters match legacy system
- [ ] T156 [US2] Update unit tests to use MSW mocking
- [ ] T157 [US2] Create integration tests in `frontend/tests/integration/model-generation-api.test.tsx`
- [ ] T158 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Geração de Modelos fully integrated with backend

---

### 📋 Routine 3: Finalização (2 pages)

#### T159-T168: Finalização Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T159 [P] [US2] Analyze business rules in `legado/frmFinalizacao.aspx.vb`
- [ ] T160 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend (validation check, finalization trigger, report generation)
- [ ] T161 [US2] Create service layer in `frontend/src/services/finalizationService.ts`
- [ ] T162 [US2] Implement React Query hooks in `frontend/src/hooks/useFinalization.ts`
- [ ] T163 [US2] Connect Finalization.tsx component to React Query hooks
- [ ] T164 [US2] Test validation checklist with real database data
- [ ] T165 [US2] Validate finalization logic matches legacy critical workflow
- [ ] T166 [US2] Update unit tests to use MSW mocking
- [ ] T167 [US2] Create integration tests in `frontend/tests/integration/finalization-api.test.tsx`
- [ ] T168 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Finalização fully integrated with backend

#### T169-T178: Programação Diária Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T169 [P] [US2] Analyze business rules in `legado/PDPProgDiaria.aspx.vb`
- [ ] T170 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend (programming data query, export, comparison data)
- [ ] T171 [US2] Create service layer in `frontend/src/services/dailyProgrammingService.ts`
- [ ] T172 [US2] Implement React Query hooks in `frontend/src/hooks/useDailyProgramming.ts`
- [ ] T173 [US2] Connect DailyProgramming.tsx component to React Query hooks
- [ ] T174 [US2] Test calendar view with real programming data
- [ ] T175 [US2] Validate export functionality (Excel, PDF, CSV) with real data
- [ ] T176 [US2] Update unit tests to use MSW mocking
- [ ] T177 [US2] Create integration tests in `frontend/tests/integration/daily-programming-api.test.tsx`
- [ ] T178 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Programação Diária fully integrated with backend

---

### 📄 Routine 4: Insumos Regulatórios (4 pages)

#### T179-T188: IR1 Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T179 [P] [US2] Analyze business rules in `legado/frmColIR1.aspx.vb`
- [ ] T180 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T181 [US2] Create service layer in `frontend/src/services/ir1Service.ts`
- [ ] T182 [US2] Implement React Query hooks in `frontend/src/hooks/useIR1Data.ts`
- [ ] T183 [US2] Connect IR1.tsx component to React Query hooks
- [ ] T184 [US2] Validate agent data reception workflow
- [ ] T185 [US2] Update unit tests to use MSW mocking
- [ ] T186 [US2] Create integration tests in `frontend/tests/integration/ir1-api.test.tsx`
- [ ] T187 [US2] Verify 100% test coverage with backend integration
- [ ] T188 [US2] Test with real agent submission data

**Checkpoint**: IR1 fully integrated with backend

#### T189-T198: IR2 Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T189 [P] [US2] Analyze business rules in `legado/frmColIR2.aspx.vb`
- [ ] T190 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T191 [US2] Create service layer in `frontend/src/services/ir2Service.ts`
- [ ] T192 [US2] Implement React Query hooks in `frontend/src/hooks/useIR2Data.ts`
- [ ] T193 [US2] Connect IR2.tsx component to React Query hooks
- [ ] T194 [US2] Validate 24 hourly intervals data structure
- [ ] T195 [US2] Update unit tests to use MSW mocking
- [ ] T196 [US2] Create integration tests in `frontend/tests/integration/ir2-api.test.tsx`
- [ ] T197 [US2] Verify 100% test coverage with backend integration
- [ ] T198 [US2] Test with D-1 data scenarios

**Checkpoint**: IR2 fully integrated with backend

#### T199-T208: IR3 Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T199 [P] [US2] Analyze business rules in `legado/frmColIR3.aspx.vb`
- [ ] T200 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T201 [US2] Create service layer in `frontend/src/services/ir3Service.ts`
- [ ] T202 [US2] Implement React Query hooks in `frontend/src/hooks/useIR3Data.ts`
- [ ] T203 [US2] Connect IR3.tsx component to React Query hooks
- [ ] T204 [US2] Validate 24 hourly intervals data structure
- [ ] T205 [US2] Update unit tests to use MSW mocking
- [ ] T206 [US2] Create integration tests in `frontend/tests/integration/ir3-api.test.tsx`
- [ ] T207 [US2] Verify 100% test coverage with backend integration
- [ ] T208 [US2] Test with D-2 data scenarios

**Checkpoint**: IR3 fully integrated with backend

#### T209-T218: IR4 Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T209 [P] [US2] Analyze business rules in `legado/frmColIR4.aspx.vb`
- [ ] T210 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T211 [US2] Create service layer in `frontend/src/services/ir4Service.ts`
- [ ] T212 [US2] Implement React Query hooks in `frontend/src/hooks/useIR4Data.ts`
- [ ] T213 [US2] Connect IR4.tsx component to React Query hooks
- [ ] T214 [US2] Validate 24 hourly intervals for ANDE load
- [ ] T215 [US2] Update unit tests to use MSW mocking
- [ ] T216 [US2] Create integration tests in `frontend/tests/integration/ir4-api.test.tsx`
- [ ] T217 [US2] Verify 100% test coverage with backend integration
- [ ] T218 [US2] Test with real ANDE load data

**Checkpoint**: IR4 fully integrated with backend

---

### 🏭 Routine 5: Oferta de Exportação (1 page)

#### T219-T228: Oferta de Exportação Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T219 [P] [US2] Analyze business rules in `legado/frmColOfertaExportacao.aspx.vb`
- [ ] T220 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T221 [US2] Create service layer in `frontend/src/services/exportOfferService.ts`
- [ ] T222 [US2] Implement React Query hooks in `frontend/src/hooks/useExportOfferData.ts`
- [ ] T223 [US2] Connect ExportOffer.tsx component to React Query hooks
- [ ] T224 [US2] Validate agent export offer workflow
- [ ] T225 [US2] Test edit by unit vs all units with real data
- [ ] T226 [US2] Update unit tests to use MSW mocking
- [ ] T227 [US2] Create integration tests in `frontend/tests/integration/export-offer-api.test.tsx`
- [ ] T228 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Oferta de Exportação fully integrated with backend

---

### 💡 Routine 6: Oferta RVD (1 page)

#### T229-T238: Oferta RVD Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T229 [P] [US2] Analyze business rules in `legado/frmColOfertaRVD.aspx.vb`
- [ ] T230 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T231 [US2] Create service layer in `frontend/src/services/voluntaryDemandResponseService.ts`
- [ ] T232 [US2] Implement React Query hooks in `frontend/src/hooks/useRVDData.ts`
- [ ] T233 [US2] Connect VoluntaryDemandResponse.tsx component to React Query hooks
- [ ] T234 [US2] Validate RVD offer submission workflow with real data
- [ ] T235 [US2] Test offer validation logic matches legacy
- [ ] T236 [US2] Update unit tests to use MSW mocking
- [ ] T237 [US2] Create integration tests in `frontend/tests/integration/rvd-api.test.tsx`
- [ ] T238 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: Oferta RVD fully integrated with backend

---

### 💧 Routine 7: Energia Vertida Turbinável (1 page)

#### T239-T248: Energia Vertida Backend Integration

**Status**: ⏳ FRONTEND MIGRATED IN PHASE 3 | ⏳ BACKEND PENDING

- [ ] T239 [P] [US2] Analyze business rules in `legado/frmColEnergiaVertida.aspx.vb`
- [ ] T240 [P] [US2] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T241 [US2] Create service layer in `frontend/src/services/spilledEnergyService.ts`
- [ ] T242 [US2] Implement React Query hooks in `frontend/src/hooks/useSpilledEnergyData.ts`
- [ ] T243 [US2] Connect SpilledEnergy.tsx component to React Query hooks
- [ ] T244 [US2] Validate turbineable energy calculations with real data
- [ ] T245 [US2] Test physical limits validation logic
- [ ] T246 [US2] Update unit tests to use MSW mocking
- [ ] T247 [US2] Create integration tests in `frontend/tests/integration/spilled-energy-api.test.tsx`
- [ ] T248 [US2] Verify 100% test coverage with backend integration

**Checkpoint**: ✅ User Story 2 COMPLETE - All 14 critical routine pages fully integrated with backend

---

## Phase 5: User Story 3 - Data Collection Module Completion (Priority: P2) 🟡 HIGH

**Goal**: Migrate remaining 27 pages in Data Collection module that are already partially complete (37/38 pages migrated per PLANO_MIGRACAO.md) and connect all to backend.

**Independent Test**: Each page renders, performs CRUD operations via backend APIs, validates data, and maintains 100% test coverage.

**Status**: 37/38 pages migrated (97.4%), 1 page pending, 0 pages backend-connected

---

### 💧 Hydraulic Data Collection (Backend Integration for 3 migrated pages)

#### T249-T257: Vazão Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T249 [P] [US3] Analyze business rules in `legado/frmColVazao.aspx.vb`
- [ ] T250 [P] [US3] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T251 [US3] Create service layer in `frontend/src/services/flowService.ts`
- [ ] T252 [US3] Implement React Query hooks in `frontend/src/hooks/useFlowData.ts`
- [ ] T253 [US3] Connect Flow.tsx component to React Query hooks
- [ ] T254 [US3] Validate flow data calculations match legacy
- [ ] T255 [US3] Update unit tests to use MSW mocking
- [ ] T256 [US3] Create integration tests in `frontend/tests/integration/flow-api.test.tsx`
- [ ] T257 [US3] Verify 100% test coverage with backend integration

#### T258-T266: Disponibilidade Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T258 [P] [US3] Analyze business rules in `legado/frmColDisponibilidade.aspx.vb`
- [ ] T259 [P] [US3] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T260 [US3] Create service layer in `frontend/src/services/availabilityService.ts`
- [ ] T261 [US3] Implement React Query hooks in `frontend/src/hooks/useAvailabilityData.ts`
- [ ] T262 [US3] Connect Availability.tsx component to React Query hooks
- [ ] T263 [US3] Test multi-step form with real data
- [ ] T264 [US3] Update unit tests to use MSW mocking
- [ ] T265 [US3] Create integration tests in `frontend/tests/integration/availability-api.test.tsx`
- [ ] T266 [US3] Verify 100% test coverage with backend integration

#### T267-T275: Balanço Hídrico Backend Integration

**Status**: ✅ MIGRATED | ⏳ BACKEND PENDING

- [ ] T267 [P] [US3] Analyze business rules in `legado/frmColBalanco.aspx.vb`
- [ ] T268 [P] [US3] Identify API endpoints in ONS_PoC-PDPW_V2 backend
- [ ] T269 [US3] Create service layer in `frontend/src/services/balanceService.ts`
- [ ] T270 [US3] Implement React Query hooks in `frontend/src/hooks/useBalanceData.ts`
- [ ] T271 [US3] Connect Balance.tsx component to React Query hooks
- [ ] T272 [US3] Validate hydraulic balance calculations
- [ ] T273 [US3] Update unit tests to use MSW mocking
- [ ] T274 [US3] Create integration tests in `frontend/tests/integration/balance-api.test.tsx`
- [ ] T275 [US3] Verify 100% test coverage with backend integration

**Checkpoint**: Hydraulic data collection pages fully backend-integrated

---

### 🔥 Thermal Data Collection (Backend Integration for 7 migrated pages)

#### T276-T320: Backend Integration for Thermal Pages

**Pages**: Generation, Inflexibility, OperatingMode, InflexibilityDispatch, Export, RRO, FuelShortageRestriction

**Pattern for each page** (45 tasks total, 5 pages × 9 tasks each):
- Analyze legacy business rules
- Identify API endpoints
- Create service layer
- Implement React Query hooks
- Connect component to hooks
- Validate calculations/workflow
- Update unit tests with MSW
- Create integration tests
- Verify 100% test coverage

*(Detailed task breakdown available on request to avoid excessive length)*

**Checkpoint**: Thermal data collection pages fully backend-integrated

---

### 🔌 Interchange Data Collection (Backend Integration for 3 migrated pages)

#### T321-T347: Backend Integration for Interchange Pages

**Pages**: Interchange, Import, Export

**Pattern**: Same 9-task pattern as thermal pages (27 tasks total, 3 pages × 9 tasks)

**Checkpoint**: Interchange data collection pages fully backend-integrated

---

### 📊 Load Data Collection (Backend Integration for 3 migrated pages)

#### T348-T374: Backend Integration for Load Pages

**Pages**: EstimatedLoad, EstimatedGeneration, EstimatedInterchange

**Pattern**: Same 9-task pattern (27 tasks total, 3 pages × 9 tasks)

**Checkpoint**: Load data collection pages fully backend-integrated

---

### 📝 Other Data Collection (Backend Integration for 21 migrated pages)

#### T375-T563: Backend Integration for Other Collection Pages

**Pages** (21 total): DCA, DCR, REDispatch, Compensation, OutOfMeritCRE, OutOfMeritGeneration, ReplacementEnergy, WeeklyDispatch, and 13 other pages from CHECKLIST_MIGRACAO.md

**Pattern**: Same 9-task pattern (189 tasks total, 21 pages × 9 tasks)

**Checkpoint**: ✅ User Story 3 COMPLETE - All data collection pages migrated and backend-integrated

---

## Phase 6: User Story 4 - Consultation Pages (Priority: P3) 🟠 MEDIUM

**Goal**: Migrate 46 remaining consultation pages (2/48 migrated per PLANO_MIGRACAO.md) to provide query functionality for all collected data.

**Independent Test**: Each consultation page displays filtered data from backend, supports export (Excel/PDF/CSV), and maintains performance (<2s query time).

**Status**: 2/48 pages migrated (4.2%), 46 pages pending

---

### Query Pages Migration Pattern (46 pages)

**Standard pattern for each query page** (10 tasks per page):

1. Analyze legacy query page
2. Create TypeScript types for query filters and results
3. Create React component with filters panel
4. Implement data grid with pagination
5. Implement export functionality (Excel, PDF, CSV)
6. Create service layer for query API
7. Implement React Query hooks
8. Connect component to hooks
9. Create unit tests (filters, grid, export, pagination)
10. Verify 100% test coverage

**Query Pages Categories** (46 pages total):
- **Hydraulic Queries**: 3 pages (Availability, Balance, Flow) - 30 tasks
- **Thermal Queries**: 4 pages (Generation, Inflexibility, OperatingMode, Dispatch) - 40 tasks
- **Electrical Queries**: 2 pages (Electrical, Energy) - 20 tasks
- **Interchange Queries**: 3 pages (Interchange, Import, Export) - 30 tasks
- **Load Queries**: 2 pages (Load, Consumption) - 20 tasks
- **Other Queries**: 32 pages (restrictions, maintenance, offers, etc.) - 320 tasks

**Total Tasks for User Story 4**: T564-T1023 (460 tasks)

*(Detailed breakdown available on request - using pattern above for brevity)*

**Checkpoint**: ✅ User Story 4 COMPLETE - All consultation pages migrated with query, export, and filtering capabilities

---

## Phase 7: User Story 5 - Administration & Reports (Priority: P4) 🔵 LOWER

**Goal**: Migrate remaining 20 pages for administration (12 pages) and reports (8 pages) to complete the full system migration.

**Independent Test**: Administration pages perform user management, configuration, and system admin tasks. Report pages generate formatted outputs (Excel, PDF) with charts and aggregations.

**Status**: 5/12 admin pages migrated (41.7%), 0/8 report pages migrated (0%)

---

### Administration Pages (7 pages pending)

#### T1024-T1093: Administration Pages Migration

**Pages** (7 pending): User management, role management, company configuration, system parameters, audit logs, data dictionary, system health

**Pattern**: 10 tasks per page (analyze, create types, create component, implement CRUD, create service, implement hooks, connect to backend, create tests, verify coverage, validate workflow)

**Total Tasks**: 70 tasks (7 pages × 10 tasks)

**Checkpoint**: Administration module complete

---

### Report Pages (8 pages pending)

#### T1094-T1173: Report Pages Migration

**Pages** (8 total): Daily programming report, consolidated report, agent report, validation report, exception report, comparison report, historical report, executive summary

**Pattern**: 10 tasks per page (analyze, create types, create component, implement report generation, implement charts, create export functions, create service, implement hooks, create tests, verify coverage)

**Total Tasks**: 80 tasks (8 pages × 10 tasks)

**Checkpoint**: ✅ User Story 5 COMPLETE - All administration and report pages migrated

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories

- [ ] T1174 [P] Accessibility audit with axe-core on all pages - fix violations
- [ ] T1175 [P] Performance optimization (React.memo, useMemo, code splitting)
- [ ] T1176 [P] Responsive design validation on all breakpoints (mobile/tablet/desktop)
- [ ] T1177 [P] Visual parity validation with legacy system (screenshots comparison)
- [ ] T1178 Create comprehensive documentation in `docs/` (user guide, developer guide, API reference)
- [ ] T1179 Security audit (XSS prevention, CSRF protection, input sanitization)
- [ ] T1180 [P] Final E2E test suite with Playwright (critical user journeys)
- [ ] T1181 Performance benchmarking (load time, grid response time, concurrent users)
- [ ] T1182 [P] Code cleanup and refactoring (remove dead code, consolidate duplicates)
- [ ] T1183 Final code review (pair programming session, architecture validation)
- [ ] T1184 Production deployment preparation (environment variables, build optimization)
- [ ] T1185 [P] Training materials creation (videos, quick reference guides)
- [ ] T1186 Run complete validation per quickstart.md
- [ ] T1187 Final acceptance testing with ONS operators

**Checkpoint**: ✅ PDPw Frontend Migration COMPLETE - Ready for production deployment

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: ✅ COMPLETE
- **Foundational (Phase 2)**: ✅ COMPLETE - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - Can start immediately
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion (needs migrated pages to integrate)
- **User Story 3 (Phase 5)**: Can start after Foundational - Parallel with US1/US2
- **User Story 4 (Phase 6)**: Can start after Foundational - Parallel with US1/US2/US3
- **User Story 5 (Phase 7)**: Can start after Foundational - Parallel with other stories
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

**Critical Path (Must Complete First)**:
- **User Story 1 (P1)**: 7 critical routine pages → BLOCKS → User Story 2
- **User Story 2 (P1)**: Backend integration for 14 pages → Enables production use

**Parallel Opportunities**:
- After Foundational phase: US3, US4, US5 can proceed in parallel with US1
- US3 (data collection) can proceed independently (many pages already migrated)
- US4 (consultation) can proceed as query endpoints become available
- US5 (admin/reports) can proceed independently

### Recommended Execution Strategy

**MVP Approach (Fastest Time to Value)**:
1. ✅ Setup + Foundational (Complete)
2. Phase 3: User Story 1 (7 pages, ~3-4 weeks)
3. Phase 4: User Story 2 (14 backend integrations, ~3-4 weeks)
4. **STOP**: Deploy critical routines MVP, validate with operators
5. Proceed with US3, US4, US5 based on operator feedback

**Parallel Team Approach (If 3+ Developers)**:
1. ✅ Setup + Foundational (Complete)
2. Developer A: User Story 1 (critical routines)
3. Developer B: User Story 3 (data collection backend integration)
4. Developer C: User Story 4 (consultation pages)
5. Converge on User Story 2 (critical backend integration - highest priority)

**Incremental Delivery Milestones**:
- **Milestone 1**: US1 + US2 complete (critical routines functional) - 7-9 weeks
- **Milestone 2**: US3 complete (full data collection) - +4-6 weeks
- **Milestone 3**: US4 complete (all consultation) - +8-10 weeks
- **Milestone 4**: US5 complete (admin/reports) - +3-4 weeks
- **Total**: 22-29 weeks for complete migration

---

## Parallel Execution Examples

### User Story 1 (Critical Routines) - Phase 3

**Parallel Batch 1 - Legacy Analysis** (can run together):
```bash
Task T015: Analyze frmColPrevisaoEolica.aspx
Task T028: Analyze frmGerArquivo.aspx
Task T041: Analyze frmGerModelos.aspx
Task T055: Analyze frmFinalizacao.aspx
Task T069: Analyze PDPProgDiaria.aspx
Task T083: Analyze frmColOfertaRVD.aspx
Task T096: Analyze frmColEnergiaVertida.aspx
```

**Parallel Batch 2 - TypeScript Types** (can run together):
```bash
Task T016: Create windForecast.ts
Task T029: Create fileManagement.ts
Task T042: Create modelGeneration.ts
Task T056: Create finalization.ts
Task T070: Create dailyProgramming.ts
Task T084: Create voluntaryDemandResponse.ts
Task T097: Create spilledEnergy.ts
```

**Parallel Batch 3 - Component Creation** (can run together after types):
```bash
Task T017: Create WindForecast.tsx
Task T030: Create FileManagement.tsx
Task T043: Create ModelGeneration.tsx
Task T057: Create Finalization.tsx
Task T071: Create DailyProgramming.tsx
Task T085: Create VoluntaryDemandResponse.tsx
Task T098: Create SpilledEnergy.tsx
```

### User Story 2 (Backend Integration) - Phase 4

**Parallel Batch 1 - Service Layer** (can run together):
```bash
Task T111: Create energeticService.ts
Task T121: Create electricalService.ts
Task T131: Create windForecastService.ts
Task T141: Create fileManagementService.ts
Task T151: Create modelGenerationService.ts
```

**Parallel Batch 2 - React Query Hooks** (can run together after services):
```bash
Task T112: Create useEnergeticData.ts
Task T122: Create useElectricalData.ts
Task T132: Create useWindForecastData.ts
Task T142: Create useFileData.ts
Task T152: Create useModelGeneration.ts
```

**Parallel Batch 3 - Integration Tests** (can run together after integration):
```bash
Task T117: Create energetic-api.test.tsx
Task T127: Create electrical-api.test.tsx
Task T137: Create wind-forecast-api.test.tsx
Task T147: Create file-management-api.test.tsx
Task T157: Create model-generation-api.test.tsx
```

---

## Implementation Metrics

### Progress Tracking

**Current Status** (from CHECKLIST_MIGRACAO.md):
- Total Pages: 142
- Migrated (Frontend Only): 34 (23.9%)
- Backend Connected: 0 (0%)
- Tests Created: 350+
- Tests Passing: 350+ (100%)

**Phase 3 Deliverables** (User Story 1):
- Pages to Migrate: 7
- Tasks: T015-T108 (94 tasks)
- Estimated Duration: 3-4 weeks (1 developer) or 1-2 weeks (3 developers parallel)
- Expected Test Count: +200 tests
- Expected Coverage: 100% per Constitution Principle II

**Phase 4 Deliverables** (User Story 2):
- Pages to Integrate: 14
- Tasks: T109-T248 (140 tasks)
- Estimated Duration: 3-4 weeks (1 developer) or 2-3 weeks (2 developers parallel)
- Expected Test Count: +280 integration tests
- Expected Coverage: 100%

**Phase 5 Deliverables** (User Story 3):
- Pages to Integrate: 37
- Tasks: T249-T563 (315 tasks)
- Estimated Duration: 4-6 weeks (1 developer) or 2-3 weeks (3 developers parallel)
- Expected Test Count: +370 integration tests

**Phase 6 Deliverables** (User Story 4):
- Pages to Migrate: 46
- Tasks: T564-T1023 (460 tasks)
- Estimated Duration: 8-10 weeks (1 developer) or 4-5 weeks (2 developers parallel)
- Expected Test Count: +920 tests

**Phase 7 Deliverables** (User Story 5):
- Pages to Migrate: 15
- Tasks: T1024-T1173 (150 tasks)
- Estimated Duration: 3-4 weeks (1 developer) or 2 weeks (2 developers parallel)
- Expected Test Count: +300 tests

**Phase 8 Deliverables** (Polish):
- Cross-cutting improvements: 14 tasks
- Estimated Duration: 1-2 weeks
- Expected Final Test Count: 2,000+ tests (100% coverage)

**Total Project**:
- Total Tasks: 1,187 tasks
- Total Estimated Duration: 22-29 weeks (sequential) or 12-16 weeks (parallel with 3 developers)
- Total Expected Tests: 2,000+ tests
- Total Expected Coverage: 100% (non-negotiable per Constitution)

---

## Notes

- **[P] marker**: Tasks marked [P] use different files and have no dependencies - can run in true parallel
- **[Story] label**: Maps each task to its user story (US1-US5) for traceability and independent delivery
- **Test Coverage**: 100% coverage is mandatory per Constitution Principle II - every task that creates code MUST include tests
- **Visual Parity**: All pages must match legacy WebForms appearance per Constitution Principle III
- **Accessibility**: All pages must pass axe-core validation (WCAG 2.1 AA) per Constitution Principle IV
- **Domain Language**: All code must use Portuguese PDP domain terms per Constitution Principle I
- **Layered Architecture**: Components → Hooks → Services → Backend per Constitution Principle V and plan.md
- **Incremental Migration**: Small cycles (1-3 days), critical routines first per Constitution Principle VI
- **Backend Repository**: ONS_PoC-PDPW_V2 is separate repository - coordinate API changes with backend team
- **Legacy Reference**: Code in `legado/` folder is read-only reference - do not modify
- **Commit Frequency**: Commit after completing each task or logical group of related tasks
- **Branch Strategy**: Feature branches from `develop`, PR review required before merge to `develop`
- **Documentation**: Update CHECKLIST_MIGRACAO.md progress after completing each page
- **Validation**: Test each user story independently before proceeding to next (checkpoints)
- **Priority Order**: P1 (US1, US2) → P2 (US3) → P3 (US4) → P4 (US5) → Polish

---

## Quick Reference: Task Counts by Phase

| Phase | User Story | Priority | Pages | Tasks | Tests | Duration (1 dev) | Duration (3 devs) |
|-------|-----------|----------|-------|-------|-------|------------------|-------------------|
| 1 | Setup | - | 8 | ✅ Complete | ✅ 350+ | ✅ Done | ✅ Done |
| 2 | Foundational | - | 6 | ✅ Complete | ✅ Included | ✅ Done | ✅ Done |
| 3 | US1 - Critical Routines | P1 🔴 | 7 | 94 | ~200 | 3-4 weeks | 1-2 weeks |
| 4 | US2 - Backend Integration | P1 🔴 | 14 | 140 | ~280 | 3-4 weeks | 2-3 weeks |
| 5 | US3 - Data Collection | P2 🟡 | 37 | 315 | ~370 | 4-6 weeks | 2-3 weeks |
| 6 | US4 - Consultation | P3 🟠 | 46 | 460 | ~920 | 8-10 weeks | 4-5 weeks |
| 7 | US5 - Admin & Reports | P4 🔵 | 15 | 150 | ~300 | 3-4 weeks | 2 weeks |
| 8 | Polish | - | All | 14 | - | 1-2 weeks | 1 week |
| **TOTAL** | | | **142** | **1,187** | **~2,000** | **22-29 weeks** | **12-16 weeks** |

**MVP Path** (Fastest Time to Value): Phase 1 ✅ → Phase 2 ✅ → Phase 3 (US1) → Phase 4 (US2) → **Deploy Critical Routines** → Iterate based on operator feedback

**Recommended Next Steps**:
1. Begin Phase 3, Task T015 (Previsão Eólica migration)
2. Parallelize if multiple developers available (T015, T028, T041, T055, T069, T083, T096)
3. Maintain 100% test coverage as you progress
4. Update CHECKLIST_MIGRACAO.md after each page completion
5. Target completion of Phase 3 + Phase 4 (US1 + US2) for first production deployment milestone
