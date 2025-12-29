# 📋 Tabelas de Referência Rápida - Backend Integration

**Data**: 2025-12-28  
**Tipo**: Documento de referência rápida  
**Uso**: Quick lookup durante desenvolvimento

---

## 🎯 Resumo P1 - Rotinas Críticas (Sprint 1)

| # | Página | Status | Endpoints | Tasks | Hours | Dev |
|---|--------|--------|-----------|-------|-------|-----|
| 1 | Razão Energética | ✅ Migrada | `/api/dadosenergeticos` | 9 | 8h | Dev1 |
| 2 | Razão Elétrica | ✅ Migrada | `/api/dadoseletricos` | 9 | 8h | Dev2 |
| 3 | IR1 - Nível Partida | ✅ Migrada | `/api/ir1` | 9 | 6h | Dev2 |
| 4 | IR2 - Dia -1 | ✅ Migrada | `/api/ir2` | 9 | 6h | Dev3 |
| 5 | IR3 - Dia -2 | ✅ Migrada | `/api/ir3` | 9 | 6h | Dev3 |
| 6 | IR4 - Carga ANDE | ✅ Migrada | `/api/ir4` | 9 | 6h | Dev3 |
| 7 | Oferta Exportação | ✅ Migrada | `/api/ofertas-exportacao` | 9 | 7h | Dev1 |
| **TOTAL** | **7 páginas** | ✅ | - | **63 tasks** | **47h** | 3 devs |

---

## 🟡 Resumo P2 - Páginas Migradas (Sprint 2)

### Por Domínio

| # | Domínio | Páginas | Examples | Tasks | Hours | Dev |
|---|---------|---------|----------|-------|-------|-----|
| 1 | Hidráulicos | 4 | Vazão, Volume, Disponibilidade, Balanço | 12 | 10h | Dev1 |
| 2 | Térmicos | 7 | Geração, Inflexibilidade, Mod.Op., etc | 21 | 18h | Dev2 |
| 3 | Intercâmbio | 3 | Internacional, Nacional, Limites | 9 | 8h | Dev1 |
| 4 | Carga | 3 | Própria, Submercado, Previsão | 9 | 8h | Dev3 |
| 5 | Restrições & Manutenção | 6 | Restrição UG, Manutenção UG, etc | 18 | 15h | Dev2 |
| 6 | Outros Dados | 11 | Rampa, GEC, GES, SOM, DCA, etc | 33 | 28h | Dev3 |
| **TOTAL** | **6 domínios** | **34 páginas** | - | **102 tasks** | **87h** | 3 devs |

---

## 🔵 Resumo P3 - Páginas Pendentes (Sprint 3)

| # | Página | Status | Complexidade | Tasks | Hours | Notas |
|---|--------|--------|--------------|-------|-------|-------|
| 1 | Previsão Eólica | ❌ Não Migrada | Média | 18 | 12h | Grid + gráficos |
| 2 | Ger. Arquivos | ❌ Não Migrada | Alta | 18 | 14h | Upload/download |
| 3 | Ger. Modelos | ❌ Não Migrada | Alta | 18 | 16h | Integração modelos |
| 4 | Finalização | ❌ Não Migrada | Alta | 18 | 14h | Checklist complexa |
| 5 | Prog. Diária | ❌ Não Migrada | Alta | 18 | 14h | Calendário + export |
| 6 | Oferta RVD | ❌ Não Migrada | Média | 18 | 12h | Grid 48 intervalos |
| 7 | Energia Vertida | ❌ Não Migrada | Média | 18 | 12h | Cálculos especiais |
| **TOTAL** | **7 páginas** | ❌ | - | **126 tasks** | **94h** | 3 devs |

---

## 📊 Matriz de Responsabilidades - Sprint 1

### Developer 1 (Backend Lead)
```
T001-T009: Razão Energética         (8h)
T055-T063: Oferta Exportação        (7h)
─────────────────────────────────
TOTAL: 15h (2 routines, 18 tasks)

Prioridades:
1. T001: Análise API (3h)
2. T002-004: Serviço + Hooks (4h)
3. T005-008: Testes (5h)
4. T055-063: Oferta (7h)
```

### Developer 2 (Backend)
```
T010-T018: Razão Elétrica           (8h)
T019-T027: IR1 - Nível Partida      (6h)
─────────────────────────────────
TOTAL: 14h (2 routines, 18 tasks)

Prioridades:
1. T010-018: Elétrica (8h)
2. T019-027: IR1 (6h)
```

### Developer 3 (Backend)
```
T028-T036: IR2 - Dia -1             (6h)
T037-T045: IR3 - Dia -2             (6h)
T046-T054: IR4 - Carga ANDE         (6h)
─────────────────────────────────
TOTAL: 18h (3 routines, 27 tasks)

Nota: IR2, IR3, IR4 são similares → paralelizar
```

---

## 🔄 Template de Task - Resumo Rápido

Cada página segue este padrão:

| Task Type | ID | Nome | Hours | Output | Depends | Blocks |
|-----------|----|----|-------|--------|---------|--------|
| Analysis | T### | Analisar API | 2-3h | Spec documento | - | T### (Service) |
| Implementation | T### | Criar Service | 2-3h | `*Service.ts` | T### (Analysis) | T### (Hooks) |
| Implementation | T### | Criar Hooks | 1-2h | `use*.ts` | T### (Service) | T### (Component) |
| Implementation | T### | Conectar Component | 1-2h | Component atualizado | T### (Hooks) | T### (Tests) |
| Testing | T### | Testes Service | 2-3h | `.test.ts` file | T### (Service) | T### (Integration) |
| Testing | T### | Testes Hooks | 1-2h | `.test.ts` file | T### (Hooks) | T### (Integration) |
| Testing | T### | Testes Component | 1-2h | `.test.tsx` file | T### (Component) | T### (Integration) |
| Integration | T### | Testes Integração | 2-3h | `-flow.test.tsx` | T### (Tests) | T### (Checklist) |
| Documentation | T### | Atualizar Checklist | 0.5h | `CHECKLIST_MIGRACAO.md` | T### (All Tests) | - |

---

## 🎯 Matriz de API Endpoints

### Críticas (P1)

| Página | Method | Endpoint | Payload | Response | Status Codes |
|--------|--------|----------|---------|----------|--------------|
| Razão Energética | GET | `/api/dadosenergeticos` | - | Array<DadoEnergetico> | 200, 500 |
| | POST | `/api/dadosenergeticos/bulk` | { intervalos: [] } | Array<DadoEnergetico> | 201, 400, 500 |
| Razão Elétrica | GET | `/api/dadoseletricos` | - | Array<DadoEletrico> | 200, 500 |
| IR1-4 | GET | `/api/ir[1-4]` | - | Array<IRData> | 200, 500 |
| | POST | `/api/ir[1-4]` | { data: IRData } | IRData | 201, 400, 500 |
| Oferta Exportação | GET | `/api/ofertas-exportacao` | - | Array<OfertaExp> | 200, 500 |
| | POST | `/api/ofertas-exportacao` | { oferta: {} } | OfertaExp | 201, 400, 409, 500 |

### Referência (Comum)

| Recurso | Method | Endpoint | Response | Cache |
|---------|--------|----------|----------|-------|
| Empresas | GET | `/api/empresas` | Array<Empresa> | 1h |
| Plantas | GET | `/api/plantas` | Array<Planta> | 1h |
| Tipos | GET | `/api/tipos-planta` | Array<TipoPlanta> | 1h |

---

## 📊 Cronograma - Gantt Visual

```
Sprint 1 (Sem 1-2): Rotinas Críticas
├─ Semana 1
│  ├─ Seg: Dev1 (T001-009 start), Dev2 (T010-018 start), Dev3 (T019-027 start)
│  ├─ Ter-Thu: Dev1 Energética service/hooks, Dev2 Elétrica, Dev3 IR1
│  ├─ Fri: Code review, sprint review
│  └─ ✅ Razão Energética + Elétrica online
│
├─ Semana 2
│  ├─ Seg: Dev1 (T055-063 start), Dev2 (T028-036 start), Dev3 (IR2+IR3)
│  ├─ Tue-Thu: Oferta, IR2-3 implementation, IR4 start
│  ├─ Fri: Final code review + Demo
│  └─ ✅ MVP COMPLETO (7/7 = 100%)

Sprint 2 (Sem 3-5): Páginas Migradas
├─ Semana 3-5
│  ├─ Dev1: Hidráulicos (4 pgs)
│  ├─ Dev2: Térmicos (7 pgs) + Restrições (6 pgs)
│  ├─ Dev3: Carga (3 pgs) + Outros (11 pgs)
│  └─ ✅ 34/34 páginas online

Sprint 3 (Sem 6-8): Páginas Pendentes
├─ Semana 6: Migração (7 páginas)
├─ Semana 7-8: Backend connection (7 páginas)
└─ ✅ Sistema completo online
```

---

## 📈 Matriz de Testes

### Quantidade de Testes por Tipo

| Página | Service Tests | Hook Tests | Component Tests | Integration | TOTAL |
|--------|---------------|-----------|-----------------|-------------|-------|
| Razão Energética | 30 | 15 | 10 | 4 | 59 |
| Razão Elétrica | 30 | 15 | 10 | 4 | 59 |
| IR1-4 (cada) | 20 | 10 | 8 | 3 | 41 |
| Oferta Exportação | 25 | 12 | 10 | 4 | 51 |
| **Sprint 1 Total** | - | - | - | - | **~300 tests** |
| **Sprint 2 Total** (34 pgs) | - | - | - | - | **~800 tests** |
| **Sprint 3 Total** (7 pgs) | - | - | - | - | **~300 tests** |
| **GRAND TOTAL** | - | - | - | - | **~1400 tests** |

---

## 🏃 Checklist Diário - Developer

```
✅ ANTES DE INICIAR TASK
- [ ] Issue lido e entendido
- [ ] Critério de Aceitação claro
- [ ] Dependências verificadas (task anterior completa?)
- [ ] Ambiente compilando (npm install, npm run dev)
- [ ] Branch criada (feature/backend-[pagina])

✅ DURANTE TASK
- [ ] Código implementado conforme spec
- [ ] Error handling aplicado (normalizeError)
- [ ] DTO transformers aplicados (transformFromApi/ToApi)
- [ ] Tipos TypeScript definidos
- [ ] Testes unitários escritos
- [ ] Testes passando (npm test)
- [ ] 0 console.log, console.error, debugger
- [ ] Sem console errors/warnings

✅ ANTES DE PR
- [ ] npm test (todos testes passando)
- [ ] npm run lint (sem warnings)
- [ ] npm run build (compila sem erros)
- [ ] Documentação atualizada
- [ ] Commit message clara (feat(backend): T### [title])
- [ ] PR criada com issue linked
- [ ] CHECKLIST_MIGRACAO.md ainda não atualizado (fazer após merge)

✅ CÓDIGO REVIEW CHECKLIST
- [ ] Sem console.log/debugger
- [ ] Error handling presente
- [ ] DTO transformers presentes
- [ ] Tipos TypeScript corretos
- [ ] Testes >= 80% cobertura
- [ ] Sem warnings
- [ ] Segue padrão do projeto
- [ ] Comentários em código complexo

✅ DEPOIS DE MERGE
- [ ] Dar checkout em main
- [ ] npm install
- [ ] npm test (confirmar tests passam)
- [ ] Atualizar CHECKLIST_MIGRACAO.md
- [ ] PR delete branch remotamente
- [ ] Fechar issue (move to Done)
```

---

## 🔍 Troubleshooting Rápido

| Erro | Causa | Solução |
|------|-------|---------|
| `Cannot find module '...'` | Import errado | Verificar path relative corretamente |
| `TypeError: Cannot read property 'x' of undefined` | Response vazio | Verificar mock MSW endpoint |
| `Expected 48 intervals, got XX` | Edge case não testado | Adicionar validação em transformer |
| `Test timeout` | API call muito lenta | Aumentar timeout ou mockar |
| `400 Bad Request` | Payload incorreto | Verificar DTO transformation request |
| `404 Not Found` | Endpoint errado | Verificar URL em apiClient |
| `500 Server Error` | Bug no backend | Contatar backend team |
| `CORS error` | Backend não configured | Verificar CORS headers |

---

## 🎓 Links de Aprendizado

| Recurso | Link | Tempo |
|---------|------|-------|
| React Query Docs | https://tanstack.com/query/latest | 30 min |
| TypeScript Types | https://www.typescriptlang.org/docs | 15 min |
| MSW Docs | https://mswjs.io | 20 min |
| Vitest Docs | https://vitest.dev | 20 min |
| Error Handling Pattern | Ler `frontend/src/utils/errorHandling.ts` | 10 min |
| DTO Transformers | Ler `frontend/src/utils/dtoTransformers.ts` | 10 min |
| Service Pattern | Ler `frontend/src/services/energeticService.ts` | 15 min |
| Hook Pattern | Ler `frontend/src/hooks/useEnergeticData.ts` | 15 min |

---

## 💰 Estimativa de Custo (Equipe de 3 Devs)

| Sprint | Dev-Hours | Daily Rate | Total | Duration |
|--------|-----------|-----------|-------|----------|
| 1 (Críticas) | 47h | $400/h | $18,800 | 2 sem |
| 2 (Coleta) | 87h | $400/h | $34,800 | 3 sem |
| 3 (Pendentes) | 94h | $400/h | $37,600 | 3 sem |
| QA/Review | 50h | $300/h | $15,000 | Ongoing |
| **TOTAL** | **278h** | - | **$106,200** | **8-10 sem** |

**Nota**: Com 2 devs, aumentar 50%. Com 1 dev, aumentar 200%.

---

## ✅ Critério de "Done" por Tipo de Task

### Analysis Task (T###: Analisar)
```
✅ DONE se:
- Endpoints documentados (GET, POST, PUT, DELETE)
- Request/response examples coletados
- Códigos de erro identificados (400, 404, 500)
- Arquivo spec criado (contracts/[page].json)
- Tech Lead reviewou
```

### Implementation Task (T###: Criar Serviço/Hooks/Componente)
```
✅ DONE se:
- Arquivo criado com funções esperadas
- Error handling presente
- DTO transformers presente (se aplicável)
- TypeScript types corretos
- npm run build sem erros
- npm test verde
- npm run lint sem warnings
- Code review aprovado
```

### Testing Task (T###: Criar Testes)
```
✅ DONE se:
- Testes criados (mínimo X testes)
- npm test passando (verde)
- Coverage >= 80%
- Casos de sucesso testados
- Casos de erro testados
- Edge cases testados
- Code review aprovado
```

### Integration Task (T###: Testes Integração)
```
✅ DONE se:
- Teste flow completo (load → edit → save)
- Erro scenarios testados
- MSW endpoints mockados
- Todos os testes verde
- Code review aprovado
```

### Documentation Task (T###: Atualizar Checklist)
```
✅ DONE se:
- CHECKLIST_MIGRACAO.md atualizado
- Todos 36 pontos preenchidos
- Status marcado como PASS
- PR criada e mergeda
- Issue fechada
```

---

**Documento gerado**: 2025-12-28  
**Versão**: 1.0  
**Status**: ✅ Pronto para referência rápida durante sprint
