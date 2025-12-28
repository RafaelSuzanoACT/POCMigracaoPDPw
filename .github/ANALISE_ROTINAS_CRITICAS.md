# 🔴 Análise das Rotinas Críticas do PDP

## 📋 Resumo Executivo

Este documento apresenta a análise das **7 rotinas críticas** do Processo de Programação Diária de Produção (PDP) e seu status de migração.

---

## 🎯 As 7 Rotinas Críticas do PDP

### 1️⃣ Cadastro dos dados da Programação Energética, Elétrica e Previsão Eólica

#### Status Geral: 🟡 PARCIALMENTE MIGRADO

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmColEnergetica.aspx** (Razão Energética) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmColEletrica.aspx** (Razão Elétrica) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmColPrevisaoEolica.aspx** (Previsão Eólica) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ✅ Razão Energética: Conectar ao backend (dados mockados)
- ✅ Razão Elétrica: Conectar ao backend (dados mockados)
- ❌ Previsão Eólica: **MIGRAR URGENTE** + Conectar ao backend

---

### 2️⃣ Geração dos arquivos para Modelos

#### Status Geral: ❌ NÃO MIGRADO

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmGerArquivo.aspx** (Gerenciamento de Arquivos) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmGerModelos.aspx** (Geração de Modelos) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ❌ Gerenciamento de Arquivos: **MIGRAR URGENTE** + Conectar ao backend
- ❌ Geração de Modelos: **MIGRAR URGENTE** + Conectar ao backend

**Impacto:** Sem essas páginas, não é possível gerar os arquivos de entrada para os modelos de otimização (DESSEM, DECOMP).

---

### 3️⃣ Finalização da Programação

#### Status Geral: ❌ NÃO MIGRADO

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmFinalizacao.aspx** (Finalização) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **PDPProgDiaria.aspx** (Programação Diária) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ❌ Finalização: **MIGRAR URGENTE** + Conectar ao backend
- ❌ Programação Diária: **MIGRAR URGENTE** + Conectar ao backend

**Impacto:** Sem essas páginas, não é possível finalizar e publicar a programação diária.

---

### 4️⃣ Recebimento de insumos da programação diária pelos agentes

#### Status Geral: ✅ MIGRADO (Backend Pendente)

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmColIR1.aspx** (Nível de Partida) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmColIR2.aspx** (Dia -1) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmColIR3.aspx** (Dia -2) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |
| **frmColIR4.aspx** (Carga da Ande) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ✅ IR1: Conectar ao backend (dados mockados)
- ✅ IR2: Conectar ao backend (dados mockados)
- ✅ IR3: Conectar ao backend (dados mockados)
- ✅ IR4: Conectar ao backend (dados mockados)

**Observação:** Todas as páginas já estão migradas, apenas precisam ser conectadas ao backend.

---

### 5️⃣ Recebimento de ofertas de exportação de térmicas

#### Status Geral: ✅ MIGRADO (Backend Pendente)

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmColOfertaExportacao.aspx** (Oferta de Exportação) | ✅ Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ✅ Oferta de Exportação: Conectar ao backend (dados mockados)

**Observação:** Página já migrada, apenas precisa ser conectada ao backend.

---

### 6️⃣ Recebimento de ofertas de resposta voluntária da demanda

#### Status Geral: ❌ NÃO MIGRADO

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmColOfertaRVD.aspx** (Oferta RVD) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ❌ Oferta RVD: **MIGRAR URGENTE** + Conectar ao backend

**Impacto:** Sem essa página, não é possível receber ofertas de resposta voluntária da demanda dos agentes.

---

### 7️⃣ Recebimento de dados de energia vertida turbinável

#### Status Geral: ❌ NÃO MIGRADO

| Página | Status Migração | Status Backend | Prioridade |
|--------|----------------|----------------|------------|
| **frmColEnergiaVertida.aspx** (Energia Vertida) | ❌ Não Migrada | ⏳ Pendente | 🔴 MÁXIMA |

**Ações Necessárias:**
- ❌ Energia Vertida: **MIGRAR URGENTE** + Conectar ao backend

**Impacto:** Sem essa página, não é possível registrar dados de energia vertida turbinável das usinas hidráulicas.

---

## 📊 Resumo Quantitativo

### Por Status de Migração

| Status | Quantidade | Percentual | Páginas |
|--------|-----------|-----------|---------|
| ✅ **Migradas** | **7** | **50%** | Energética, Elétrica, IR1, IR2, IR3, IR4, Oferta Exportação |
| ❌ **Não Migradas** | **7** | **50%** | Previsão Eólica, Ger. Arquivos, Ger. Modelos, Finalização, Prog. Diária, Oferta RVD, Energia Vertida |
| **TOTAL** | **14** | **100%** | |

### Por Status de Backend

| Status | Quantidade | Percentual |
|--------|-----------|-----------|
| ⏳ **Backend Pendente** | **14** | **100%** |
| ✅ **Backend Conectado** | **0** | **0%** |

### Por Prioridade

| Prioridade | Quantidade | Ação |
|-----------|-----------|------|
| 🔴 **MÁXIMA** | **14** | Todas as rotinas críticas |

---

## 🚨 Páginas Críticas que Precisam ser Migradas URGENTEMENTE

### 1. **frmColPrevisaoEolica.aspx** (Previsão Eólica)
- **Motivo:** Essencial para cadastro de dados de programação
- **Complexidade:** Média (grid 48 intervalos + gráficos)
- **Tempo Estimado:** 2-3 dias

### 2. **frmGerArquivo.aspx** (Gerenciamento de Arquivos)
- **Motivo:** Necessário para geração de arquivos para modelos
- **Complexidade:** Alta (operações de arquivo, validações)
- **Tempo Estimado:** 3-4 dias

### 3. **frmGerModelos.aspx** (Geração de Modelos)
- **Motivo:** Necessário para geração de arquivos para modelos
- **Complexidade:** Alta (integração com modelos DESSEM/DECOMP)
- **Tempo Estimado:** 4-5 dias

### 4. **frmFinalizacao.aspx** (Finalização)
- **Motivo:** Necessário para finalizar a programação
- **Complexidade:** Alta (validações, checklist, consolidação)
- **Tempo Estimado:** 3-4 dias

### 5. **PDPProgDiaria.aspx** (Programação Diária)
- **Motivo:** Necessário para visualizar e publicar a programação
- **Complexidade:** Alta (calendário, grid, exportação)
- **Tempo Estimado:** 3-4 dias

### 6. **frmColOfertaRVD.aspx** (Oferta RVD)
- **Motivo:** Necessário para receber ofertas de resposta voluntária
- **Complexidade:** Média (grid 48 intervalos, validações)
- **Tempo Estimado:** 2-3 dias

### 7. **frmColEnergiaVertida.aspx** (Energia Vertida)
- **Motivo:** Necessário para registrar energia vertida turbinável
- **Complexidade:** Média (grid 48 intervalos, cálculos)
- **Tempo Estimado:** 2-3 dias

**Tempo Total Estimado:** 19-26 dias de desenvolvimento

---

## 🔌 Páginas Migradas que Precisam Conexão com Backend

### Prioridade 1 (Rotinas Críticas)
1. **frmColEnergetica.aspx** (Razão Energética) - 1 dia
2. **frmColEletrica.aspx** (Razão Elétrica) - 1 dia
3. **frmColIR1.aspx** (IR1) - 1 dia
4. **frmColIR2.aspx** (IR2) - 1 dia
5. **frmColIR3.aspx** (IR3) - 1 dia
6. **frmColIR4.aspx** (IR4) - 1 dia
7. **frmColOfertaExportacao.aspx** (Oferta Exportação) - 1 dia

**Tempo Total Estimado:** 7 dias

### Prioridade 2 (Outras Páginas Migradas)
- 41 páginas restantes de coleta de dados
- 5 páginas de administração
- 2 páginas de consulta

**Tempo Total Estimado:** 30-40 dias

---

## 📅 Cronograma Sugerido

### Sprint 1 (2 semanas) - Rotinas Críticas Migradas
- Conectar backend das 7 páginas críticas já migradas
- Testar integração completa
- Validar regras de negócio

### Sprint 2 (2 semanas) - Previsão Eólica e Ofertas
- Migrar frmColPrevisaoEolica.aspx
- Migrar frmColOfertaRVD.aspx
- Migrar frmColEnergiaVertida.aspx
- Conectar ao backend

### Sprint 3 (3 semanas) - Geração de Arquivos e Modelos
- Migrar frmGerArquivo.aspx
- Migrar frmGerModelos.aspx
- Conectar ao backend
- Testar geração de arquivos

### Sprint 4 (2 semanas) - Finalização e Programação
- Migrar frmFinalizacao.aspx
- Migrar PDPProgDiaria.aspx
- Conectar ao backend
- Testar fluxo completo

### Sprint 5+ (4-6 semanas) - Demais Páginas
- Conectar backend das 48 páginas restantes
- Testar integração completa
- Validar regras de negócio

**Tempo Total:** 13-15 semanas (3-4 meses)

---

## 🎯 Próximos Passos Imediatos

### Semana 1
1. ✅ Conectar frmColEnergetica.aspx ao backend
2. ✅ Conectar frmColEletrica.aspx ao backend
3. ✅ Conectar frmColIR1.aspx ao backend

### Semana 2
4. ✅ Conectar frmColIR2.aspx ao backend
5. ✅ Conectar frmColIR3.aspx ao backend
6. ✅ Conectar frmColIR4.aspx ao backend
7. ✅ Conectar frmColOfertaExportacao.aspx ao backend

### Semana 3
8. ❌ Migrar frmColPrevisaoEolica.aspx
9. ❌ Conectar frmColPrevisaoEolica.aspx ao backend

### Semana 4
10. ❌ Migrar frmColOfertaRVD.aspx
11. ❌ Conectar frmColOfertaRVD.aspx ao backend
12. ❌ Migrar frmColEnergiaVertida.aspx
13. ❌ Conectar frmColEnergiaVertida.aspx ao backend

---

## 📚 Recursos Necessários

### Repositórios
- **Frontend:** `POCMigracaoPDPw/frontend`
- **Backend:** `ONS_PoC-PDPW_V2`
- **Legado:** `pdpw_act` (para consultar regras de negócio)

### Ferramentas
- React + TypeScript
- React Query (para integração com API)
- Vitest (para testes)
- Axios (para chamadas HTTP)

### Documentação
- Plano de Migração: `POCMigracaoPDPw/.github/PLANO_MIGRACAO.md`
- Plano de Tarefas: `POCMigracaoPDPw/.github/PLANO_TAREFAS_BACKEND.md`
- Guia de Agentes: `POCMigracaoPDPw/.github/AGENTS.md`

---

## ⚠️ Riscos e Dependências

### Riscos
1. **Backend não disponível:** APIs podem não estar implementadas
2. **Regras de negócio complexas:** Podem exigir mais tempo de análise
3. **Dados mockados:** Podem não refletir a realidade do sistema

### Dependências
1. **APIs do backend:** Precisam estar implementadas e documentadas
2. **Acesso ao legado:** Para consultar regras de negócio
3. **Ambiente de testes:** Para validar integração

### Mitigação
1. Priorizar análise das APIs disponíveis
2. Documentar regras de negócio durante a migração
3. Criar ambiente de testes com dados realistas

---

## 📞 Contatos e Suporte

Para dúvidas sobre:
- **Regras de negócio:** Consultar código legado em `pdpw_act`
- **APIs:** Consultar documentação em `ONS_PoC-PDPW_V2`
- **Arquitetura:** Consultar `AGENTS.md` e `PLANO_MIGRACAO.md`
