# Progresso da Integração Frontend-Backend

## 📊 Resumo Executivo

**Data:** 2025-01-27
**Status Geral:** 🔄 Em Progresso
**Páginas Integradas:** 1/7 (14%)
**Serviços Criados:** 7/7 (100%)

## ✅ Concluído

### 1. Infraestrutura

- ✅ API Client (`apiClient.ts`)
  - Fetch-based com error handling
  - ApiClientError class
  - Base URL: `http://localhost:5001/api`
  - Environment variable: `VITE_API_BASE_URL`

- ✅ Serviços de Integração
  - `energeticService.ts` - Dados Energéticos
  - `electricalService.ts` - Dados Elétricos
  - `ofertaExportacaoService.ts` - Ofertas Exportação
  - `cargaService.ts` - Cargas Elétricas
  - `ofertaRespostaVoluntariaService.ts` - Resposta Voluntária
  - `empresaService.ts` - Empresas
  - `usinaService.ts` - Usinas

- ✅ Scripts e Documentação
  - `start-backend.sh` - Startup automation (Podman)
  - `INTEGRACAO_FRONTEND_BACKEND.md` - Integration guide
  - `.env.development` - API base URL config

### 2. Páginas Integradas

#### ✅ Dados Energéticos (Razão Energética Transformada)

**Rota:** `/coleta/eletrica/energia`
**Componente:** `Energetic.tsx`
**Serviço:** `energeticService.ts`
**API:** `/api/dados-energeticos`

**Alterações Realizadas:**
- ✅ Removidas props `onLoadData` e `onSave` (era prop-driven, agora self-contained)
- ✅ Importado `energeticService`, `empresaService`, `usinaService`
- ✅ Estado de empresas: `useState<Empresa[]>([])` + `useEffect` com `empresaService.getAll()`
- ✅ Estado de usinas: `useState<Usina[]>([])` + `useEffect` com `usinaService.getByEmpresa()`
- ✅ Estado de datas PDP: geradas no frontend (próximos 7 dias)
- ✅ `handleLoadData()`: chama `energeticService.getByPeriod()` e converte DTOs para formato do componente
- ✅ `handleSave()`: converte dados do componente para `CreateDadoEnergeticoDto[]` e chama `energeticService.bulkUpsert()`
- ✅ Render: atualizado para usar `empresa.codigo`, `empresa.nome`, `usina.codigo`, `usina.nome`
- ✅ Sem erros de compilação (verificado com `get_errors`)

**Testado:**
- ⏳ Pendente teste manual com backend rodando

## 🔄 Em Progresso

### 3. Próximas Páginas a Integrar

#### 2️⃣ Dados Elétricos (Razão Elétrica Transformada)

**Rota:** `/coleta/eletrica/programacao-eletrica`
**Componente:** `ProgramacaoEletrica.tsx`
**Serviço:** ✅ `electricalService.ts` (criado)
**API:** `/api/dados-eletricos`
**Status:** ⏳ Mockado

**Plano:**
1. Verificar estrutura do componente (similar a Energetic.tsx)
2. Remover props mockadas
3. Importar `electricalService`, `empresaService`, `usinaService`
4. Atualizar `handleLoadData()` → `electricalService.getByPeriod()`
5. Atualizar `handleSave()` → `electricalService.bulkUpsert()`
6. Atualizar render para usar objetos Empresa/Usina
7. Testar com backend

#### 3️⃣ Ofertas de Exportação de Energia Térmica

**Rota:** `/coleta/termico/oferta-exportacao`
**Componente:** `ExportOffer.tsx`
**Serviço:** ✅ `ofertaExportacaoService.ts` (criado)
**API:** `/api/ofertas-exportacao`
**Status:** ⏳ Mockado

**Complexidade:** 🔴 Alta (workflow com ONS)

**Plano:**
1. Verificar estrutura do componente (form + grid de ofertas)
2. Remover dados mockados
3. Importar `ofertaExportacaoService`, `empresaService`, `usinaService`
4. Grid: usar `getByEmpresa()` ou `getByDataPDP()` ou `getPendentes()`
5. Formulário: usar `create()` para nova oferta
6. Adicionar botão "Enviar" → `enviar(id)` (muda status para aguardando ONS)
7. **Se usuário é ONS**: adicionar botões "Aprovar"/"Rejeitar" → `aprovar(id)` / `rejeitar(id)`
8. Adicionar coluna "Status" no grid (enum: PENDENTE | APROVADA | REJEITADA)
9. Testar workflow completo

**DTOs:**
```typescript
interface OfertaExportacao {
  id: number;
  usinaId: string;
  empresaId: string;
  dataPDP: string;
  tipoPrograma: string;
  statusONS: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  dataEnvio?: string;
  dataAnalise?: string;
  observacaoONS?: string;
  intervalos: IntervaloPotencia[]; // 48 intervalos
}

interface IntervaloPotencia {
  intervalo: number; // 1-48
  potenciaOfertadaMW: number;
  potenciaAprovadaMW?: number; // preenchido por ONS
}
```

#### 4️⃣ Cargas Elétricas

**Rota:** `/coleta/carga/carga`
**Componente:** `Load.tsx`
**Serviço:** ✅ `cargaService.ts` (criado)
**API:** `/api/cargas`
**Status:** ⏳ Mockado

**Plano:**
1. Similar a Energetic.tsx, mas com Subsistemas ao invés de Usinas
2. Importar `cargaService`
3. Dropdowns: Data + Subsistema (SUDESTE, SUL, NORDESTE, NORTE)
4. `handleLoadData()` → `cargaService.getBySubsistema()` ou `getByDataReferencia()`
5. Grid: 48 intervalos x cargaMW
6. Tipo de Carga: dropdown (PREVISTA | REALIZADA | ESTIMADA)
7. `handleSave()` → `cargaService.bulkUpsert()`

#### 5️⃣ Previsão Eólica

**Rota:** `/coleta/eletrica/previsao-eolica`
**Componente:** ✅ `PrevisaoEolica.tsx` (existe)
**Serviço:** ✅ `previsaoEolicaService.ts` (já existe)
**API:** `/api/previsoes-eolicas`
**Status:** ⏳ Parcialmente integrado

**Plano:**
1. Verificar se já usa `previsaoEolicaService`
2. Se mockado, refatorar similar a Energetic.tsx
3. Adicionar dropdown "Modelo" (NWP, MOS, Ensemble, Persistência, etc.)
4. Filtrar usinas por tipo = 'EOLICA'
5. `handleLoadData()` → `previsaoEolicaService.getByUsina()` ou `getByModelo()`
6. Grid: 48 intervalos x potênciaPrevistaMW
7. `handleSave()` → verificar endpoint de bulk no serviço

#### 6️⃣ Resposta Voluntária da Demanda

**Rota:** `/coleta/demanda/resposta-voluntaria` (a criar)
**Componente:** ❌ Não existe (precisa criar)
**Serviço:** ✅ `ofertaRespostaVoluntariaService.ts` (criado)
**API:** `/api/ofertas-resposta-voluntaria`
**Status:** ❌ Página não migrada

**Plano:**
1. Criar componente `VoluntaryResponse.tsx`
2. Form: Data PDP, Empresa, Tipo Programa, Redução Carga MW, Hora Início/Fim, Preço Ofertado R$, Observação
3. Grid: Lista de ofertas da empresa com colunas (ID, Data PDP, Redução MW, Horário, Preço, Status ONS, Ações)
4. Botão "Nova Oferta" → `create()`
5. Botão "Enviar" (se PENDENTE) → `enviar(id)`
6. **Se usuário é ONS**: botões "Aprovar"/"Rejeitar" → `aprovar(id)` / `rejeitar(id)`
7. Filtros: `getByEmpresa()`, `getByDataPDP()`, `getPendentes()`, `getAprovadas()`, `getRejeitadas()`
8. Adicionar rota no `App.tsx`
9. Adicionar item no menu lateral

#### 7️⃣ Energia Vertida Turbinável

**Rota:** `/coleta/hidraulico/energia-vertida` (a criar)
**Componente:** ❌ Não existe
**Serviço:** ❌ Não criado (verificar se existe controller no backend)
**API:** ❓ Verificar se `/api/energia-vertida` existe
**Status:** ❌ Página não migrada, controller não encontrado

**Plano:**
1. **PRIMEIRO**: Buscar no backend por "vertida", "spillable", "turbinavel"
2. **SE não existe controller**: criar no backend primeiro
3. Criar serviço `energiaVertidaService.ts`
4. Criar componente `SpillableEnergy.tsx`
5. Form: Data PDP, Usina Hidráulica, Reservatório
6. Grid: 48 intervalos x vertimentoMWh (ou MWmed)
7. Similar a Energetic.tsx mas para usinas hidráulicas apenas

## 📋 Checklist de Integração por Página

Para cada página a ser integrada, seguir:

1. **Preparação**
   - [ ] Ler componente existente (se migrado) ou criar novo
   - [ ] Verificar se serviço existe, senão criar
   - [ ] Verificar endpoints da API no backend (via Swagger)
   - [ ] Listar dependências (empresas, usinas, subsistemas, etc.)

2. **Refatoração do Componente**
   - [ ] Remover props `onLoadData` / `onSave` (tornar self-contained)
   - [ ] Importar serviços necessários
   - [ ] Criar estados para dados das APIs (`useState`)
   - [ ] Adicionar `useEffect` para carregar dados iniciais (empresas, usinas, etc.)
   - [ ] Atualizar `handleLoadData()` para chamar serviço real
   - [ ] Atualizar `handleSave()` para chamar serviço real (preferir bulk quando disponível)
   - [ ] Atualizar render para usar objetos da API (não strings)
   - [ ] Adicionar error handling com `try/catch` e `setError()`
   - [ ] Adicionar loading states (`setIsLoading(true/false)`)

3. **Validação**
   - [ ] Verificar erros de compilação (`get_errors`)
   - [ ] Verificar rota no `App.tsx`
   - [ ] Iniciar backend com `./scripts/start-backend.sh`
   - [ ] Iniciar frontend com `npm run dev`
   - [ ] Testar carregamento de dropdowns
   - [ ] Testar carregamento de dados
   - [ ] Testar salvamento de dados
   - [ ] Verificar Network tab no DevTools (status 200, payloads corretos)
   - [ ] Verificar console para erros JavaScript
   - [ ] Testar casos de erro (backend offline, dados inválidos)

## 🔧 Comandos Úteis

### Backend

```bash
# Iniciar backend
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw
./scripts/start-backend.sh

# Ver logs do backend
podman logs -f pdpw-backend

# Ver logs do SQL Server
podman logs -f pdpw-sqlserver

# Parar backend
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/ONS_PoC-PDPW_V2
podman-compose down

# Status dos containers
podman ps
```

### Frontend

```bash
# Instalar dependências
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/frontend
npm install

# Iniciar dev server
npm run dev

# Build produção
npm run build

# Verificar erros TypeScript
npx tsc --noEmit
```

### Testes

```bash
# Rodar testes
npm run test

# Cobertura
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🐛 Troubleshooting

### Backend não inicia

1. Verificar se Podman está instalado: `podman --version`
2. Verificar se porta 5001 está livre: `lsof -i :5001`
3. Ver logs do container: `podman logs pdpw-backend`
4. Reiniciar Podman: `systemctl restart podman` ou `sudo systemctl restart podman.socket`

### CORS errors no navegador

- Backend deve estar configurado com `AllowAnyOrigin()` em `Program.cs`
- Verificar em `/mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/ONS_PoC-PDPW_V2/src/PDPW.API/Program.cs`:
  ```csharp
  builder.Services.AddCors(options =>
  {
      options.AddPolicy("AllowAll", policy =>
      {
          policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
      });
  });
  ```

### Dados não aparecem

1. Verificar Network tab (F12 → Network)
2. Verificar se request foi feito (status 200, 201, 204)
3. Verificar payload da resposta (deve ter dados, não vazio)
4. Verificar console para erros JavaScript
5. Verificar se conversão DTO → Componente está correta
6. Adicionar `console.log()` em `handleLoadData()` para debug

### Erro ao salvar

1. Verificar payload do POST/PUT no Network tab
2. Verificar se DTO está no formato correto (campos obrigatórios preenchidos)
3. Verificar resposta do backend (400 Bad Request = validação falhou, 500 = erro servidor)
4. Ver logs do backend: `podman logs -f pdpw-backend`

## 📚 Referências

- [PLANO_MIGRACAO.md](/mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/PLANO_MIGRACAO.md) - Status de migração das 142 páginas
- [INTEGRACAO_FRONTEND_BACKEND.md](/mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/INTEGRACAO_FRONTEND_BACKEND.md) - Guia de integração e endpoints
- [Swagger UI](http://localhost:5001/swagger) - Documentação interativa da API (backend deve estar rodando)
- [ONS_PoC-PDPW_V2/src/PDPW.API/Controllers/](file:///mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/ONS_PoC-PDPW_V2/src/PDPW.API/Controllers) - Código-fonte dos controllers

## 🎯 Metas

- **Curto prazo (esta semana):**
  - ✅ Integrar Dados Energéticos (concluído)
  - 🔄 Integrar Dados Elétricos
  - 🔄 Integrar Cargas
  
- **Médio prazo (próximas 2 semanas):**
  - Integrar Ofertas Exportação (com workflow ONS)
  - Integrar Previsão Eólica
  - Criar página Resposta Voluntária
  
- **Longo prazo (próximo mês):**
  - Verificar/criar Energia Vertida
  - Integrar todas IR1-IR4 (Insumos)
  - Integrar Finalização da Programação
  - Integrar Geração de Arquivos para Modelos (DADGER, DESSEM)
  - Testes end-to-end completos

---

**Última atualização:** 2025-01-27 - Energetic.tsx integrado
