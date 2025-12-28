# 🚀 Guia Rápido de Teste - Dados Energéticos

## 1. Pré-requisitos

- Podman instalado e rodando
- Node.js 18+ instalado
- Portas 5001 (backend) e 5173 (frontend) livres

## 2. Iniciar Ambiente

### Terminal 1: Backend

```bash
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw
./scripts/start-backend.sh
```

**Aguarde ver:**
```
✓ Backend está rodando
✓ SQL Server está rodando

🌐 URLs:
   API: http://localhost:5001/api
   Swagger: http://localhost:5001/swagger

📝 Comandos úteis:
   Ver logs: podman logs -f pdpw-backend
   Parar: cd ONS_PoC-PDPW_V2 && podman-compose down
```

### Terminal 2: Testar APIs (opcional)

```bash
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw
./scripts/test-apis.sh
```

**Deve ver:**
```
🧪 Testando APIs do Backend POC PDPw
...
✓ Todos os testes passaram!
Taxa de sucesso: 100%
```

### Terminal 3: Frontend

```bash
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/frontend

# Primeira vez: instalar dependências
npm install

# Iniciar dev server
npm run dev
```

**Aguarde ver:**
```
  VITE v5.x.x  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 3. Acessar Aplicação

Abra navegador em: **http://localhost:5173**

### Navegar para Dados Energéticos

**Opção 1:** Menu lateral
```
Menu → Coleta de Dados → Elétrica → Energia
```

**Opção 2:** URL direta
```
http://localhost:5173/coleta/eletrica/energia
```

## 4. Testar Fluxo Completo

### Passo 1: Carregar Dropdowns

**O que deve acontecer:**
1. Página carrega
2. ✅ Dropdown "Data PDP" preenchido (próximos 7 dias)
3. ✅ Dropdown "Empresa" preenchido (via API `/api/empresas`)
4. ⚠️ Dropdown "Usinas" desabilitado (aguardando seleção de empresa)

**Abrir DevTools (F12):**
- Aba "Network"
- Filtrar por "empresas"
- Deve ver requisição GET com status 200

### Passo 2: Selecionar Empresa

**Ações:**
1. Selecionar uma data no dropdown "Data PDP"
2. Selecionar uma empresa no dropdown "Empresa"

**O que deve acontecer:**
1. ✅ Requisição GET `/api/usinas/empresa/{empresaId}` (Network tab)
2. ✅ Dropdown "Usinas" habilitado e preenchido
3. ✅ Requisição GET `/api/dados-energeticos/periodo?dataInicio=...&dataFim=...`
4. ✅ Tabela carregada (vazia ou com dados, depende se há dados no BD)

**Se houver erros:**
- Status 404: Empresa/usinas não existem no banco → precisa popular BD
- Status 500: Erro no backend → ver `podman logs -f pdpw-backend`
- CORS error: Verificar configuração CORS no backend

### Passo 3: Visualizar Dados

**Layout esperado:**
```
┌─────────────────────────────────────────────────┐
│ Sistema de Coleta                               │
│ Coleta de Dados Energéticos                     │
├─────────────────────────────────────────────────┤
│ Data PDP: [2025-01-28 ▼]                       │
│ Empresa:  [Empresa Alpha ▼]                    │
│ Usinas:   [Selecione uma Usina ▼]              │
├─────────────────────────────────────────────────┤
│ Tabela: 48 linhas (intervalos) x N colunas     │
│         (usinas)                                │
│                                                 │
│ Intervalo | Horário      | UHE001 | UHE002 |..│
│ ─────────────────────────────────────────────  │
│    1      | 00:00-00:30  |  0.00  |  0.00  |..│
│    2      | 00:30-01:00  |  0.00  |  0.00  |..│
│   ...     | ...          | ...    | ...    |..│
│   48      | 23:30-00:00  |  0.00  |  0.00  |..│
│ ─────────────────────────────────────────────  │
│ TOTAL:                   | 0.00   | 0.00   |..│
│ MÉDIA:                   | 0.00   | 0.00   |..│
└─────────────────────────────────────────────────┘
```

### Passo 4: Editar Dados

**Opção A: Editar uma usina**

1. Selecionar uma usina no dropdown "Usinas" (ex: "UHE001")
2. ✅ Textarea aparece sobreposta na coluna da usina
3. Textarea contém 48 valores separados por `\n`
4. Editar valores (ex: trocar 0.00 por 100.50)
5. Clicar botão "Salvar"

**Opção B: Editar todas as usinas**

1. Selecionar "Todas as Usinas" no dropdown
2. ✅ Textarea aparece cobrindo todas as colunas
3. Textarea contém 48 linhas, cada linha com valores separados por `\t`
4. Exemplo:
   ```
   100.5	200.3	150.0
   105.0	210.5	155.0
   ...
   ```
5. Editar e clicar "Salvar"

### Passo 5: Salvar Dados

**O que deve acontecer:**
1. ✅ Requisição POST `/api/dados-energeticos/bulk` (Network tab)
2. ✅ Payload: array de `CreateDadoEnergeticoDto[]`
3. ✅ Status 200 ou 201
4. ✅ Tabela recarrega automaticamente
5. ✅ Valores atualizados aparecem na tabela
6. ✅ Totais e médias recalculados

**Payload esperado (exemplo):**
```json
[
  {
    "usinaId": "abc-123-def",
    "dataReferencia": "2025-01-28",
    "intervalo": 1,
    "valorMW": 100.5,
    "razaoEnergetica": 100.5,
    "observacao": ""
  },
  {
    "usinaId": "abc-123-def",
    "dataReferencia": "2025-01-28",
    "intervalo": 2,
    "valorMW": 105.0,
    "razaoEnergetica": 105.0,
    "observacao": ""
  }
  // ... 48 registros por usina
]
```

## 5. Casos de Teste

### ✅ Caso 1: Banco de Dados Vazio

**Cenário:** Primeira vez usando o sistema

1. Empresas dropdown vazio → **ERRO**: Backend precisa seed de empresas
2. Usinas dropdown vazio → **NORMAL**: Nenhuma usina cadastrada
3. Tabela vazia → **NORMAL**: Sem dados energéticos

**Solução:**
- Popular banco com empresas/usinas de teste
- Ou criar via Swagger: http://localhost:5001/swagger

### ✅ Caso 2: Backend Offline

**Cenário:** Backend não está rodando

1. Dropdown "Empresas" não carrega
2. Console mostra erro de rede
3. Mensagem de erro aparece na tela

**Validar:**
- Error handling está funcionando
- Usuário vê mensagem amigável

### ✅ Caso 3: Editar e Salvar

**Cenário:** Happy path completo

1. Selecionar data + empresa
2. Dados carregam (ou tabela vazia)
3. Selecionar usina
4. Editar valores no textarea
5. Salvar
6. Ver valores atualizados

**Validar:**
- Totais recalculados corretamente
- Médias corretas (total / 48)
- Não há erros no console

### ✅ Caso 4: Validação de Dados

**Cenário:** Tentar salvar dados inválidos

1. Editar textarea com valores não-numéricos (ex: "abc")
2. Salvar

**Validar:**
- Frontend converte para 0 (via `parseFloat() || 0`)
- Backend valida e retorna 400 se inválido
- Mensagem de erro aparece

## 6. Checklist de Validação

**DevTools Network Tab:**
- [ ] GET `/api/empresas` → 200
- [ ] GET `/api/usinas/empresa/{id}` → 200
- [ ] GET `/api/dados-energeticos/periodo?...` → 200
- [ ] POST `/api/dados-energeticos/bulk` → 200/201

**Console Tab:**
- [ ] Sem erros JavaScript
- [ ] Sem warnings críticos (warnings do React DevTools OK)

**Funcionalidade:**
- [ ] Dropdowns carregam corretamente
- [ ] Tabela exibe dados (ou vazia)
- [ ] Textarea abre ao selecionar usina
- [ ] Salvar atualiza dados
- [ ] Totais/médias calculados

**Error Handling:**
- [ ] Backend offline: mensagem de erro
- [ ] Empresa sem usinas: dropdown desabilitado
- [ ] Dados vazios: tabela com zeros

## 7. Troubleshooting Rápido

### Problema: Dropdown Empresas vazio

**Diagnóstico:**
```bash
curl http://localhost:5001/api/empresas
```

**Se retorna `[]`:**
- Banco está vazio
- Popular via Swagger ou SQL

**Se retorna erro:**
- Backend não está rodando
- Verificar `podman ps`

### Problema: CORS Error

**Sintoma:** Console mostra erro de CORS

**Solução:**
Verificar `ONS_PoC-PDPW_V2/src/PDPW.API/Program.cs`:
```csharp
app.UseCors("AllowAll");
```

### Problema: Dados não salvam

**Diagnóstico:**
1. Abrir Network tab
2. Clicar Salvar
3. Ver payload do POST

**Se status 400:**
- DTO inválido
- Ver resposta do backend

**Se status 500:**
- Erro no backend
- Ver `podman logs -f pdpw-backend`

## 8. Próximos Testes

Após validar Dados Energéticos:

1. Repetir para **Dados Elétricos** (`/coleta/eletrica/programacao-eletrica`)
2. Repetir para **Cargas** (`/coleta/carga/carga`)
3. Testar **Ofertas Exportação** (mais complexo, tem workflow)

---

**Dúvidas?** Consultar:
- [PROGRESSO_INTEGRACAO.md](PROGRESSO_INTEGRACAO.md)
- [INTEGRACAO_FRONTEND_BACKEND.md](INTEGRACAO_FRONTEND_BACKEND.md)
- Swagger: http://localhost:5001/swagger
