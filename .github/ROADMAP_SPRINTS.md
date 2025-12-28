# 🗺️ Roadmap Executivo - Backend Integration PDPw

**Data**: 2025-12-28  
**Versão**: 1.0  
**Status**: Pronto para implementação  

---

## 📍 Visão Geral do Plano

```
SEMANA 1-2: Rotinas Críticas (7 páginas) → MVP operacional
SEMANA 3-5: Páginas Migradas (34 páginas) → Coleta completa
SEMANA 6-8: Páginas Pendentes (7 páginas) → Sistema completo
```

---

## 🎯 Sprint 1: Rotinas Críticas (47 horas)

### 🔴 Foco: P1 - Máxima Prioridade

**Objetivo**: Conectar as 7 rotinas críticas já migradas ao backend para viabilizar operações de scheduling

**Output**: Sistema funcional para operadores (MVP)

**Páginas**:
1. Razão Energética (frmColEnergetica.aspx)
2. Razão Elétrica (frmColEletrica.aspx)
3. IR1 - Nível de Partida (frmColIR1.aspx)
4. IR2 - Dia -1 (frmColIR2.aspx)
5. IR3 - Dia -2 (frmColIR3.aspx)
6. IR4 - Carga ANDE (frmColIR4.aspx)
7. Oferta Exportação (frmColOfertaExportacao.aspx)

### Breakdown por Developer

**Developer 1** (Backend Integration Lead):
- ✅ T001-T009: Razão Energética (Análise → Testes)
- ✅ T055-T063: Oferta Exportação (Análise → Testes)
- **Tempo**: ~16h

**Developer 2** (Backend Developer):
- ✅ T010-T018: Razão Elétrica (Análise → Testes)
- ✅ T019-T027: IR1 (Análise → Testes)
- **Tempo**: ~14h

**Developer 3** (Backend Developer):
- ✅ T028-T036: IR2 (Análise → Testes)
- ✅ T037-T045: IR3 (Análise → Testes)
- ✅ T046-T054: IR4 (Análise → Testes)
- **Tempo**: ~20h (pode paralelizar IR2-IR4 por serem similares)

### Parallelização

```
Semana 1: Dev1 (Energética), Dev2 (Elétrica), Dev3 (IR1)
Semana 2: Dev1 (Oferta), Dev2 (IR2), Dev3 (IR3 + IR4)
Paralelo: Testes com QA
```

### Checklist Sprint 1

- [ ] T001-T063 todas iniciadas
- [ ] Code reviews concluídos
- [ ] Todos os testes passando (130+ testes)
- [ ] Zero console errors/warnings
- [ ] CHECKLIST_MIGRACAO.md atualizado (7/34 páginas = 21%)
- [ ] Demo com stakeholders (funcionalidade end-to-end)
- [ ] Release notes preparado para MVP

### Critério de Sucesso

✅ **Sprint 1 PASS se**:
- [ ] 7/7 páginas com backend conectado
- [ ] 100% de cobertura de testes
- [ ] Todos os 36 pontos do checklist preenchidos por página
- [ ] API calls < 2 segundos em 95% dos casos
- [ ] Sem bugs críticos (bloqueadores)
- [ ] Documentação completa

---

## 🟡 Sprint 2: Páginas Migradas (87 horas)

### Foco: P2 - Alta Prioridade

**Objetivo**: Conectar 34 páginas de coleta de dados ao backend

**Output**: Módulo de coleta de dados operacional

**Domínios**:
1. Hidráulicos (4 páginas)
2. Térmicos (7 páginas)
3. Intercâmbio (3 páginas)
4. Carga (3 páginas)
5. Restrições & Manutenção (6 páginas)
6. Outros Dados (11 páginas)

### Breakdown por Domain

| Domain | Dev # | Time | Pages |
|--------|-------|------|-------|
| Hidráulicos | Dev 1 | 10h | 4 |
| Térmicos | Dev 2 | 18h | 7 |
| Intercâmbio | Dev 1 | 8h | 3 |
| Carga | Dev 3 | 8h | 3 |
| Restrições | Dev 2 | 15h | 6 |
| Outros | Dev 3 | 28h | 11 |

### Parallelização

```
Semana 3: Dev1 (Hidráulicos), Dev2 (Térmicos), Dev3 (Carga)
Semana 4: Dev1 (Intercâmbio), Dev2 (Restrições), Dev3 (Outros - batch 1)
Semana 5: Dev3 (Outros - batch 2), QA (testes integração), Dev1+2 (revisão)
```

### Checklist Sprint 2

- [ ] 34/34 páginas com backend
- [ ] 102 tasks implementadas
- [ ] 300+ novos testes criados
- [ ] CHECKLIST_MIGRACAO.md: 21% → 100%
- [ ] Todos domínios testados em integração
- [ ] Performance validated (< 2s)
- [ ] Documentação atualizada

### Critério de Sucesso

✅ **Sprint 2 PASS se**:
- [ ] 34/34 páginas com backend conectado
- [ ] 100% de cobertura de testes por domínio
- [ ] 36 pontos checklist completo por página
- [ ] 0 console errors
- [ ] Módulo de coleta operacional 100%

---

## 🔵 Sprint 3: Páginas Pendentes (94 horas)

### Foco: P3 - Média Prioridade

**Objetivo**: Migrar 7 páginas críticas não migradas + conectar ao backend

**Output**: Sistema completo de programação (PDP)

**Páginas**:
1. Previsão Eólica (frmColPrevisaoEolica.aspx) - 18h
2. Ger. Arquivos (frmGerArquivo.aspx) - 14h
3. Ger. Modelos (frmGerModelos.aspx) - 16h
4. Finalização (frmFinalizacao.aspx) - 14h
5. Prog. Diária (PDPProgDiaria.aspx) - 14h
6. Oferta RVD (frmColOfertaRVD.aspx) - 12h
7. Energia Vertida (frmColEnergiaVertida.aspx) - 12h

### Breakdown por Dev

**Dev 1** (Frontend + Migration):
- Previsão Eólica (18h) - Migração + backend
- Oferta RVD (12h) - Migração + backend
- **Total**: 30h

**Dev 2** (Backend):
- Ger. Arquivos (14h) - Migração + backend
- Ger. Modelos (16h) - Migração + backend
- **Total**: 30h

**Dev 3** (Reports + Finalization):
- Finalização (14h) - Migração + backend
- Prog. Diária (14h) - Migração + backend
- Energia Vertida (12h) - Migração + backend
- **Total**: 40h

### Parallelização

```
Semana 6: Todos fazem migração (2-3 dias)
Semana 7: Todos fazem backend connection
Semana 8: QA + refinamentos
```

### Checklist Sprint 3

- [ ] 7/7 páginas migradas
- [ ] 7/7 páginas com backend
- [ ] 126 tasks implementadas
- [ ] CHECKLIST_MIGRACAO.md: 100% → 100% (completo)
- [ ] Sistema completo testado
- [ ] Documentação final

### Critério de Sucesso

✅ **Sprint 3 PASS se**:
- [ ] 7/7 páginas migradas + backend
- [ ] 100% de cobertura de testes
- [ ] 36 pontos checklist completo por página
- [ ] 0 console errors
- [ ] Sistema PDP completo operacional

---

## 📊 Cronograma Consolidado

```
Total: 8-10 semanas de desenvolvimento

Semana  1-2:  Sprint 1 - Rotinas Críticas (P1)        ✅ MVP
Semana  3-5:  Sprint 2 - Páginas Migradas (P2)        ✅ Coleta
Semana  6-8:  Sprint 3 - Páginas Pendentes (P3)       ✅ Completo
Semana    9:  QA Final + Release Preparation
Semana   10:  Production Deployment + Support

Total de Horas: 47h + 87h + 94h + 20h + 10h = 258 horas
Com 2 devs: ~10-12 semanas de trabalho paralelo
Com 3 devs: ~6-8 semanas de trabalho paralelo
```

---

## 🔧 Recursos Necessários

### Time
- 2-3 Backend/Full-Stack Developers
- 1 QA Engineer (a partir da Semana 2)
- 1 Tech Lead (oversight + reviews)

### Infraestrutura
- Backend API (`ONS_PoC-PDPW_V2`) deployed e funcional
- SQL Server de testes com dados realistas
- Ambiente de staging para testes integração
- CI/CD pipeline (GitHub Actions)

### Ferramentas
- Postman/Insomnia (testar endpoints)
- Mock Service Worker (testes)
- Vitest (testes unitários)
- Jest/Testing Library (testes componentes)
- GitHub Projects (kanban)

---

## 📈 Métricas de Sucesso

### Por Sprint

| Métrica | Sprint 1 | Sprint 2 | Sprint 3 | Total |
|---------|----------|----------|----------|-------|
| Páginas | 7/7 | 34/34 | 7/7 | 48/48 |
| Tasks | 63 | 102 | 126 | 291 |
| Testes | 80 | 300 | 200 | 580 |
| Cobertura | 100% | 100% | 100% | 100% |
| Checklist Points | 252/252 | 1224/1224 | 252/252 | 1728/1728 |

### Final Target
- ✅ 48/48 páginas com backend conectado (100%)
- ✅ 580+ testes criados (100% cobertura)
- ✅ 1728/1728 pontos de checklist preenchidos
- ✅ 0 console errors na produção
- ✅ API calls < 2s em 95% dos casos
- ✅ Sistema 100% operacional

---

## 🚀 Deployment Strategy

### MVP (Sprint 1)
```
Branch: main
Deploy to: Staging (testes com stakeholders)
Feature Flag: Rotinas críticas enabled
Rollback: Easy (revert to WebForms se necessário)
```

### Full Release (Sprint 2+3)
```
Branch: main
Deploy to: Production
Feature Flags: Gradual rollout por domínio
Monitoring: APM + error tracking
Support: On-call team
```

---

## 📞 Communication Plan

### Daily
- 09:00 - Stand-up (15 min) - blockers + progress
- 14:00 - Sync (15 min) - questions + decisions

### Weekly
- Segunda: Sprint planning (60 min)
- Terça: Dev sync (30 min)
- Quinta: QA review (30 min)
- Sexta: Sprint review + retrospective (60 min)

### Stakeholders
- Segunda 14h: Status update com stakeholders
- Sexta 15h: Demo com operadores (a partir de Sprint 1)

---

## ⚠️ Riscos e Mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Backend API não pronta | Média | Alto | Parar, contato imediato com backend team |
| Dados mockados não realistas | Média | Médio | Usar dados reais a partir de Sprint 2 |
| Descoberta de bugs em produção | Baixa | Alto | 100% testes, QA rigorosa |
| Falta de comunicação entre devs | Baixa | Médio | Daily stand-ups + Slack channel |
| Requisitos mudam durante sprint | Média | Médio | Change request form, Sprint 2 mínimo |

---

## 📚 Documentação

- [ ] README.md - Instruções de setup
- [ ] CONTRIBUTING.md - Workflow de contribution
- [ ] API_DOCUMENTATION.md - Endpoints e payloads
- [ ] TESTING_GUIDE.md - Como rodar testes
- [ ] DEPLOYMENT_GUIDE.md - Como fazer deploy
- [ ] TROUBLESHOOTING.md - Problemas comuns e soluções

---

## ✅ Handoff Checklist

### Antes de iniciar Sprint 1
- [ ] Backend API endpoints documentados
- [ ] SQL Server de teste com dados
- [ ] Ambiente staging funcionando
- [ ] GitHub kanban board criado
- [ ] Todas as issues criadas
- [ ] Time alinhado no roadmap
- [ ] Repositórios legado (pdpw_act) acessíveis

### Fim de cada Sprint
- [ ] Todos os testes passando
- [ ] Code reviews completos
- [ ] CHECKLIST_MIGRACAO.md atualizado
- [ ] Release notes preparado
- [ ] Demo para stakeholders
- [ ] Retrospective completa
- [ ] Lições aprendidas documentadas

---

**Próximo passo**: Confirmar com time e iniciar Sprint 1 com Task Force de 2-3 developers

Documento gerado: 2025-12-28 | Versão 1.0
