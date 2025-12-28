# 📝 Guia: Como Converter Tarefas em GitHub Issues

**Data**: 2025-12-28  
**Documento**: Para equipe de desenvolvimento  
**Objetivo**: Facilitar criação de issues a partir de TAREFAS_BACKEND_IMPLEMENTATION.md

---

## 🎯 Passo a Passo

### 1. Abrir GitHub - New Issue

```
https://github.com/[seu-repo]/issues/new
```

### 2. Preencher Formulário

```
Title:        [Copiar do documento: "T###: [Título]"]
Description:  [Colar bloco "Descrição:" do documento]
Labels:       backend-integration, priority:P1/P2/P3, type:implementation/testing
Assignee:     [Desenvolvedor responsável]
Milestone:    Sprint 1/2/3
```

---

## 📋 Template de Issue - Implementation

**Copie este template e preencha os placeholders [ASSIM]:**

```markdown
# T### [Título da Tarefa]

## 📋 Descrição

[COPIAR E COLAR do TAREFAS_BACKEND_IMPLEMENTATION.md]

## ✅ Critério de Aceitação

[COPIAR E COLAR seção "Critério de Aceitação"]

## 📚 Referências

- Documento: TAREFAS_BACKEND_IMPLEMENTATION.md
- Plano Técnico: PLANO_TAREFAS_BACKEND.md
- Sprint: ROADMAP_SPRINTS.md
- Backend API: [URL da API]

## 🔗 Linked Issues

- Depende de: [Task anterior se houver]
- Bloqueia: [Task posterior se houver]

## 👥 Assignee

[Nome do desenvolvedor]

## 📅 Estimates

- Story Points: [5/8/13/21]
- Time: [Xh conforme documento]

## 📌 Labels

- `backend-integration` - Categoria
- `priority:P1` - Prioridade
- `type:implementation` - Tipo
- `phase:1-rotinas-criticas` - Fase
```

---

## 🚀 Exemplos Práticos

### Exemplo 1: T001 - Razão Energética (Analysis)

```markdown
# T001: Analisar Contrato da API - Razão Energética

## 📋 Descrição

Analisar o contrato da API para Razão Energética conforme documentado em:
- contracts/critical-routines.md (se existir)
- Backend API: POST/GET /api/dadosenergeticos

### Tarefas específicas:
1. Identificar endpoints disponíveis (GET all, GET by ID, POST create, PUT update, DELETE)
2. Documentar estrutura de request (headers, body, params)
3. Documentar estrutura de response (campos, tipos, datas)
4. Identificar códigos de erro esperados (400, 404, 409, 500)
5. Validar 48 intervalos de meia hora por dia
6. Testar endpoints com Postman/Insomnia
7. Criar arquivo contracts/energetic.json com especificação completa

**Referências:**
- PLANO_TAREFAS_BACKEND.md: Section 1.1.1
- ANALISE_ROTINAS_CRITICAS.md: Section 1.1

## ✅ Critério de Aceitação

- [ ] Endpoints mapeados e documentados
- [ ] Estrutura de dados entendida
- [ ] Códigos de erro identificados
- [ ] 48 intervalos confirmados em teste real

## 📚 Referências

- Documento: TAREFAS_BACKEND_IMPLEMENTATION.md
- API Docs: https://api.exemplo.com/swagger
- Backend Repo: https://github.com/[...]/ONS_PoC-PDPW_V2

## 🔗 Linked Issues

- Bloqueia: T002, T003, T004 (todas tarefas de Razão Energética dependem desta)

## 👥 Assignee

@developer-name

## 📅 Estimates

- Story Points: 5
- Time: 3h

## 📌 Labels

- `backend-integration`
- `priority:P1`
- `type:analysis`
- `phase:1-rotinas-criticas`
```

### Exemplo 2: T002 - Razão Energética (Service Implementation)

```markdown
# T002: Criar Serviço de API - Razão Energética

## 📋 Descrição

Criar arquivo `frontend/src/services/energeticService.ts` com operações CRUD

### Requisitos:
1. Importar normalizeError() de utils/errorHandling.ts
2. Importar transformFromApi/transformToApi de utils/dtoTransformers.ts
3. Implementar função: getAll(date?: string): Promise<DadoEnergetico[]>
4. Implementar função: getById(id: string): Promise<DadoEnergetico>
5. Implementar função: create(data: CreateDadoEnergeticoDto): Promise<DadoEnergetico>
6. Implementar função: update(id: string, data: UpdateDadoEnergeticoDto): Promise<DadoEnergetico>
7. Implementar função: delete(id: string): Promise<void>
8. Implementar função: bulkUpsert(data: BulkUpsertDto): Promise<DadoEnergetico[]>
9. Todas as funções com try/catch + normalizeError()
10. Todas as respostas transformadas com transformFromApi()
11. Todos os payloads transformados com transformToApi()

### Padrão de implementação:
```typescript
export const energeticService = {
  async getAll(date?: string): Promise<DadoEnergetico[]> {
    try {
      const params = date ? { data: date } : {};
      const response = await apiClient.get('/dadosenergeticos', { params });
      return transformFromApi(response.data);
    } catch (error) {
      throw normalizeError(error);
    }
  }
  // ... outras funções
};
```

**Arquivo**: frontend/src/services/energeticService.ts  
**Tipos referenciados**: frontend/src/types/energetic.ts

## ✅ Critério de Aceitação

- [ ] Arquivo criado com 6 funções CRUD + bulkUpsert
- [ ] Todas as funções com error handling
- [ ] Todas as funções com DTO transformation
- [ ] TypeScript types corretos
- [ ] Sem erros de compilação

## 📚 Referências

- Anterior: #T001 (Analisar contrato - DEVE estar completo)
- Documento: TAREFAS_BACKEND_IMPLEMENTATION.md
- Error Handling: frontend/src/utils/errorHandling.ts
- DTO Transformers: frontend/src/utils/dtoTransformers.ts

## 🔗 Linked Issues

- Depende de: #T001
- Bloqueia: #T004, #T005, #T006

## 👥 Assignee

@developer-name

## 📅 Estimates

- Story Points: 8
- Time: 4h

## 📌 Labels

- `backend-integration`
- `priority:P1`
- `type:implementation`
- `phase:1-rotinas-criticas`
```

### Exemplo 3: T005 - Testes (Testing)

```markdown
# T005: Criar Testes - Razão Energética (Serviço)

## 📋 Descrição

Criar testes para energeticService.ts

**Arquivo**: frontend/tests/services/energeticService.test.ts

### Testes necessários:

#### 1. Testes de sucesso:
- getAll() retorna array de dados
- getById(id) retorna dados transformados (camelCase, datas)
- create() transforma request e response
- update() transforma request e response
- delete() remove item
- bulkUpsert(48 intervalos) retorna array completo

#### 2. Testes de erro HTTP:
- getAll() com 500 → normalizeError() chamado
- create() com 400 (validação) → erro com campos inválidos
- getById() com 404 → erro not found
- update() com 409 (conflito) → erro conflict
- delete() com 500 → erro server

#### 3. Testes de erro de rede:
- Timeout → createTimeoutError()
- Sem conexão → createNetworkError()

#### 4. Testes de transformação:
- Response com ISO date → transformado para Date object
- Request com camelCase → transformado para PascalCase
- Campos null/undefined preservados

#### 5. Testes de edge cases:
- bulkUpsert com menos de 48 intervalos
- bulkUpsert com mais de 48 intervalos (deve cortar)
- intervalos com valores limites (0, 999999)
- Observação vazia vs null

### Mock com MSW (Mock Service Worker):
```typescript
import { mockEndpoint, mockErrorEndpoint } from '../setup/mswServer';

beforeEach(() => {
  mockEndpoint('get', '/api/dadosenergeticos', mockData);
});

it('should get all energetic data', async () => {
  const result = await energeticService.getAll();
  expect(result).toEqual(transformedMockData);
});
```

**Cobertura esperada**: Mínimo 30 testes

## ✅ Critério de Aceitação

- [ ] 30+ testes criados
- [ ] Todos os casos de sucesso cobertos
- [ ] Todos os casos de erro cobertos
- [ ] Edge cases cobertos
- [ ] Todos os testes passando
- [ ] Cobertura >= 80%

## 📚 Referências

- Serviço: #T002 (Criar Serviço)
- Documento: TAREFAS_BACKEND_IMPLEMENTATION.md
- MSW Setup: frontend/tests/setup/mswServer.ts
- Testing Guide: CONTRIBUTING.md

## 🔗 Linked Issues

- Depende de: #T002
- Bloqueia: #T008 (Integração)

## 👥 Assignee

@qa-developer

## 📅 Estimates

- Story Points: 8
- Time: 5h

## 📌 Labels

- `backend-integration`
- `priority:P1`
- `type:testing`
- `phase:1-rotinas-criticas`
```

---

## 🔄 Fluxo de Workflow

### Criação de Issue

```
1. Developer cria issue a partir deste template
2. Preenche: Título, Descrição, Labels, Assignee, Milestone
3. Adiciona Linked Issues (depende/bloqueia)
4. Define Story Points
5. Coloca em projeto (kanban board)
```

### Durante desenvolvimento

```
- Status: "In Progress" (kanban board)
- Comment: Atualizações diárias se necessário
- Link PR: Quando criar pull request
```

### Review

```
- Code review por outro dev
- QA testa em staging
- Aprovação: checklist na issue
```

### Fechamento

```
- Merge PR para main
- Verificar:
  - [ ] Testes passando
  - [ ] Sem console errors
  - [ ] Checklist preenchido
  - [ ] Documentação atualizada
- Close issue
- Update CHECKLIST_MIGRACAO.md
```

---

## 📊 Bulk Create - Rotina para Sprint 1

Se deseja criar todas as 63 tasks de Sprint 1 de uma vez:

### Via GitHub CLI

```bash
#!/bin/bash
# create-sprint1-issues.sh

create_issue() {
  local title="$1"
  local description="$2"
  local labels="$3"
  local milestone="$4"
  
  gh issue create \
    --title "$title" \
    --body "$description" \
    --label "$labels" \
    --milestone "$milestone"
}

# Exemplo: T001
create_issue \
  "T001: Analisar Contrato da API - Razão Energética" \
  "$(cat <<'EOF'
Analisar o contrato da API para Razão Energética...
[COPIAR TEXTO COMPLETO]
EOF
)" \
  "backend-integration,priority:P1,type:analysis" \
  "Sprint 1 - Rotinas Críticas"

# ... repetir para T002, T003, ...
```

### Via Python Script

```python
# create_issues.py
import json
from github import Github

# Ler tasks do arquivo
with open('tasks.json', 'r') as f:
    tasks = json.load(f)

# Conectar ao GitHub
g = Github(token)
repo = g.get_repo("owner/repo")
project = repo.get_projects()[0]

for task in tasks:
    issue = repo.create_issue(
        title=task['title'],
        body=task['description'],
        labels=task['labels'],
        milestone=repo.get_milestone(task['milestone'])
    )
    
    # Adicionar ao kanban
    project.create_card(
        content_id=issue.id,
        content_type="Issue"
    )
    
    print(f"✅ Created: {task['title']}")
```

---

## 💡 Dicas

### Labels Recomendadas
```
backend-integration     (categoria principal)
priority:P1/P2/P3      (prioridade)
type:implementation    (tipo: implementation, testing, analysis, documentation)
phase:1-rotinas       (fase do roadmap)
status:ready           (pronto para começar)
blocked                (está bloqueado)
```

### Story Points (Fibonacci)
```
3  = Tarefa simples (< 3h)
5  = Tarefa média (3-5h)
8  = Tarefa complexa (5-8h)
13 = Tarefa muito complexa (8-13h)
21 = Tarefa épica (divida em menores)
```

### Milestones
```
Sprint 1 - Rotinas Críticas (Sem 1-2)
Sprint 2 - Páginas Migradas (Sem 3-5)
Sprint 3 - Páginas Pendentes (Sem 6-8)
Release 1.0 (Final)
```

---

## 📞 Suporte

Se tiver dúvidas:

1. Consultar TAREFAS_BACKEND_IMPLEMENTATION.md
2. Consultar ROADMAP_SPRINTS.md
3. Consultar PLANO_TAREFAS_BACKEND.md
4. Consultar Tech Lead

---

**Documento gerado**: 2025-12-28  
**Última atualização**: 2025-12-28  
**Versão**: 1.0
