# 📚 Quick Reference - Estrutura Inicial PDPw

## ✅ O que foi criado

### 1. **Estrutura de Camadas Back-end**
```
src/
├── Domain/           → Entidades e interfaces (sem dependências externas)
├── Infrastructure/   → Acesso a dados com Entity Framework Core
├── Application/      → Lógica de negócio e services
└── Web.Api/         → Controllers e configuração ASP.NET Core
```

### 2. **Front-end React**
```
frontend/
├── src/
│   ├── components/   → Componentes reutilizáveis
│   ├── pages/       → Páginas principais
│   └── services/    → Serviços de chamadas API
├── tests/           → Testes unitários
└── public/          → Arquivos estáticos
```

### 3. **Testes**
```
tests/
└── UnitTests/       → Testes unitários xUnit para back-end
```

### 4. **Infraestrutura**
```
├── docker-compose.yml   → Ambiente local completo
├── .github/copilot-instructions.md → Instruções para IA
├── .cursor/rules.yaml   → Rules para Cursor IDE
└── .editorconfig        → Configuração de editor
```

### 5. **Documentação**
```
docs/
├── ARCHITECTURE.md  → Explicação da arquitetura em camadas
├── DEVELOPMENT.md   → Guia completo de desenvolvimento
└── MIGRATION.md     → Guia para migração do código legado

Também criados:
├── README.md        → Overview do projeto
├── CONTRIBUTING.md  → Como contribuir
└── STRUCTURE.md     → Explicação detalhada da estrutura
```

---

## 🚀 Como Começar

### Opção 1: Docker (Recomendado)
```bash
docker-compose build
docker-compose up -d
```
- API: http://localhost:5000
- Frontend: http://localhost:3000
- SQL Server: localhost:1433

### Opção 2: Desenvolvimento Local

**Back-end:**
```bash
dotnet restore
dotnet run --project src/Web.Api
# API em https://localhost:5001
```

**Front-end:**
```bash
cd frontend
npm install
npm start
# Frontend em http://localhost:3000
```

---

## 📝 Padrões de Código

### Criar uma Nova Feature (Ex: Dados Hidráulicos)

#### 1. Domain (Entidade)
```csharp
// src/Domain/Entities/DadosHidraulicos.cs
public class DadosHidraulicos : EntityBase
{
    public string NomeUsina { get; set; } = string.Empty;
    public decimal VazaoAfluente { get; set; }
}
```

#### 2. Infrastructure (Repositório)
```csharp
// src/Infrastructure/Repositories/DadosHidraulicosRepository.cs
public class DadosHidraulicosRepository : IDadosHidraulicosRepository
{
    public async Task<List<DadosHidraulicos>> ObterTodosAsync()
    {
        return await _context.DadosHidraulicos.ToListAsync();
    }
}
```

#### 3. Application (Service)
```csharp
// src/Application/Services/DadosHidraulicosService.cs
public class DadosHidraulicosService
{
    public async Task<List<DadosHidraulicosDto>> ObterTodosAsync()
    {
        var dados = await _repository.ObterTodosAsync();
        return _mapper.Map<List<DadosHidraulicosDto>>(dados);
    }
}
```

#### 4. Web.Api (Controller)
```csharp
// src/Web.Api/Controllers/DadosHidraulicosController.cs
[ApiController]
[Route("api/[controller]")]
public class DadosHidraulicosController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<DadosHidraulicosDto>>> Get()
    {
        var dados = await _service.ObterTodosAsync();
        return Ok(dados);
    }
}
```

#### 5. Frontend (Componente React)
```typescript
// frontend/src/components/DadosHidraulicosTable.tsx
export const DadosHidraulicosTable: React.FC<Props> = ({ dados }) => {
    return <table>{/* ... */}</table>;
};
```

#### 6. Testes
```csharp
// tests/UnitTests/Services/DadosHidraulicosServiceTests.cs
[Fact]
public async Task ObterTodos_DeveRetornarDados()
{
    // Arrange, Act, Assert
}
```

---

## 🔑 Palavras-chave do Domínio

**Use sempre em português:**
- ✅ `DadosHidraulicos`, `DadosTermicos`, `OfertaExportacao`
- ✅ `ObterTodosAsync`, `CriarAsync`, `AtualizarAsync`
- ❌ `GetAll`, `Create`, `Data`

---

## 📋 Checklist de Nova Feature

- [ ] Criou branch `feature/<nome>` do `develop`
- [ ] Entidade em `src/Domain/Entities/`
- [ ] Interface repositório em `src/Domain/Interfaces/`
- [ ] Repositório em `src/Infrastructure/Repositories/`
- [ ] Service em `src/Application/Services/`
- [ ] DTO em `src/Application/DTOs/`
- [ ] Controller em `src/Web.Api/Controllers/`
- [ ] Componentes React em `frontend/src/`
- [ ] Testes unitários (back + front)
- [ ] Testes passam: `dotnet test` + `npm test`
- [ ] Documentação atualizada
- [ ] Commit com padrão: `feat(scope): description`
- [ ] Pull Request criado para `develop`

---

## 🧪 Comandos Úteis

```bash
# Back-end
dotnet build                                # Build
dotnet run --project src/Web.Api           # Run API
dotnet test tests/UnitTests                # Testes
dotnet ef database update --project src/Infrastructure  # Migrations

# Front-end
cd frontend
npm install                 # Dependências
npm start                  # Desenvolvimento
npm test                   # Testes
npm run build             # Build produção

# Docker
docker-compose build      # Build containers
docker-compose up -d      # Iniciar
docker-compose logs -f    # Ver logs
docker-compose down       # Parar
```

---

## 📚 Arquivos Importantes Para Ler

1. **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Diretrizes para IA
2. **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Arquitetura detalhada
3. **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Guia de desenvolvimento
4. **[STRUCTURE.md](STRUCTURE.md)** - Explicação da estrutura

---

## 🚀 Próximos Passos

1. Ler `docs/DEVELOPMENT.md` para setup completo
2. Consultar `docs/MIGRATION.md` para migrar features do legado
3. Seguir `CONTRIBUTING.md` para cada nova feature
4. Usar `.github/copilot-instructions.md` ao pedir ajuda a IA

---

**Bem-vindo ao projeto PDPw! 🎉**
