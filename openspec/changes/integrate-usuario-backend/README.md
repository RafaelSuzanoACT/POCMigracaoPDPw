# Proposta de Integração: Rota /admin/usuarios com Backend

**Change ID**: `integrate-usuario-backend`  
**Data**: 29 de dezembro de 2025  
**Status**: Proposta Completa (Pronto para Revisão)

## 📋 Resumo Executivo

Esta proposta estabelece uma integração **completa e production-ready** entre a rota frontend `/admin/usuarios` e o backend `http://localhost:5001/api/usuarios`.

### O Que Está Sendo Proposto

Transformar a página de Gerenciamento de Usuários de um componente React com dados mockados em uma aplicação totalmente conectada ao backend com:

✅ Chamadas HTTP reais (GET, POST, PUT, DELETE)  
✅ Tratamento robusto de erros HTTP (400, 401, 403, 404, 409, 500, 503)  
✅ Estado gerenciado por React Query (caching, invalidação, retry automático)  
✅ Atualizações otimistas (UI atualiza instantaneamente enquanto backend processa)  
✅ Rollback automático em caso de erro  
✅ Cobertura de testes 100%  
✅ Documentação completa

### Problema Que Resolve

Atualmente:
- ❌ A rota `/admin/usuarios` existe mas usa dados mock
- ❌ Nenhuma chamada real ao backend ocorre
- ❌ Não há tratamento de erros HTTP
- ❌ Sem cache, retry, ou otimização
- ❌ Sem testes de integração

Resultado desta proposta:
- ✅ Operadores ONS podem gerenciar usuários com dados reais
- ✅ Sistema resiliente a falhas de rede e backend
- ✅ UX melhorada (sem "spinners" graças ao caching)
- ✅ Código testado e manutenível

---

## 📁 Estrutura de Arquivos Criados

```
openspec/changes/integrate-usuario-backend/
├── proposal.md                           # Este documento executivo
├── design.md                             # Decisões arquiteturais detalhadas
├── tasks.md                              # 40 tarefas com estimativas (48h)
└── specs/
    ├── usuario-service-layer/
    │   └── spec.md                       # Requisitos da camada de serviço
    ├── usuario-state-management/
    │   └── spec.md                       # Requisitos dos hooks React Query
    └── usuario-error-handling/
        └── spec.md                       # Requisitos de tratamento de erros
```

### Documentos Principais

| Documento | Propósito | Audiência |
|-----------|-----------|-----------|
| **proposal.md** | Visão executiva, decisões-chave, cronograma | Stakeholders, Tech Lead, Product |
| **design.md** | Arquitetura detalhada, padrões, trade-offs | Arquiteto, Desenvolvedores senior |
| **tasks.md** | 40 tarefas pequenas + estimativas + testes | Desenvolvedores, QA |
| **specs/*.md** | Requisitos funcionais + cenários (Given-When-Then) | Todo time |

---

## 🎯 Objetivos da Proposta

| # | Objetivo | Success Criteria |
|---|----------|------------------|
| 1 | **Conectividade** | Todos CRUD (list, create, update, delete) chamam backend real |
| 2 | **Resiliência** | HTTP 400/401/403/404/409/500/503 tratados com mensagens claras |
| 3 | **Performance** | Lista em cache por 5 min; sem chamadas duplicadas; <2s típico |
| 4 | **UX** | Atualizações otimistas; toasts de sucesso/erro; form data preservado |
| 5 | **Qualidade** | 100% cobertura de testes; integração end-to-end validada |

---

## 🏗️ Arquitetura (4 Camadas)

```
┌─────────────────────────────┐
│  UserRegistry Component     │  ← UI (form, list, pagination)
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ React Query Hooks           │  ← State management
│ (useUsers, useCreateUser)   │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ userService (Service Layer) │  ← HTTP wrapper + error handling
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│ Backend APIs                │  ← Fixed contract (read-only)
│ http://localhost:5001/api   │
└─────────────────────────────┘
```

### Padrões Arquiteturais

1. **Service-First**: Todas as chamadas HTTP centralizadas em `userService.ts`
2. **React Query**: Caching automático, deduplicação, retry, invalidação
3. **Error Mapping**: HTTP 400 → validação, 500 → genérico, etc.
4. **Optimistic Updates**: UI atualiza antes da resposta backend
5. **Testability**: Mocks em serviços, MSW em integração, 100% coverage

---

## 📊 Roadmap de Implementação

### 6 Fases, 40 Tarefas, ~48 horas (~5 dias 1 dev, ~2 dias 2 devs)

| Fase | Tarefas | Horas | Focus |
|------|---------|-------|-------|
| 1. Core Service Layer | 8 | 8h | Fixar chamadas HTTP, criar HttpError |
| 2. Error Handling | 5 | 6h | Mapear status codes, extrat field errors |
| 3. React Query Hooks | 8 | 12h | useUsers, useCreate, useUpdate, useDelete |
| 4. Component Integration | 6 | 8h | Wire UI aos hooks, show loading/errors |
| 5. Comprehensive Tests | 10 | 12h | Unit + integration + E2E tests |
| 6. Validation & Deploy | 3 | 2h | Test suite, manual QA, PR review |

**Paralelizável**: Dev 1 faz Fases 1-2, Dev 2 faz Fase 3 em paralelo, Dev 3 faz Fase 4 depois.

---

## 🔑 Decisões Arquiteturais Principais

### 1. React Query (Não Redux/Zustand)
**Por quê**: Caching automático, retry, deduplicação, invalidação sem boilerplate

### 2. Otimização Otimista
**Por quê**: Melhor perceived performance; UX mais rápida

### 3. Stale-Time 5 Minutos
**Por quê**: Balance entre freshness e API calls (usuários mudam raramente)

### 4. Serial Deletes (Não Paralelo)
**Por quê**: Segurança; falha parcial é explícita; backend não sobrecarregado

### 5. HttpError Class (Tipo Customizado)
**Por quê**: Erros distinguíveis; status code + payload + message num lugar

---

## 📋 Spec Deltas (Requirements)

### Capability 1: usuario-service-layer
Camada de serviço com HTTP chamadas + error handling.

**Requisitos principais**:
- FR-001: User List com paginação & filtros
- FR-002: User Create com POST
- FR-003: User Update com PUT
- FR-004: User Delete com DELETE (serial)
- FR-005: HTTP Error Handling (throw HttpError)
- FR-006: Request Cancellation (AbortSignal)

**Total de Scenarios**: 16

### Capability 2: usuario-state-management
React Query hooks para state + mutations + caching.

**Requisitos principais**:
- FR-101: useUsers hook (list + cache + refetch)
- FR-102: useCreateUser hook (create + optimistic + invalidate)
- FR-103: useUpdateUser hook (update + optimistic + invalidate)
- FR-104: useDeleteUser hook (delete + optimistic + invalidate)
- FR-105: Query Invalidation Strategy
- FR-106: Error Handling in Hooks

**Total de Scenarios**: 20

### Capability 3: usuario-error-handling
Tratamento robusto de erros + resilência.

**Requisitos principais**:
- FR-201: HTTP Status Code Handling (400/401/403/404/409/500/503/timeout)
- FR-202: Validation Error Extraction (field-level messages)
- FR-203: Optimistic Update Rollback on Error
- FR-204: Request Cancellation Handling
- FR-205: Retry Strategy for Transient Errors (3x exponential backoff)
- FR-206: Error Message Display in UI (toasts)
- FR-207: Form State Persistence (Recovery)
- FR-208: Logging and Observability

**Total de Scenarios**: 18

---

## 🧪 Estratégia de Testes

### Coverage Goal: 100%

| Nível | Files | Pattern | Tools |
|-------|-------|---------|-------|
| **Unit - Service** | `userService.test.ts` | Mock axios, test list/create/update/delete | Vitest |
| **Unit - Hooks** | `useUsers.test.ts`, etc | Mock userService, test cache/refetch/error | Vitest + React Testing Library |
| **Unit - Utils** | `httpError.test.ts`, `errorMessages.test.ts` | Pure functions | Vitest |
| **Integration** | `UserRegistry.test.tsx` | Render component, mock hooks + HTTP | React Testing Library + MSW |
| **E2E (Optional)** | `userManagement.spec.ts` | Real browser, real dev server | Playwright |

### Test Checklist

```
✅ Service list(): page 1, filters, pagination, error
✅ Service create(): success, 409 duplicate, 400 validation
✅ Service update(): success, 404 not found
✅ Service delete(): single, multiple, partial failure
✅ HttpError class and error message mapping
✅ useUsers hook: fetch, cache hit, refetch on param change
✅ useCreateUser: optimistic add, rollback on error, retry
✅ useUpdateUser: optimistic update, rollback, retry
✅ useDeleteUser: optimistic delete, rollback
✅ Component: render, click buttons, form submission
✅ Component: show loading, error, success states
✅ Component: form data preserved after error
✅ 100% code coverage
```

---

## 🚀 Como Proceder

### 1. Aprovação da Proposta
- [ ] Tech Lead revisa proposal.md + design.md
- [ ] Stakeholders aprovam cronograma (48h)
- [ ] Produto valida requisitos

### 2. Implementação (Siga tasks.md)
```bash
cd frontend

# Phase 1: Service Layer
npm run dev  # Start dev server

# Phase 2: Error Handling
# (edit frontend/src/utils/errorMessages.ts, etc.)

# Phase 3: React Query Hooks
# (create frontend/src/hooks/useUsers.ts, etc.)

# Phase 4: Component Integration
# (update frontend/src/pages/Administration/UserRegistry.tsx)

# Phase 5: Tests
npm test -- --coverage

# Phase 6: Validation
npm test -- --coverage  # 100%?
npm run dev  # Manual QA at http://localhost:5173/admin/usuarios

# Merge to develop
git push origin feature/integrate-usuario-backend
# Create PR, request review, merge
```

### 3. Deployment
```bash
# After PR merged to develop
# Backend team verifies API contracts
# QA tests in staging environment
# Deploy to production
```

---

## 📞 FAQ / Perguntas Frequentes

**P: E se o backend não tiver todos os endpoints?**  
R: A proposta assume endpoints completos (GET, POST, PUT, DELETE) verificados no Swagger em http://localhost:5001/swagger/index.html. Se houver gaps, contate backend team para implementar ou ajuste o escopo.

**P: E se a estrutura de erro do backend for diferente?**  
R: Neste caso, ajuste `httpError.ts` e `errorMessages.ts` para parsear o formato real.

**P: Posso paralelizar as tarefas?**  
R: Sim! Fases 1-2 em paralelo com Fase 3. Fase 4 começa depois da Fase 3.

**P: Quantos testes preciso escrever?**  
R: Suficiente para 100% code coverage (típico: 60-80 testes, ~800 linhas de código de teste).

**P: Quanto tempo leva?**  
R: ~48 horas (5 dias 1 dev, 2 dias 2 devs, 1 dia 3 devs em paralelo).

---

## 📚 Referências

- Backend Swagger API: http://localhost:5001/swagger/index.html
- Equipe: [copilot-instructions.md](../../.github/copilot-instructions.md)
- Spec Base: [specs/002-backend-integration/spec.md](../../specs/002-backend-integration/spec.md)
- React Query Docs: https://tanstack.com/query/latest
- OpenSpec Conventions: [openspec/AGENTS.md](./AGENTS.md)

---

## ✅ Checklist de Proposta

- [x] Problema claral definido
- [x] Solução arquitetônica justificada
- [x] Decisões técnicas explicitadas
- [x] Estimativas realistas (48h)
- [x] 3 Spec Deltas com Requirements + Scenarios
- [x] 40 Tarefas sequenciadas com testes
- [x] Plano de validação claro
- [x] Documentação completa

**Status**: 🟢 **PRONTO PARA REVISÃO**

---

Generated: 2025-12-29  
Change ID: `integrate-usuario-backend`  
By: GitHub Copilot (Claude Haiku 4.5)

