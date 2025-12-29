# 🎯 Tarefas de Implementação - Conexão Backend PDPw

**Status**: Documento gerado para planejamento de sprints  
**Data**: 2025-12-28  
**Prioridade**: P1 (Críticas) → P2 (Altas) → P3+ (Médias/Baixas)

---

## 📋 Resumo Executivo

Este documento organiza as tarefas de **conexão com o backend** em 3 categorias:
1. **🔴 Rotinas Críticas (P1)** - 7 páginas já migradas, precisam conexão urgente
2. **🟡 Páginas Migradas (P2)** - 34 páginas já migradas, conexão com backend
3. **🔵 Páginas Pendentes (P3+)** - 7+ páginas não migradas, migração + conexão

Cada tarefa segue o pipeline: **Analisar contrato → Criar serviço → Criar hooks → Integrar na página → Testes**

---

# 🔴 FASE 1: ROTINAS CRÍTICAS (P1 - MÁXIMA PRIORIDADE)

## 1.1 Razão Energética (frmColEnergetica.aspx)

### Página
- **Arquivo**: `frontend/src/pages/Collection/Energetic/Energetic.tsx`
- **Status**: ✅ Migrada | ⏳ Backend Pendente
- **Complexidade**: Média (Grid 48 intervalos + cálculos)

### T001: Analisar Contrato da API - Razão Energética
**Tipo**: Research/Analysis  
**Descrição**:
```
Analisar o contrato da API para Razão Energética conforme documentado em:
- contracts/critical-routines.md (se existir)
- Backend API: POST/GET /api/dadosenergeticos

Tarefas específicas:
1. Identificar endpoints disponíveis (GET all, GET by ID, POST create, PUT update, DELETE)
2. Documentar estrutura de request (headers, body, params)
3. Documentar estrutura de response (campos, tipos, datas)
4. Identificar códigos de erro esperados (400, 404, 409, 500)
5. Validar 48 intervalos de meia hora por dia
6. Testar endpoints com Postman/Insomnia
7. Criar arquivo contracts/energetic.json com especificação completa

Referências:
- PLANO_TAREFAS_BACKEND.md: Section 1.1.1
- ANALISE_ROTINAS_CRITICAS.md: Section 1.1
```

**Critério de Aceitação**:
- [ ] Endpoints mapeados e documentados
- [ ] Estrutura de dados entendida
- [ ] Códigos de erro identificados
- [ ] 48 intervalos confirmados em teste real

---

### T002: Criar Serviço de API - Razão Energética
**Tipo**: Implementation  
**Descrição**:
```
Criar arquivo frontend/src/services/energeticService.ts com operações CRUD

Requisitos:
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

Padrão de implementação:
\`\`\`typescript
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
\`\`\`

Arquivo: frontend/src/services/energeticService.ts
Tipos referenciados: frontend/src/types/energetic.ts
```

**Critério de Aceitação**:
- [ ] Arquivo criado com 6 funções CRUD + bulkUpsert
- [ ] Todas as funções com error handling
- [ ] Todas as funções com DTO transformation
- [ ] TypeScript types corretos
- [ ] Sem erros de compilação

---

### T003: Criar Hooks React Query - Razão Energética
**Tipo**: Implementation  
**Descrição**:
```
Criar arquivo frontend/src/hooks/useEnergeticData.ts com hooks React Query

Requisitos:
1. useEnergeticData(date?: string)
   - useQuery com staleTime: 5 minutos
   - Retorna { data, isLoading, error, refetch }
   
2. useEnergeticDataByPeriod(startDate: string, endDate: string)
   - useQuery parametrizado por período
   - Cache key: ['energetic', startDate, endDate]

3. useCreateEnergeticData()
   - useMutation com energeticService.create
   - Invalida cache de ['energetic']

4. useUpdateEnergeticData()
   - useMutation com energeticService.update
   - Invalida cache de ['energetic']

5. useDeleteEnergeticData()
   - useMutation com energeticService.delete
   - Invalida cache de ['energetic']

6. useBulkUpsertEnergeticData()
   - useMutation para 48 intervalos
   - Invalida cache de ['energetic']

7. useEnergeticDataManager()
   - Hook combinado com todas as operações
   - Retorna { data, isLoading, error, create, update, delete, bulkUpsert, refetch, ... }

Padrão QueryClient:
\`\`\`typescript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: energeticService.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['energetic'] });
  },
});
\`\`\`

Arquivo: frontend/src/hooks/useEnergeticData.ts
```

**Critério de Aceitação**:
- [ ] 7 hooks criados (5 queries + 1 mutation + 1 manager)
- [ ] Todos com error handling
- [ ] Cache invalidation configurado
- [ ] TypeScript types corretos
- [ ] Sem erros de compilação

---

### T004: Conectar Componente à API - Razão Energética
**Tipo**: Implementation  
**Descrição**:
```
Conectar página Energetic.tsx ao hook useEnergeticDataManager()

Requisitos:
1. Substituir dados mockados por dados reais
2. Importar useEnergeticDataManager em Energetic.tsx
3. Chamar hook: const manager = useEnergeticDataManager()
4. Implementar UI de loading (spinner ou skeleton)
   - Mostrar quando manager.isLoading === true
   - Esconder grid de dados
   
5. Implementar UI de erro (alert com retry)
   - Mostrar quando manager.error existe
   - Botão "Tentar novamente" chama manager.refetch()
   - Mostrar mensagem de erro traduzida em português
   
6. Implementar UI de sucesso (grid de dados)
   - Passar manager.data para componente grid
   - Grid deve ter 48 linhas (intervalos)
   
7. Implementar save/edit
   - Botão "Salvar" chama manager.bulkUpsert(newData)
   - Mostrar loading enquanto isBulkUpserting === true
   - Mostrar mensagem de sucesso
   - Refetch automático após sucesso
   
8. Implementar validações
   - Mostrar erros de validação (campos inválidos)
   - Desabilitar botão save se há erros
   - Usar validação do serviço + UI

Antes:
\`\`\`typescript
// Mock data hardcoded
const [data, setData] = useState(mockData);
\`\`\`

Depois:
\`\`\`typescript
const manager = useEnergeticDataManager();

if (manager.isLoading) return <LoadingSkeleton />;
if (manager.error) return <ErrorAlert error={manager.error} onRetry={manager.refetch} />;

return (
  <DataGrid 
    data={manager.data}
    onSave={(newData) => manager.bulkUpsert(newData)}
    isLoading={manager.isBulkUpserting}
  />
);
\`\`\`

Arquivo: frontend/src/pages/Collection/Energetic/Energetic.tsx
```

**Critério de Aceitação**:
- [ ] Mock data removido
- [ ] Hook conectado
- [ ] Estados implementados (loading, error, success)
- [ ] Save/edit funcionando
- [ ] Validações funcionando
- [ ] Sem erros de compilação

---

### T005: Criar Testes - Razão Energética (Serviço)
**Tipo**: Testing  
**Descrição**:
```
Criar testes para energeticService.ts

Arquivo: frontend/tests/services/energeticService.test.ts

Testes necessários:

1. Testes de sucesso:
   - getAll() retorna array de dados
   - getById(id) retorna dados transformados (camelCase, datas)
   - create() transforma request e response
   - update() transforma request e response
   - delete() remove item
   - bulkUpsert(48 intervalos) retorna array completo
   
2. Testes de erro HTTP:
   - getAll() com 500 → normalizeError() chamado
   - create() com 400 (validação) → erro com campos inválidos
   - getById() com 404 → erro not found
   - update() com 409 (conflito) → erro conflict
   - delete() com 500 → erro server
   
3. Testes de erro de rede:
   - Timeout → createTimeoutError()
   - Sem conexão → createNetworkError()
   
4. Testes de transformação:
   - Response com ISO date → transformado para Date object
   - Request com camelCase → transformado para PascalCase
   - Campos null/undefined preservados
   
5. Testes de edge cases:
   - bulkUpsert com menos de 48 intervalos
   - bulkUpsert com mais de 48 intervalos (deve cortar)
   - intervalos com valores limites (0, 999999)
   - Observação vazia vs null

Mock com MSW (Mock Service Worker):
\`\`\`typescript
import { mockEndpoint, mockErrorEndpoint } from '../setup/mswServer';

beforeEach(() => {
  mockEndpoint('get', '/api/dadosenergeticos', mockData);
});

it('should get all energetic data', async () => {
  const result = await energeticService.getAll();
  expect(result).toEqual(transformedMockData);
});
\`\`\`

Cobertura: Mínimo 30 testes
```

**Critério de Aceitação**:
- [ ] 30+ testes criados
- [ ] Todos os casos de sucesso cobertos
- [ ] Todos os casos de erro cobertos
- [ ] Edge cases cobertos
- [ ] Todos os testes passando
- [ ] Cobertura >= 80%

---

### T006: Criar Testes - Razão Energética (Hooks)
**Tipo**: Testing  
**Descrição**:
```
Criar testes para useEnergeticData.ts hooks

Arquivo: frontend/tests/hooks/useEnergeticData.test.ts

Testes necessários (usando renderHook + QueryClient):

1. useEnergeticData():
   - Estado inicial: isLoading = true
   - Após sucesso: data preenchido, isLoading = false
   - Em caso de erro: error preenchido, data vazio
   - Refetch funciona
   
2. useEnergeticDataByPeriod(start, end):
   - Busca com período específico
   - Cache key diferente por período
   - Múltiplos períodos simultâneos funcionam

3. useCreateEnergeticData():
   - mutate(data) envia request
   - isLoading durante request
   - onSuccess invalida cache
   - onError captura erro
   
4. useUpdateEnergeticData():
   - mutate(id, data) envia request
   - Cache invalidado após sucesso
   
5. useDeleteEnergeticData():
   - mutate(id) envia request
   - Cache invalidado após sucesso
   
6. useBulkUpsertEnergeticData():
   - mutate(array de 48 intervalos) funciona
   - Dados agregados corretamente
   - Cache invalidado
   
7. useEnergeticDataManager():
   - Retorna interface combinada
   - Todos os métodos disponíveis
   - Estados agregados corretamente

Padrão de teste:
\`\`\`typescript
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';

it('should load energetic data', async () => {
  const { result } = renderHook(() => useEnergeticData(), {
    wrapper: QueryClientProvider,
  });
  
  expect(result.current.isLoading).toBe(true);
  
  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeDefined();
  });
});
\`\`\`

Cobertura: Mínimo 15 testes
```

**Critério de Aceitação**:
- [ ] 15+ testes criados
- [ ] Todos os hooks testados
- [ ] Estados de loading/error/success cobertos
- [ ] Cache invalidation testado
- [ ] Todos os testes passando
- [ ] Cobertura >= 80%

---

### T007: Criar Testes - Razão Energética (Componente)
**Tipo**: Testing  
**Descrição**:
```
Criar testes para componente Energetic.tsx

Arquivo: frontend/tests/pages/Energetic.test.tsx

Testes necessários (mockar hook useEnergeticDataManager):

1. Estados de UI:
   - Loading: skeleton/spinner visível
   - Erro: mensagem de erro + botão retry
   - Sucesso: grid de 48 intervalos
   
2. Interações:
   - Clicar em célula de intervalo abre editor
   - Editar valor e clicar save
   - Verificar que mutate foi chamado
   - Verificar loading durante save
   - Mensagem de sucesso após save
   
3. Retry:
   - Clicar em retry chama refetch
   
4. Validações:
   - Campo inválido mostra erro
   - Botão save desabilitado com erro
   - Erro desaparece ao corrigir

Padrão de mock:
\`\`\`typescript
import { vi } from 'vitest';

vi.mock('../../src/hooks/useEnergeticData', () => ({
  useEnergeticDataManager: vi.fn(() => ({
    data: mockData,
    isLoading: false,
    error: null,
    bulkUpsert: vi.fn(),
    refetch: vi.fn(),
    // ...
  })),
}));

it('should render grid with data', () => {
  render(<Energetic />);
  expect(screen.getByText('Interval 1')).toBeInTheDocument();
});
\`\`\`

Cobertura: Mínimo 10 testes
```

**Critério de Aceitação**:
- [ ] 10+ testes criados
- [ ] Todos os estados de UI testados
- [ ] Interações testadas
- [ ] Validações testadas
- [ ] Todos os testes passando
- [ ] Cobertura >= 85%

---

### T008: Criar Teste de Integração - Razão Energética
**Tipo**: Integration Testing  
**Descrição**:
```
Criar teste de integração completo para fluxo Energetic

Arquivo: frontend/tests/integration/energetic-flow.test.tsx

Cenários de teste:

1. Fluxo completo de sucesso:
   - Página carrega
   - useEnergeticDataManager() busca dados
   - Grid mostra 48 intervalos
   - Usuário edita intervalo 1: 100 → 120
   - Usuário clica save
   - bulkUpsert() envia 48 intervalos
   - MSW retorna 201 Created
   - Mensagem de sucesso aparece
   - Cache invalidado e refetch automático
   
2. Fluxo com erro de rede:
   - Página carrega
   - MSW retorna 500
   - Erro visível com mensagem
   - Usuário clica retry
   - MSW agora retorna sucesso
   - Página recarrega com dados
   
3. Fluxo com validação:
   - Página carrega
   - Usuário edita intervalo com valor inválido
   - Tentativa de save
   - MSW retorna 400 com erro de validação
   - Erro em campo específico
   - Usuário corrige
   - Save funciona
   
4. Fluxo de múltiplas edições:
   - Página carrega
   - Usuário edita 3 intervalos diferentes
   - Save manda todos os 48
   - Verificar que todos foram modificados
   - Cache invalido traz dados atualizados

Padrão de teste:
\`\`\`typescript
describe('Energetic Flow - Integration', () => {
  it('should complete full user flow', async () => {
    // Setup
    mockEndpoint('get', '/api/dadosenergeticos', mockData);
    mockEndpoint('post', '/api/dadosenergeticos/bulk', updatedData, { status: 201 });
    
    // Render
    render(<Energetic />);
    
    // Wait for load
    await waitFor(() => {
      expect(screen.getByText('Interval 1')).toBeInTheDocument();
    });
    
    // Edit
    const input = screen.getByDisplayValue('100');
    await userEvent.clear(input);
    await userEvent.type(input, '120');
    
    // Save
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    
    // Verify
    await waitFor(() => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });
  });
});
\`\`\`

Cobertura: Mínimo 4 cenários
```

**Critério de Aceitação**:
- [ ] 4+ cenários de integração testados
- [ ] Fluxo de sucesso completo
- [ ] Fluxo de erro com retry
- [ ] Fluxo de validação
- [ ] Fluxo de múltiplas edições
- [ ] Todos os testes passando
- [ ] MSW endpoints mockados corretamente

---

### T009: Atualizar Checklist - Razão Energética
**Tipo**: Documentation  
**Descrição**:
```
Atualizar arquivo CHECKLIST_MIGRACAO.md com status de Razão Energética

Requisitos:
1. Adicionar seção "## Razão Energética - Backend Connection"
2. Preencherblocos de validação:

### Service Layer (8 points)
- [x] CRUD operations implemented
- [x] Error handling (normalizeError)
- [x] DTO transformation (transformFromApi/ToApi)
- [x] Response normalization
- [x] Retry logic via hook refetch
- [x] Bulk operations (bulkUpsert 48 intervalos)
- [x] 100% test coverage service
- [x] Network error handling

### Hook Layer (8 points)
- [x] React Query useQuery implemented
- [x] React Query useMutation implemented
- [x] Loading states (isLoading, isFetching)
- [x] Error states with error messages
- [x] Success states with data
- [x] Cache management + invalidation
- [x] 100% test coverage hooks
- [x] Multiple query scenarios

### Component Layer (8 points)
- [x] Component uses hooks exclusively
- [x] Loading state UI (skeleton/spinner)
- [x] Error state UI (alert + retry)
- [x] Success state UI (grid)
- [x] Edit/save functionality
- [x] Validation display
- [x] 100% test coverage component
- [x] 48 intervalos processados

### Integration (6 points)
- [x] Full user flow tested (load → edit → save → verify)
- [x] Error scenarios covered (500, 400, network)
- [x] Edge cases handled (empty, null, boundaries)
- [x] Performance validated (< 2s API calls)
- [x] Accessibility validated (WCAG 2.1 AA)
- [x] Responsive design verified

### Data & Business Logic (6 points)
- [x] All 48 intervals fetch correctly
- [x] Bulk edit/save works for all intervals
- [x] Calculations correct (total, average)
- [x] Date/Company/Usina cascades
- [x] Validation rules applied
- [x] Error messages in Portuguese

TOTAL: 36/36 points ✅ PASS

Status: Razão Energética - ✅ BACKEND CONNECTED
Data: 2025-12-28
Desenvolvedor: [Nome]
```

**Critério de Aceitação**:
- [ ] Checklist atualizado
- [ ] Todos os 36 pontos preenchidos
- [ ] Marcado como PASS
- [ ] Data e desenvolvedor documentados

---

## 1.2 Razão Elétrica (frmColEletrica.aspx)

### Página
- **Arquivo**: `frontend/src/pages/Collection/Electrical/Electrical.tsx`
- **Status**: ✅ Migrada | ⏳ Backend Pendente
- **Complexidade**: Média (Grid 48 intervalos + edição por usina)

### T010-T018: Roteiro completo para Razão Elétrica
**Tipo**: Epic com 9 tasks

Seguir o mesmo padrão de T001-T009 (Razão Energética), mas com:
- **Particularidade**: Permite edição por usina específica OU todos os usinas
- **Endpoints**: `/api/dadoseletricos`
- **Service**: `frontend/src/services/electricalService.ts`
- **Hooks**: `frontend/src/hooks/useElectricalData.ts`
- **Componente**: `frontend/src/pages/Collection/Electrical/Electrical.tsx`
- **Testes**: `electricalService.test.ts`, `useElectricalData.test.ts`, `Electrical.test.tsx`
- **Integração**: `electrical-flow.test.tsx`

**Tarefas mapeadas**:
- T010: Analisar contrato da API
- T011: Criar serviço
- T012: Criar hooks
- T013: Conectar componente
- T014: Testes serviço
- T015: Testes hooks
- T016: Testes componente
- T017: Testes integração
- T018: Atualizar checklist

---

## 1.3-1.7: IR1, IR2, IR3, IR4, Oferta Exportação

### Mapeamento rápido

| Página | Rota | T# | Endpoints | Particularidade |
|--------|------|----|-----------|----|
| **IR1 - Nível de Partida** | `frontend/src/pages/Collection/Insumos/IR1.tsx` | T019-T027 | `/api/insumos-recebimento/ir1` | 24 intervalos horários |
| **IR2 - Dia -1** | `frontend/src/pages/Collection/Insumos/IR2.tsx` | T028-T036 | `/api/insumos-recebimento/ir2` | 24 intervalos horários |
| **IR3 - Dia -2** | `frontend/src/pages/Collection/Insumos/IR3.tsx` | T037-T045 | `/api/insumos-recebimento/ir3` | 24 intervalos horários |
| **IR4 - Carga ANDE** | `frontend/src/pages/Collection/Insumos/IR4.tsx` | T046-T054 | `/api/insumos-recebimento/ir4` | 24 intervalos horários |
| **Oferta Exportação** | `frontend/src/pages/Collection/Thermal/ExportOffer.tsx` | T055-T063 | `/api/ofertas-exportacao` | 48 intervalos + validações |

**Cada página**: 9 tasks (análise → serviço → hooks → componente → 3 testes → checklist)

---

# 🟡 FASE 2: PÁGINAS MIGRADAS (P2 - ALTA PRIORIDADE)

## 2.1-2.6: Dados de Coleta

### Páginas a Conectar (34 páginas)

| Domínio | Páginas | Quantidade | API Base |
|---------|---------|-----------|----------|
| **Hidráulicos** | Vazão, Volume, Disponibilidade, Balanço, | 4 | `/api/dados-hidraulicos` |
| **Térmicos** | Geração, Inflexibilidade, Mod.Op., Desp.Inflexibilidade, Exportação, + 2 others | 7 | `/api/dados-termicos` |
| **Intercâmbio** | Intercâmbio, Importação, + others | 3 | `/api/intercambio` |
| **Carga** | Carga, Consumo, + others | 3 | `/api/carga` |
| **Restrições & Manutenção** | 6 páginas | 6 | `/api/restricoes`, `/api/manutencao` |
| **Outros Dados** | Rampa, GEC, GES, SOM, DCA, DCR, etc | 11 | `/api/coleta/*` |
| **TOTAL** | | **34** | |

### Modelo de Tarefa por Domínio

Para cada **domínio** (Hidráulicos, Térmicos, Intercâmbio, Carga, Restrições, Outros):

**T###: Criar Service + Hooks para [DOMÍNIO]**
```
Criar frontend/src/services/[dominio]Service.ts com CRUD
- Exemplo: hydraulicService.ts, thermalService.ts, etc
- Padrão: error handling + DTO transformers
- Cobertura: todos os endpoints listados

Exemplo para Hidráulicos:
- getFlowData(date, company, plant)
- getVolumeData(date, company, plant)
- getAvailability(date, company, plant)
- Padrão comum: getByDateAndEntity(date, entityId, entityType)
```

**T###: Criar Hooks para [DOMÍNIO]**
```
Criar frontend/src/hooks/use[Dominio]Data.ts
- useFlow(), useVolume(), useAvailability() (queries)
- useCreateFlow(), useUpdateFlow(), useDeleteFlow() (mutations)
- Padrão: cache por { date, entityId, entityType }
- Stale time: 5 minutos
```

**T###: Conectar Páginas de [DOMÍNIO]**
```
Para cada página do domínio:
- Remover mock data
- Importar useData hook
- Implementar loading/error/success states
- Conectar form cascade (Data → Empresa → Entidade)
- Conectar save button
```

**T###: Testes [DOMÍNIO]** (Service, Hooks, Components)
```
- Service tests: CRUD + errors + edge cases
- Hook tests: loading, error, success states
- Component tests: UI rendering + interactions
- Integration tests: full user flow
```

---

# 🔵 FASE 3: PÁGINAS PENDENTES (P3 - MÉDIA PRIORIDADE)

## 3.1-3.7: Páginas Críticas não Migradas

| Página | Status | Complexidade | T# | Tarefas |
|--------|--------|--------------|----|----|
| **Previsão Eólica** | ❌ Não Migrada | Média | T150-T158 | Migrar + Backend (9) |
| **Ger. Arquivos** | ❌ Não Migrada | Alta | T159-T167 | Migrar + Backend (9) |
| **Ger. Modelos** | ❌ Não Migrada | Alta | T168-T176 | Migrar + Backend (9) |
| **Finalização** | ❌ Não Migrada | Alta | T177-T185 | Migrar + Backend (9) |
| **Prog. Diária** | ❌ Não Migrada | Alta | T186-T194 | Migrar + Backend (9) |
| **Oferta RVD** | ❌ Não Migrada | Média | T195-T203 | Migrar + Backend (9) |
| **Energia Vertida** | ❌ Não Migrada | Média | T204-T212 | Migrar + Backend (9) |

### Modelo de Tarefa por Página Pendente

**T###: Migrar [PÁGINA] - Análise**
```
Analisar página legada em pdpw_act

Requisitos:
1. Abrir arquivo pdpw_act/frm[Pagina].aspx
2. Abrir arquivo pdpw_act/frm[Pagina].aspx.vb
3. Documentar:
   - Componentes (grid, combobox, botões, etc)
   - Comportamento (cascatas, validações, cálculos)
   - Eventos (click, change, blur)
   - Regras de negócio
   - Limite de usuários
4. Criar arquivo de especificação: specs/[pagina]-migration.md
5. Identificar tipos de dados necessários
```

**T###: Migrar [PÁGINA] - Implementação**
```
Criar componente React com migração do legado

Requisitos:
1. Arquivo: frontend/src/pages/[Category]/[Pagina].tsx
2. Migrar layout conforme design original
3. Migrar componentes (grid → table/datagrid, combobox → select)
4. Implementar cascatas (Data → Empresa → Entidade)
5. Implementar validações
6. Implementar cálculos se houver
7. Gerar mock data para testes iniciais
8. Testes unitários básicos (rendering)
```

**T###: [PÁGINA] - Backend Connection (9 tasks)**
```
Seguir pipeline padrão:
1. Analisar API (T1)
2. Criar service (T2)
3. Criar hooks (T3)
4. Conectar componente (T4)
5. Testes service (T5)
6. Testes hooks (T6)
7. Testes componente (T7)
8. Testes integração (T8)
9. Atualizar checklist (T9)
```

---

# 📊 RESUMO DE TAREFAS POR PRIORIDADE

## Phase P1: Rotinas Críticas (7 páginas × 9 tasks = 63 tasks)

| Página | Tasks | Estimado |
|--------|-------|----------|
| Razão Energética | T001-T009 | 8h |
| Razão Elétrica | T010-T018 | 8h |
| IR1 | T019-T027 | 6h |
| IR2 | T028-T036 | 6h |
| IR3 | T037-T045 | 6h |
| IR4 | T046-T054 | 6h |
| Oferta Exportação | T055-T063 | 7h |
| **TOTAL P1** | **63 tasks** | **47h** |

## Phase P2: Páginas Migradas (34 páginas, 6 domínios)

| Domínio | Páginas | Tasks | Estimado |
|---------|---------|-------|----------|
| Hidráulicos | 4 | 12 | 10h |
| Térmicos | 7 | 21 | 18h |
| Intercâmbio | 3 | 9 | 8h |
| Carga | 3 | 9 | 8h |
| Restrições & Manutenção | 6 | 18 | 15h |
| Outros | 11 | 33 | 28h |
| **TOTAL P2** | **34** | **102 tasks** | **87h** |

## Phase P3: Páginas Pendentes (7 páginas)

| Página | Tasks | Estimado |
|--------|-------|----------|
| Previsão Eólica | 18 (9 migração + 9 backend) | 12h |
| Ger. Arquivos | 18 | 14h |
| Ger. Modelos | 18 | 16h |
| Finalização | 18 | 14h |
| Prog. Diária | 18 | 14h |
| Oferta RVD | 18 | 12h |
| Energia Vertida | 18 | 12h |
| **TOTAL P3** | **126 tasks** | **94h** |

---

# 🚀 PRÓXIMOS PASSOS

## Sprint 1 (Semana 1-2): P1 Críticas
```
Task Force: 1-2 devs backend
Objetivo: 7 rotinas críticas com backend conectado
Saída: MVP pronto para operadores (foco em scheduling)
Tempo: ~47h (1.5 semanas com 1 dev ou ~2-3 dias com 2 devs)
```

## Sprint 2 (Semana 3-5): P2 Páginas Migradas
```
Task Force: 2-3 devs backend + QA
Objetivo: 34 páginas de coleta com backend
Saída: Módulo de coleta completo
Tempo: ~87h (2-3 semanas com 1 dev ou ~1 semana com 2 devs)
```

## Sprint 3 (Semana 6-8): P3 Páginas Pendentes
```
Task Force: 1-2 devs (frontend migration + backend)
Objetivo: 7 páginas críticas migradas + conectadas
Saída: Sistema completo de programação
Tempo: ~94h (3 semanas com 1 dev ou ~1.5 semanas com 2 devs)
```

---

# 📋 COMO USAR ESTE DOCUMENTO

## Para criar GitHub Issues:
1. Copiar cada tarefa (T###) como description
2. Usar o título como issue title
3. Adicionar labels: `backend-integration`, `priority:P1/P2/P3`, `type:implementation/testing`
4. Adicionar assignee (dev)
5. Adicionar milestone (Sprint 1/2/3)

## Para tracking:
1. Usar projetos do GitHub (kanban board)
2. Mover tasks entre colunas: Todo → In Progress → Review → Done
3. Atualizar CHECKLIST_MIGRACAO.md a cada task completa
4. Rodar testes: `npm test` antes de fazer PR

## Para colaboração:
1. Cada dev pega 1-2 páginas (não mais)
2. Criar branch: `feature/backend-[pagina]`
3. Fazer PR após T#### completo
4. Code review por outro dev
5. Merge após aprovação

---

**Documento gerado**: 2025-12-28  
**Versão**: 1.0  
**Próxima atualização**: Após Sprint 1 completo
