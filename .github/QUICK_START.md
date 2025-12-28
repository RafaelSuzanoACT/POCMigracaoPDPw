# ⚡ Quick Start - Comece Agora!

**Data**: 2025-12-28  
**Tempo de leitura**: 5 minutos  
**Objetivo**: Começar Sprint 1 imediatamente

---

## 🚀 Em 30 minutos, você pode estar implementando

### Passo 1: Ler (5 min)
- [ ] Ler este arquivo (Quick Start)
- [ ] Ler ROADMAP_SPRINTS.md - Seção "Sprint 1"
- [ ] Entender seu role (Dev1, Dev2, ou Dev3)

### Passo 2: Setup (10 min)
```bash
# Clone repo
git clone https://github.com/[repo]/POCMigracaoPDPw.git
cd POCMigracaoPDPw

# Install dependencies
npm install

# Run tests (verificar setup)
npm test

# Start dev server
npm run dev
```

### Passo 3: Criar Branch (5 min)
```bash
# Criar branch para sua task
git checkout -b feature/backend-energetic

# Ou a página que recebeu
git checkout -b feature/backend-[pagina-nome]
```

### Passo 4: Começar Implementação (10 min)
- [ ] Abrir TAREFAS_BACKEND_IMPLEMENTATION.md
- [ ] Encontrar seu primeiro T###
- [ ] Seguir o template de descrição
- [ ] Criar arquivo conforme especificado

---

## 📍 Próximas Ações por Role

### 🔴 Se você é Dev1 (Backend Lead)
```
Semana 1:
┌─ Segunda: Start T001 (Análise Razão Energética)
│  └─ 2-3h: Documentar endpoints, requests, responses
├─ Terça: Start T002 (Service)
│  └─ Criar frontend/src/services/energeticService.ts
├─ Quarta: Start T003 (Hooks)
│  └─ Criar frontend/src/hooks/useEnergeticData.ts
├─ Quinta: T004 + Reviews
│  └─ Conectar componente
└─ Sexta: Sprint Review

Depois:
└─ T005-T009: Testes Razão Energética
   T055-T063: Oferta Exportação

Pessoas para coordenar: Dev2, Dev3
```

### 🟡 Se você é Dev2 (Backend)
```
Semana 1:
┌─ Segunda: Start T010 (Análise Razão Elétrica)
│  └─ Similar a Energética, mais edição por usina
├─ Terça: T011-T013 (Service, Hooks, Component)
├─ Quarta: T014-T018 (Testes)
├─ Quinta-Sexta: Start T019-T027 (IR1)
│  └─ Similar a Energética mas 24 intervals
└─ Sprint Review

Depois:
└─ T028-T036: IR2
```

### 🔵 Se você é Dev3 (Backend)
```
Semana 1:
┌─ Segunda: Start T019-T027 (IR1)
│  └─ Paralelizar com Dev2
├─ Terça: Start T028-T036 (IR2)
│  └─ Muito similar a IR1 (copiar/adaptar)
├─ Quarta-Quinta: T037-T045 (IR3)
│  └─ 3x o mesmo padrão
├─ Sexta: T046-T054 (IR4)
│  └─ Finalizar rotinas
└─ Sprint Review

Dica: IR2, IR3, IR4 são quase idênticas → reutilizar código
```

---

## 🎯 Seu Primeiro Commit

Depois de 2-3h de trabalho no T001:

```bash
# Status
git status

# Add files
git add frontend/src/services/energeticService.ts
git add frontend/tests/services/energeticService.test.ts

# Commit
git commit -m "feat(backend): T002 Create energetic service with CRUD"

# Push
git push origin feature/backend-energetic

# Create PR no GitHub
# Link issue: Closes #[issue-number]
```

---

## 📊 Como Saber se está Certo

### ✅ Sua implementação está correta se:

```javascript
// 1. Testes passam
npm test
// ✅ All tests passing

// 2. Sem erros
npm run build
// ✅ Build successful

// 3. Sem warnings
npm run lint
// ✅ No linting issues

// 4. Error handling presente
const response = await apiClient.get('/endpoint');
try {
  // ... seu código
} catch (error) {
  throw normalizeError(error); // ✅ Presente
}

// 5. DTO transformers presentes
return transformFromApi(response.data); // ✅ GET
const payload = transformToApi(data);   // ✅ POST

// 6. TypeScript types corretos
const data: DadoEnergetico[] = [];  // ✅ Tipado

// 7. Sem console.log
console.log() // ❌ Remover antes de PR
```

---

## 🚨 Se Ficar Bloqueado

### Erro 1: "Cannot find module '...'
```
Solução:
1. Verificar import path
2. npm install
3. npm run dev
4. Restart editor
```

### Erro 2: "Tests failing"
```
Solução:
1. npm test -- --watch (ver qual test falhando)
2. Debugar test (ler error message)
3. Ajustar código
4. npm test (verificar passa)
```

### Erro 3: "API não retorna dados"
```
Solução:
1. Verificar URL em apiClient (/api/dados...)
2. Verificar se Backend API rodando
3. Se desenvolvendo, usar MSW (Mock Service Worker)
4. Verificar contrato de API em contracts/
```

### Erro 4: "Build errors"
```
Solução:
1. npm run build (ver erro)
2. Verificar tipos TypeScript
3. Importações corretas
4. npm install (instalar dependências faltando)
```

### Erro 5: "Bloqueado em dependência"
```
Solução:
1. Comentar na issue
2. Fazer daily standup (09:00)
3. Chamar Tech Lead
4. Trabalhar em outra task enquanto aguarda
```

---

## 🎯 Checklist Sprint 1 - Primeiros 3 Dias

### Dia 1 (Segunda)
- [ ] Setup ambiente (npm install, npm test)
- [ ] Branch criada
- [ ] T001 (Análise) iniciada
- [ ] Endpoints documentados
- [ ] PR criada com análise completa

### Dia 2 (Terça)
- [ ] T001 PR merged
- [ ] T002 (Service) iniciada
- [ ] Serviço com 6 funções
- [ ] Error handling presente
- [ ] Testes compilando

### Dia 3 (Quarta)
- [ ] T002 PR merged
- [ ] T003 (Hooks) completa
- [ ] 7 hooks criados
- [ ] Testes passando
- [ ] PR criada

### Fim de Semana 1 (Sexta)
- [ ] Code review completo
- [ ] T001-T009 ou T010-T018 finalizados
- [ ] 1 página com backend online
- [ ] Sprint review com stakeholders
- [ ] Celebrate 🎉

---

## 📞 Contatos Rápidos

| Pessoa | Role | Contato | Tempo Resposta |
|--------|------|---------|----------------|
| Tech Lead | Oversight | Slack #tech-lead | 1h |
| Backend API | Endpoints | Slack #backend-api | 2h |
| QA | Testing | Slack #qa | 4h |
| PM | Blockers | Slack #product | 1h |

---

## 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| **Este documento** | `.github/QUICK_START.md` |
| **Tarefas detalhadas** | `.github/TAREFAS_BACKEND_IMPLEMENTATION.md` |
| **Roadmap & Timeline** | `.github/ROADMAP_SPRINTS.md` |
| **Como criar issues** | `.github/COMO_CRIAR_GITHUB_ISSUES.md` |
| **Tabelas de referência** | `.github/TABELAS_REFERENCIA_RAPIDA.md` |
| **Backend API Docs** | `https://api.example.com/swagger` |
| **GitHub Project** | `https://github.com/[repo]/projects/1` |
| **GitHub Issues** | `https://github.com/[repo]/issues?label=Sprint1` |

---

## 💡 Pro Tips

### Tip 1: Reutilizar Código
```typescript
// T001 faz Energética
// T010 pode copiar 80% de T001 (só muda endpoint)
// Ganhar tempo! Copy-paste é OK em similaridade
```

### Tip 2: Parallelize Testing
```bash
# Enquanto Dev1 faz service (T002)
# Dev2 já pode testar com MSW mock
# Antes do service estar pronto
```

### Tip 3: Use Git Effectively
```bash
# Amend commit anterior
git commit --amend
git push -f

# Rebase e squash
git rebase -i HEAD~3
# 'reword' primeira, 'squash' resto
```

### Tip 4: Debug TypeScript
```typescript
// Hover para ver tipos
const data: unknown = response;
// Ctrl+click para ir pra definição
// F12 para developer tools
```

### Tip 5: Use Snippets
```typescript
// Em .vscode/settings.json
"[typescript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}

// Snippets customizadas em .vscode/snippets.json
```

---

## 📈 Progresso Esperado

### Primeira Semana
```
Dia 1 (Seg):  20% - Setup + T001 started
Dia 2 (Ter):  40% - T001-T002 done
Dia 3 (Qua):  60% - T001-T003 done
Dia 4 (Qui):  80% - T001-T004 done
Dia 5 (Sex): 100% - T001-T009 done + merged
```

### Segunda Semana
```
Dia 6 (Seg):  20% - T055 started (Oferta Exportação)
Dia 7 (Ter):  40% - T055-T056 done
Dia 8 (Qua):  60% - T055-T057 done
Dia 9 (Qui):  80% - T055-T058 done
Dia 10 (Sex): 100% - T055-T063 done + MVP COMPLETE
```

---

## 🎓 Primeiro Dia - Mapa Mental

```
09:00 - Daily Standup (15 min)
        ├─ O que fiz ontem
        ├─ O que faço hoje
        └─ Há blockers?

09:15 - Setup Ambiente (30 min)
        ├─ git clone
        ├─ npm install
        ├─ npm test (deve passar)
        └─ npm run dev (deve rodar)

09:45 - Ler Documentação (30 min)
        ├─ Seu T### (Task)
        ├─ TAREFAS_BACKEND_IMPLEMENTATION.md
        ├─ Entender o que fazer
        └─ Coletar informações

10:15 - Criar Branch (15 min)
        ├─ git checkout -b feature/backend-[page]
        └─ Estar pronto para começar

10:30 - Começar T001 (Análise) - 2h
        ├─ Abrir backend API docs
        ├─ Testar endpoints (Postman)
        ├─ Documentar request/response
        ├─ Criar contracts/ spec
        └─ Commits e push

12:30 - Almoço (30 min)

13:00 - Continuar T001
        ├─ Refinar documentação
        ├─ Código review
        └─ PR criada

17:00 - EOD
        ├─ Fazer commit do dia
        ├─ Push final
        └─ Atualizar issue
```

---

## ✨ Exemplo - Seu Primeiro PR

### Estrutura esperada:

```markdown
# [T001] Analisar Contrato da API - Razão Energética

## O que foi feito
- Endpoints documentados
- Request/response examples coletados
- Códigos de erro identificados
- Arquivo spec criado

## Arquivos modificados/criados
- `contracts/energetic.json` - NEW
- `.github/ANALISE_[pagina].md` - NEW (opcional)

## Testing
- [ ] Endpoints testados em Postman
- [ ] 48 intervalos confirmados

## Checklist
- [x] Documentação clara
- [x] Tech Lead can review
- [x] Pronto para T002 (Service)

## Screenshots (optional)
[Postman screenshot de endpoint]
```

---

## 🎉 Fim de Sprint 1 - Você terá

✅ **7 páginas críticas conectadas ao backend**
✅ **~60 testes criados e passando**
✅ **0 console errors**
✅ **MVP operacional para operadores**
✅ **Documentação completa**
✅ **Experiência de 40+ horas em backend integration**
✅ **Bonus: Padrão reutilizável para Sprint 2 (34 pages)**

---

## 🚀 Ready to Go?

1. ✅ Leu este documento (5 min)
2. ✅ Tem ambiente setup
3. ✅ Sabe seu role (Dev1/2/3)
4. ✅ Conhece seu T### first
5. ✅ Criou branch
6. ✅ Pronto para começar!

**➡️ Próximo passo: Abrir TAREFAS_BACKEND_IMPLEMENTATION.md e começar seu T###**

---

**Boa sorte! 🚀**

Dúvidas? Chamar Tech Lead no Slack.

---

**Documento gerado**: 2025-12-28  
**Versão**: 1.0  
**Tempo para ler**: 5 minutos  
**Tempo para começar**: 30 minutos
