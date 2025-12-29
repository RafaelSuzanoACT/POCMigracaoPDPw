# Integração Frontend-Backend PDPw

## 🚀 Início Rápido

### 1. Iniciar o Backend (Podman)

```bash
# Execute o script de inicialização
./scripts/start-backend.sh

# Ou manualmente:
cd /mnt/Dados/projetos/ACT/POCIA/ONS_PoC-PDPW_V2
podman-compose up -d

# Verificar status
podman ps --filter "name=pdpw"

# Ver logs
podman logs -f pdpw-backend
```

**URLs do Backend:**
- API Base: `http://localhost:5001/api`
- Swagger UI: `http://localhost:5001/swagger`
- Health Check: `http://localhost:5001/health`

### 2. Configurar o Frontend

```bash
cd /mnt/Dados/projetos/ACT/POCIA/POCMigracaoPDPw/frontend

# Instalar dependências (se necessário)
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

O frontend já está configurado para conectar ao backend via `.env.development`:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### 3. Verificar Conexão

Abra o navegador em `http://localhost:5173` e navegue para uma das páginas críticas:

- **Programação Energética**: `/collection/energetic/energetic`
- **Programação Elétrica**: `/collection/electrical/electrical`
- **Ofertas de Exportação**: `/collection/thermal/export-offer`
- **Carga**: `/collection/load/load`
- **Previsão Eólica**: `/collection/wind/wind-forecast` (nova)
- **Resposta Voluntária**: `/collection/demand/voluntary-response` (nova)

---

## 📡 APIs Disponíveis

### Dados Energéticos
**Endpoint Base:** `/api/dados-energeticos`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todos os dados energéticos |
| GET | `/{id}` | Obtém por ID |
| GET | `/periodo?dataInicio={d1}&dataFim={d2}` | Filtrar por período |
| POST | `/` | Criar novo dado |
| PUT | `/{id}` | Atualizar dado |
| DELETE | `/{id}` | Remover dado |
| POST | `/bulk` | Criar/atualizar em lote |

### Ofertas de Exportação
**Endpoint Base:** `/api/ofertas-exportacao`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todas as ofertas |
| GET | `/{id}` | Obtém por ID |
| GET | `/pendentes` | Ofertas pendentes |
| GET | `/aprovadas` | Ofertas aprovadas |
| GET | `/rejeitadas` | Ofertas rejeitadas |
| GET | `/usina/{usinaId}` | Ofertas por usina |
| GET | `/empresa/{empresaId}` | Ofertas por empresa |
| POST | `/` | Criar nova oferta |
| PUT | `/{id}` | Atualizar oferta |
| DELETE | `/{id}` | Remover oferta |
| POST | `/{id}/aprovar` | Aprovar oferta (ONS) |
| POST | `/{id}/rejeitar` | Rejeitar oferta (ONS) |
| POST | `/{id}/enviar` | Enviar para análise |

### Ofertas Resposta Voluntária
**Endpoint Base:** `/api/ofertas-resposta-voluntaria`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todas |
| GET | `/{id}` | Obtém por ID |
| GET | `/pendentes` | Pendentes |
| GET | `/aprovadas` | Aprovadas |
| GET | `/rejeitadas` | Rejeitadas |
| GET | `/empresa/{empresaId}` | Por empresa |
| GET | `/data-pdp/{dataPDP}` | Por data PDP |
| POST | `/` | Criar nova |
| PUT | `/{id}` | Atualizar |
| DELETE | `/{id}` | Remover |
| POST | `/{id}/aprovar` | Aprovar (ONS) |
| POST | `/{id}/rejeitar` | Rejeitar (ONS) |

### Previsões Eólicas
**Endpoint Base:** `/api/previsoes-eolicas`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todas |
| GET | `/{id}` | Obtém por ID |
| GET | `/usina/{usinaId}` | Por usina |
| GET | `/usina/{usinaId}/ultimas?quantidade=10` | Últimas N previsões |
| GET | `/periodo?dataInicio={d1}&dataFim={d2}` | Por período |
| GET | `/modelo/{modelo}` | Por modelo de previsão |
| POST | `/` | Criar nova |
| PUT | `/{id}` | Atualizar |
| DELETE | `/{id}` | Remover |

### Cargas
**Endpoint Base:** `/api/cargas`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Lista todas |
| GET | `/{id}` | Obtém por ID |
| GET | `/periodo?dataInicio={d1}&dataFim={d2}` | Por período |
| GET | `/subsistema/{subsistemaId}` | Por subsistema |
| GET | `/data/{dataReferencia}` | Por data |
| POST | `/` | Criar nova |
| PUT | `/{id}` | Atualizar |
| DELETE | `/{id}` | Remover |
| POST | `/bulk` | Criar/atualizar em lote |

---

## 🔧 Services Criados

Todos os services estão em `/frontend/src/services/`:

- ✅ `energeticService.ts` - Dados Energéticos
- ✅ `electricalService.ts` - Dados Elétricos
- ✅ `ofertaExportacaoService.ts` - Ofertas de Exportação
- ✅ `ofertaRespostaVoluntariaService.ts` - Resposta Voluntária
- ✅ `previsaoEolicaService.ts` - Previsões Eólicas (já existia)
- ✅ `cargaService.ts` - Cargas

### Exemplo de Uso

```typescript
import { energeticService } from '@/services/energeticService';

// Listar todos os dados
const dados = await energeticService.getAll();

// Buscar por período
const dadosPeriodo = await energeticService.getByPeriod(
  '2025-12-01',
  '2025-12-31'
);

// Criar novo dado
const novoDado = await energeticService.create({
  usinaId: 1,
  dataReferencia: '2025-12-28',
  intervalo: 1,
  valorMW: 150.5,
  razaoEnergetica: 0.95
});

// Atualizar
await energeticService.update(1, {
  valorMW: 160.0
});

// Deletar
await energeticService.delete(1);
```

---

## 🔄 Próximos Passos

### 1. Conectar Páginas Existentes

- [ ] Atualizar `Energetic.tsx` para usar `energeticService`
- [ ] Atualizar `Electrical.tsx` para usar `electricalService`
- [ ] Atualizar `ExportOffer.tsx` para usar `ofertaExportacaoService`
- [ ] Atualizar `Load.tsx` para usar `cargaService`
- [ ] Atualizar insumos IR1-IR4

### 2. Criar Novas Páginas Críticas

- [ ] **Previsão Eólica** → `/collection/wind/WindForecast.tsx`
  - Usar `previsaoEolicaService`
  - Formulário: Usina, Data, Modelo
  - Grid: 48 intervalos de previsão MW

- [ ] **Resposta Voluntária da Demanda** → `/collection/demand/VoluntaryResponse.tsx`
  - Usar `ofertaRespostaVoluntariaService`
  - Formulário: Empresa, Data PDP, Redução MW, Horários
  - Status: Pendente/Aprovada/Rejeitada

- [ ] **Energia Vertida Turbinável** → `/collection/hydraulic/SpillableEnergy.tsx`
  - Criar service para endpoint correspondente
  - Grid: Usina, Data, Intervalos de vertimento

### 3. Implementar Funcionalidades de Finalização

- [ ] Página de validação geral
- [ ] Página de envio para processamento
- [ ] Geração de arquivos DADGER/DESSEM
- [ ] Download de recibos

---

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Verificar logs
podman logs pdpw-backend

# Verificar SQL Server
podman logs pdpw-sqlserver

# Reiniciar containers
cd /mnt/Dados/projetos/ACT/POCIA/ONS_PoC-PDPW_V2
podman-compose down
podman-compose up -d
```

### CORS Errors

O backend já está configurado para aceitar requisições do frontend (localhost:5173).
Se houver problemas, verifique `Program.cs` no backend.

### Erro de Conexão API

1. Verifique se o backend está rodando: `podman ps`
2. Teste o health check: `curl http://localhost:5001/health`
3. Verifique o `.env.development` no frontend
4. Limpe cache do navegador (Ctrl+Shift+R)

### Dados não aparecem

1. Verifique se o banco tem dados: acesse Swagger e teste endpoints
2. Popule dados de teste via Swagger POST endpoints
3. Verifique console do navegador para erros de API

---

## 📚 Documentação Adicional

- [Swagger UI](http://localhost:5001/swagger) - Documentação interativa da API
- [PLANO_MIGRACAO.md](PLANO_MIGRACAO.md) - Status completo da migração
- [Backend README](../ONS_PoC-PDPW_V2/README.md) - Documentação do backend
