# Guia de Desenvolvimento

## Configuração do Ambiente

### Pré-requisitos
- .NET 8 SDK
- Visual Studio Code ou Visual Studio Community
- SQL Server Express ou LocalDB
- Git

### Passos Iniciais

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Automacao_POCMigracaoPDPw
```

2. **Restaure dependências .NET**
```bash
dotnet restore
```

3. **Configure a Connection String**
Edite `src/Web.Api/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PDPwDB;User Id=sa;Password=sua_senha;"
  }
}
```

4. **Execute as Migrations**
```bash
dotnet ef database update --project src/Infrastructure
```

## Desenvolvimento Local

### Executar a API
```bash
dotnet run --project src/Web.Api
```

A API estará disponível em `https://localhost:5001`

### Executar o Frontend
```bash
cd frontend
npm install
npm start
```

O frontend estará disponível em `http://localhost:3000`

## Testes

### Testes Unitários (.NET)
```bash
dotnet test tests/UnitTests
```

### Testes Front-end
```bash
cd frontend
npm test
```

## Criar uma Nova Feature

### 1. Criar a Branch
```bash
git checkout -b feature/nome-da-funcionalidade develop
```

### 2. Implementar no Domain
- Criar entidade em `src/Domain/Entities/`
- Criar interface em `src/Domain/Interfaces/`

### 3. Implementar no Infrastructure
- Criar repositório em `src/Infrastructure/Repositories/`
- Adicionar DbSet no `PdpwDbContext`

### 4. Implementar no Application
- Criar service em `src/Application/Services/`
- Criar DTO em `src/Application/DTOs/`
- Adicionar mapeamentos

### 5. Implementar na Web.Api
- Criar controller em `src/Web.Api/Controllers/`
- Registrar serviço no `Program.cs`

### 6. Adicionar Testes
- Adicionar testes no `tests/UnitTests/`

### 7. Implementar no Frontend
- Criar componentes em `frontend/src/components/`
- Criar página em `frontend/src/pages/`
- Adicionar service API em `frontend/src/services/`

## Naming Conventions

### C# / .NET
- **Classes**: PascalCase
- **Métodos**: PascalCase com verbos
- **Variáveis**: camelCase
- **Interfaces**: I + PascalCase
- **Constantes**: UPPER_SNAKE_CASE

Exemplos:
```csharp
public class DadosHidraulicos { }
public interface IDadosHidraulicosRepository { }
public async Task<List<DadosHidraulicos>> ObterTodosAsync() { }
private string _connectionString;
private const int MAX_RETRIES = 3;
```

### React / TypeScript
- **Componentes**: PascalCase
- **Hooks**: use + PascalCase
- **Funções**: camelCase
- **Interfaces**: IPascalCase ou Type
- **Constantes**: UPPER_SNAKE_CASE

Exemplos:
```typescript
export const DadosHidraulicosTable: React.FC = () => {};
const useDadosHidraulicos = () => {};
const apiClient = {};
interface DadosHidraulicosProps {}
const MAX_ITEMS = 100;
```

## Vocabulário do Domínio

Sempre use os termos corretos do domínio PDP:

- **Programação Energética**: Planejamento de geração de energia
- **Dados Hidráulicos**: Informações de usinas hidrelétricas
- **Dados Térmicos**: Informações de usinas termelétricas
- **Oferta de Exportação**: Propostas de exportação
- **Comentário DESSEM**: Comentário do modelo de despacho
- **Agente**: Entidade do setor elétrico
- **Insumos**: Dados de entrada para modelos

Evite termos genéricos como:
- Manager, Handler, Helper, Util
- Data, Info, Item
- Process, Execute, Do

## Git Workflow

### Tipos de Commits
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `refactor:` Refatoração sem mudança de comportamento
- `test:` Adição de testes
- `docs:` Documentação
- `chore:` Tarefas de manutenção

### Exemplo
```bash
git commit -m "feat(dados-hidraulicos): implementar coleta de dados"
git commit -m "test(dados-hidraulicos): adicionar testes unitários do service"
```

## Recursos Úteis

- [Documentação .NET 8](https://learn.microsoft.com/dotnet/)
- [Documentação ASP.NET Core](https://learn.microsoft.com/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
