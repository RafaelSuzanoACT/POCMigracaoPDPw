# API Contracts: Critical Routines (P1)

**Priority**: P1 (Maximum)  
**Pages**: 7 critical routine pages  
**Backend Base URL**: `http://localhost:5001/api`

## 1. Razão Energética (Energetic Data)

### GET `/api/dadosenergeticos/{date}/{companyId}`
**Purpose**: Fetch energetic data for specific date and company  
**Authorization**: Bearer token required  
**Path Parameters**:
- `date` (string): Date in format `YYYY-MM-DD` (e.g., `2025-12-28`)
- `companyId` (integer): Company ID

**Response 200 OK**:
```json
{
  "Id": 123,
  "DataOperacao": "2025-12-28T00:00:00Z",
  "EmpresaId": 5,
  "EmpresaNome": "CEMIG",
  "Intervalos": [100.5, 102.3, ..., 98.7], // 48 values
  "Total": 4850.2,
  "Media": 101.05,
  "DataCriacao": "2025-12-27T10:30:00Z",
  "DataAtualizacao": "2025-12-28T08:15:00Z",
  "UsuarioCriacao": "joao.silva"
}
```

**Response 404 Not Found**:
```json
{
  "message": "Dados não encontrados para a data e empresa especificadas",
  "code": "NOT_FOUND"
}
```

### POST `/api/dadosenergeticos`
**Purpose**: Create new energetic data entry  
**Request Body**:
```json
{
  "DataOperacao": "2025-12-28T00:00:00Z",
  "EmpresaId": 5,
  "Intervalos": [100.5, 102.3, ..., 98.7] // Must have exactly 48 values
}
```

**Response 201 Created**: Same as GET response

**Response 400 Bad Request** (validation error):
```json
{
  "message": "Dados inválidos",
  "code": "VALIDATION_ERROR",
  "errors": [
    {
      "field": "Intervalos",
      "message": "Deve conter exatamente 48 intervalos"
    }
  ]
}
```

---

## 2. Razão Elétrica (Electrical Data)

### Endpoints
- **GET** `/api/dadoseletricos/{date}/{companyId}` - Fetch electrical data
- **POST** `/api/dadoseletricos` - Create electrical data
- **PUT** `/api/dadoseletricos/{id}` - Update electrical data
- **DELETE** `/api/dadoseletricos/{id}` - Delete electrical data

**Similar structure to Energetic Data with these differences**:
- Contains additional field: `UsinaId` (plant ID)
- Supports filtering by plant: `/api/dadoseletricos/{date}/{companyId}/{plantId}`

---

## 3-6. Insumos Recebimento (IR1, IR2, IR3, IR4)

### IR1 - Nível de Partida (Initial Water Levels)

**GET** `/api/insumos-recebimento/ir1/{date}`  
**POST** `/api/insumos-recebimento/ir1`

**Request/Response Structure**:
```json
{
  "Id": 456,
  "DataReferencia": "2025-12-28T00:00:00Z",
  "NiveisPartida": [
    {
      "UsinaId": 10,
      "UsinaNome": "Itaipu",
      "Nivel": 219.5, // meters
      "Volume": 28500.0 // hm³
    }
  ]
}
```

### IR2 - Dia -1 (Previous Day Data)

**GET** `/api/insumos-recebimento/ir2/{date}`  
**POST** `/api/insumos-recebimento/ir2`

**Contains**: Generation, flow, volume data for D-1

### IR3 - Dia -2 (Two Days Prior Data)

**GET** `/api/insumos-recebimento/ir3/{date}`  
**POST** `/api/insumos-recebimento/ir3`

**Contains**: Generation, flow, volume data for D-2

### IR4 - Carga da Ande (Ande Load Data)

**GET** `/api/insumos-recebimento/ir4/{date}`  
**POST** `/api/insumos-recebimento/ir4`

**Contains**: Load data for Ande interconnection

---

## 7. Oferta Exportação (Export Offers)

### GET `/api/ofertas-exportacao`
**Purpose**: List all export offers (may be filtered by date)  
**Query Parameters** (optional):
- `dataInicio` (string): Start date `YYYY-MM-DD`
- `dataFim` (string): End date `YYYY-MM-DD`
- `empresaId` (integer): Filter by company

**Response 200 OK**:
```json
[
  {
    "Id": 789,
    "DataOferta": "2025-12-28T00:00:00Z",
    "EmpresaId": 7,
    "EmpresaNome": "Termoelétrica XYZ",
    "UsinaId": 25,
    "UsinaNome": "UTE Norte",
    "EnergiaOfertada": 500.0, // MW
    "PrecoOfertado": 250.00, // R$/MWh
    "Status": "Pendente" // Pendente, Aceita, Rejeitada
  }
]
```

### POST `/api/ofertas-exportacao`
**Purpose**: Create new export offer  
**Request Body**:
```json
{
  "DataOferta": "2025-12-28T00:00:00Z",
  "EmpresaId": 7,
  "UsinaId": 25,
  "EnergiaOfertada": 500.0,
  "PrecoOfertado": 250.00
}
```

### PUT `/api/ofertas-exportacao/{id}`
**Purpose**: Update existing offer (only if status is "Pendente")  
**Response 409 Conflict** (if offer already accepted/rejected):
```json
{
  "message": "Não é possível editar ofertas já processadas",
  "code": "CONFLICT"
}
```

### DELETE `/api/ofertas-exportacao/{id}`
**Purpose**: Delete offer (only if status is "Pendente")

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "message": "Token expirado ou inválido",
  "code": "UNAUTHORIZED"
}
```

### 403 Forbidden
```json
{
  "message": "Você não tem permissão para esta operação",
  "code": "FORBIDDEN"
}
```

### 409 Conflict (concurrent modification)
```json
{
  "message": "Os dados foram modificados por outro usuário",
  "code": "CONFLICT",
  "details": {
    "lastModified": "2025-12-28T10:30:00Z",
    "lastModifiedBy": "maria.santos"
  }
}
```

### 500 Internal Server Error
```json
{
  "message": "Erro interno do servidor",
  "code": "SERVER_ERROR"
}
```

---

**Contract Status**: ✅ **COMPLETE** for P1 (Critical Routines)  
**Next**: Create contracts for P2 (Data Collection), P3 (Queries), P4 (Administration)
