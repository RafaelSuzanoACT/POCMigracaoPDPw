# 📚 Índice Geral - Documentação de Backend Integration PDPw

**Gerado**: 2025-12-28  
**Versão**: 1.0  
**Status**: ✅ Completo e pronto para implementação

---

## 🎯 Sumário Executivo

Este documento organiza a implementação de **conexão com backend** para o sistema PDPw em 3 fases:

| Fase | Foco | Páginas | Tasks | Horas | Timeline |
|------|------|---------|-------|-------|----------|
| **P1** 🔴 | Rotinas Críticas | 7 | 63 | 47h | Sem 1-2 |
| **P2** 🟡 | Coleta de Dados | 34 | 102 | 87h | Sem 3-5 |
| **P3** 🔵 | Pendentes | 7 | 126 | 94h | Sem 6-8 |
| **TOTAL** | **48 páginas** | **291 tasks** | **228h** | **8-10 sem** |

**MVP**: Sprint 1 (P1) - Sistema operacional para scheduling

---

## 📖 Documentos Principais

### 1. 🎯 TAREFAS_BACKEND_IMPLEMENTATION.md
**Arquivo**: `.github/TAREFAS_BACKEND_IMPLEMENTATION.md`

**O que é**: Documentação completa de todas as tarefas com descrições prontas para GitHub Issues

**Contém**:
- ✅ 7 páginas críticas (Razão Energética, Elétrica, IR1-IR4, Oferta Exportação)
- ✅ Template de tarefas por página: Análise → Serviço → Hooks → Componente → Testes (5/6 tarefas por página)
- ✅ 34 páginas migradas por domínio (Hidráulicos, Térmicos, Intercâmbio, Carga, Restrições, Outros)
- ✅ 7 páginas pendentes (Previsão Eólica, Ger. Arquivos, etc)
- ✅ Critério de aceitação detalhado por task
- ✅ Padrões de código e testes

**Como usar**: Copiar/colar cada tarefa (T###) como body de GitHub Issue

**Exemplo**: T001: Analisar Contrato da API - Razão Energética

---

### 2. 🗺️ ROADMAP_SPRINTS.md
**Arquivo**: `.github/ROADMAP_SPRINTS.md`

**O que é**: Planejamento executivo por sprint com breakdown de devs

**Contém**:
- ✅ Sprint 1: Rotinas Críticas (47h, 7 páginas)
- ✅ Sprint 2: Páginas Migradas (87h, 34 páginas)
- ✅ Sprint 3: Páginas Pendentes (94h, 7 páginas)
- ✅ Breakdown por developer (quem faz o quê)
- ✅ Timeline parallelizado (2-3 devs)
- ✅ Checklist de sucesso por sprint
- ✅ Cronograma consolidado (8-10 semanas)
- ✅ Estratégia de deployment
- ✅ Plano de comunicação

**Como usar**: Mostrar ao Tech Lead/PM para aprovação do roadmap

**Exemplo**: Sprint 1 (Semana 1-2) - Dev1: Razão Energética + Oferta Exportação

---

### 3. 📝 COMO_CRIAR_GITHUB_ISSUES.md
**Arquivo**: `.github/COMO_CRIAR_GITHUB_ISSUES.md`

**O que é**: Guia prático para converter tarefas em issues do GitHub

**Contém**:
- ✅ Passo a passo de criação
- ✅ Template de issue (markdown pronto para copiar)
- ✅ 3 exemplos práticos completos
- ✅ Fluxo de workflow (criação → desenvolvimento → review → merge)
- ✅ Script para bulk create (bash, Python)
- ✅ Labels, Story Points, Milestones
- ✅ Dicas e best practices

**Como usar**: Devs usam para criar issues. Tech Lead usa para bulk create via CLI

**Exemplo**: Criar T001 (3 cliques no GitHub)

---

### 4. 📊 TAREFAS_BACKEND_IMPLEMENTATION.md (Seções Detalhadas)

#### Parte 1: Rotinas Críticas (P1)
- **7 páginas críticas** organizadas como:
  - T001-T009: Razão Energética
  - T010-T018: Razão Elétrica
  - T019-T027: IR1
  - T028-T036: IR2
  - T037-T045: IR3
  - T046-T054: IR4
  - T055-T063: Oferta Exportação

- **Padrão por página**:
  1. T##X: Analisar contrato (Analysis)
  2. T##X: Criar serviço (Implementation)
  3. T##X: Criar hooks (Implementation)
  4. T##X: Conectar componente (Implementation)
  5. T##X: Testes serviço (Testing)
  6. T##X: Testes hooks (Testing)
  7. T##X: Testes componente (Testing)
  8. T##X: Testes integração (Testing)
  9. T##X: Atualizar checklist (Documentation)

#### Parte 2: Páginas Migradas (P2)
- **6 domínios** com 34 páginas:
  - Hidráulicos (4 páginas)
  - Térmicos (7 páginas)
  - Intercâmbio (3 páginas)
  - Carga (3 páginas)
  - Restrições & Manutenção (6 páginas)
  - Outros Dados (11 páginas)

- **Modelo por domínio** (102 tasks):
  - Criar service com CRUD
  - Criar hooks React Query
  - Conectar páginas (batch)
  - Testes (service, hooks, integration)
  - Checklist

#### Parte 3: Páginas Pendentes (P3)
- **7 páginas críticas não migradas** (126 tasks):
  - Previsão Eólica
  - Ger. Arquivos
  - Ger. Modelos
  - Finalização
  - Prog. Diária
  - Oferta RVD
  - Energia Vertida

- **Modelo por página** (18 tasks cada):
  - 9 tasks migração (análise → implementação)
  - 9 tasks backend (análise → testes)

---

## 🚀 Como Começar - Passo a Passo

### Dia 1: Planejamento
1. **Tech Lead lê**: ROADMAP_SPRINTS.md
2. **Time alinhado**: Sprint 1 priorities confirmed
3. **Preparação**: Backend API endpoints documentados

### Dia 2-3: Setup
1. **Tech Lead cria**: Milestone "Sprint 1 - Rotinas Críticas" no GitHub
2. **Bulk create issues**: Usar `COMO_CRIAR_GITHUB_ISSUES.md`
   - Opção A: Manual (63 issues em ~30 min)
   - Opção B: Script (bash/Python em ~2 min)
3. **Assign devs**: 3 devs pegam 2-3 issues cada
4. **Kanban setup**: GitHub Projects com colunas (Todo → In Progress → Review → Done)

### Dia 4+: Desenvolvimento
1. **Dev pega task**: Move para "In Progress"
2. **Dev implementa**: Segue padrão de código (error handling + transformers)
3. **Dev cria PR**: Link na issue
4. **Code review**: Outro dev aprova
5. **Merge**: Close issue, update checklist

### Fim de Sprint: Review
1. **QA testa**: Todos os cenários
2. **Demo**: Stakeholders veem funcionando
3. **Retrospective**: O que funcionou? O que melhorar?
4. **Release notes**: Preparar MVP

---

## 📋 Checklist de Preparação

Antes de começar Sprint 1, verificar:

### Backend
- [ ] API endpoints implementados (`/dadosenergeticos`, etc)
- [ ] Swagger/OpenAPI documentado
- [ ] SQL Server staging com dados
- [ ] Autenticação funcionando
- [ ] CORS configurado para frontend

### Frontend Infraestrutura
- [ ] errorHandling.ts criado (utils)
- [ ] dtoTransformers.ts criado (utils)
- [ ] api.ts types criado
- [ ] mswServer.ts setup criado
- [ ] Testes rodando (`npm test`)

### GitHub
- [ ] Milestone "Sprint 1" criado
- [ ] Labels padrão criados
- [ ] Projeto kanban criado
- [ ] 63 issues criadas e assignadas

### Team
- [ ] 3 devs alinhados
- [ ] Tech Lead definido
- [ ] QA designado
- [ ] Daily standup agendado (09:00)
- [ ] Sprint review agendado (sexta 15:00)

---

## 📊 Métricas de Sucesso

### Sprint 1
```
Target:
- 7/7 páginas conectadas ao backend
- 63/63 tasks completas
- 80+ testes criados
- 100% de cobertura
- 0 console errors
- API calls < 2s (95%)

Status: ✅ PASS se todos os targets atingidos
```

### Sprint 2
```
Target:
- 34/34 páginas conectadas
- 102/102 tasks completas
- 300+ testes criados
- 1224 pontos de checklist preenchidos
- Sistema de coleta 100% operacional

Status: ✅ PASS se Sprint 1 + todos targets
```

### Sprint 3
```
Target:
- 7/7 páginas migradas + conectadas
- 126/126 tasks completas
- 200+ testes criados
- Sistema PDP completo operacional
- 1728/1728 pontos de checklist

Status: ✅ PASS se Sprint 1+2 + todos targets
```

---

## 🔗 Relacionamentos entre Documentos

```
TAREFAS_BACKEND_IMPLEMENTATION.md
├── Define: Cada tarefa (T###) com descrição completa
├── Usado por: Devs (implementação)
├── Usado por: QA (testes)
└── Referencia: PLANO_TAREFAS_BACKEND.md (análise original)

ROADMAP_SPRINTS.md
├── Define: Timeline, breakdown, recursos
├── Usado por: Tech Lead (planejamento)
├── Usado por: PM (stakeholders)
└── Referencia: TAREFAS_BACKEND_IMPLEMENTATION.md (tasks)

COMO_CRIAR_GITHUB_ISSUES.md
├── Define: Processo de criação
├── Usado por: Devs (criar issues)
├── Usado por: Tech Lead (bulk create)
└── Referencia: TAREFAS_BACKEND_IMPLEMENTATION.md (templates)

PLANO_TAREFAS_BACKEND.md (Original)
├── Análise inicial das páginas e endpoints
├── Referência histórica
└── Detalhes técnicos do legado
```

---

## 📞 FAQ - Perguntas Frequentes

### P: Por onde começo?
**R**: 
1. Ler ROADMAP_SPRINTS.md (visão geral)
2. Entender Sprint 1 (7 páginas, 47h)
3. Criar issues usando COMO_CRIAR_GITHUB_ISSUES.md
4. Começar T001 (análise de API)

### P: Como sou assignado a uma tarefa?
**R**: 
1. Tech Lead cria issue e coloca nome seu
2. Você move para "In Progress" no kanban
3. Você tem direitos de push/PR no repo

### P: E se ficar bloqueado?
**R**: 
1. Comentar na issue com o problema
2. Fazer daily standup (09:00)
3. Contatar Tech Lead via Slack
4. Marcar com label "blocked"

### P: Como testo meu código?
**R**: 
1. Rodar: `npm test` (vitest)
2. Verificar coverage: `npm test -- --coverage`
3. Todos testes devem passar (status verde)
4. 0 console errors/warnings

### P: Quando faço PR?
**R**: 
1. Após T#### implementado
2. Criar branch: `feature/backend-[pagina]`
3. Commit com mensagem: `feat(backend): T### [título]`
4. Push e criar PR
5. Code review por outro dev
6. Merge após aprovação

### P: Como atualizo o checklist?
**R**: 
1. Abrir CHECKLIST_MIGRACAO.md
2. Encontrar seção da página (ex: Razão Energética)
3. Marcar checkboxes conforme completa
4. Commit: `docs: update checklist [página]`

### P: E se a API mudar?
**R**: 
1. Avisar imediatamente no Slack
2. Pausar task se bloqueado
3. Atualizar documentação em contracts/
4. Comunicar no standup

### P: Como é a review de código?
**R**: 
```
Deve ter:
- [ ] Sem console.log ou debuggers
- [ ] 100% tipos TypeScript
- [ ] Testes passando (npm test)
- [ ] Zero console errors/warnings
- [ ] Segue padrão de error handling
- [ ] Usa DTO transformers
- [ ] Comentários em código complexo
- [ ] README/docs atualizados

Reviewer: Outro dev da squad
Tempo: 24h máximo para review
```

### P: Como saberei quando estou pronto para próxima task?
**R**: 
- [ ] Critério de Aceitação todos checkados ✅
- [ ] Testes passando (npm test)
- [ ] PR aprovado
- [ ] Issue fechada
- [ ] Checklist atualizado

---

## 🎓 Recursos de Aprendizado

Se for a primeira vez fazendo backend integration:

1. **Error Handling**: Ler `frontend/src/utils/errorHandling.ts`
2. **DTO Transformers**: Ler `frontend/src/utils/dtoTransformers.ts`
3. **React Query**: Ler `frontend/src/hooks/useEnergeticData.ts` (exemplo)
4. **MSW Mocking**: Ler `frontend/tests/setup/mswServer.ts`
5. **Padrão de Serviço**: Ler `frontend/src/services/energeticService.ts`

---

## 📅 Timeline Recomendada

```
Semana 1
├─ Seg: Sprint 1 kick-off (9:00)
├─ Ter-Qui: Devs implementam T001-T018
├─ Sex: Code review + sprint review
└─ Resultado: Razão Energética + Elétrica online

Semana 2
├─ Seg: Sprint 1 continuação
├─ Ter-Fri: IR1, IR2, IR3 online
├─ Sex: Code review + sprint review
└─ Resultado: 5/7 rotinas críticas (71%)

Semana 3
├─ Seg: Sprint 1 final push
├─ Ter-Thu: IR4 + Oferta Exportação
├─ Fri: Final review + Demo com stakeholders
└─ Resultado: MVP COMPLETO (7/7 = 100%)

Semana 4-6: Sprint 2 (Dados de Coleta)
Semana 7-9: Sprint 3 (Páginas Pendentes)
```

---

## 📚 Documentação Relacionada

### Documentos Técnicos Originais
- `PLANO_TAREFAS_BACKEND.md` - Análise original de tarefas
- `ANALISE_ROTINAS_CRITICAS.md` - Análise de críticas
- `PLANO_MIGRACAO.md` - Plano geral de migração
- `CONTRIBUTING.md` - Workflow do projeto
- `README.md` - Setup e overview

### Documentos de Implementação (Este Conjunto)
- `TAREFAS_BACKEND_IMPLEMENTATION.md` - **Tarefas prontas**
- `ROADMAP_SPRINTS.md` - **Timeline executiva**
- `COMO_CRIAR_GITHUB_ISSUES.md` - **Guia prático**
- `INDICE_DOCUMENTACAO.md` - **Este arquivo**

### Documentos de Referência
- `CHECKLIST_MIGRACAO.md` - Status de migração (atualizar)
- `contracts/` - Especificações de API
- `specs/002-backend-integration/` - Design docs

---

## ✅ Checklist Final

- [ ] Todos os 3 documentos de implementação lidos
- [ ] ROADMAP_SPRINTS.md aprovado pelo Tech Lead
- [ ] GitHub milestone e kanban setup
- [ ] 63 issues criadas para Sprint 1
- [ ] 3 devs assignados
- [ ] Backend API endpoints verificados
- [ ] Frontend infraestrutura pronta (error handling, transformers, MSW)
- [ ] Daily standup agendado
- [ ] Ready to start Sprint 1 ✅

---

**Documento gerado**: 2025-12-28  
**Status**: ✅ Completo e pronto para uso  
**Próximo passo**: Presentar ROADMAP_SPRINTS.md para aprovação + começar Sprint 1

---

## 🎯 Quick Links

| Documento | Link | Tempo |
|-----------|------|-------|
| 🎯 Tarefas Detalhadas | TAREFAS_BACKEND_IMPLEMENTATION.md | 30 min |
| 🗺️ Roadmap & Timeline | ROADMAP_SPRINTS.md | 15 min |
| 📝 Como Criar Issues | COMO_CRIAR_GITHUB_ISSUES.md | 20 min |
| 📚 Este Índice | INDICE_DOCUMENTACAO.md | 10 min |

**Total de leitura estimada**: ~75 minutos para estar 100% alinhado
