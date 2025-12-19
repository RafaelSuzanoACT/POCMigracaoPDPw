# Infrastructure

Camada de infraestrutura responsável por acesso a dados.

## Responsabilidades

- **DbContext**: Configuração do Entity Framework Core
- **Repositórios**: Implementação de acesso a dados
- **Migrations**: Versionamento do banco de dados

## Estrutura

```
Infrastructure/
├── Data/           # DbContext e configurações
├── Repositories/   # Implementações de repositório
├── Migrations/     # Migrations do EF Core
└── Infrastructure.csproj
```

## Configurar Database

### Criar Migration

```bash
dotnet ef migrations add NomeDaMigration --project src/Infrastructure
```

### Aplicar Migrations

```bash
dotnet ef database update --project src/Infrastructure
```

### Desfazer Última Migration

```bash
dotnet ef migrations remove --project src/Infrastructure
```

## Exemplo de Repositório

```csharp
namespace Infrastructure.Repositories;

public class DadosHidraulicosRepository : IDadosHidraulicosRepository
{
    private readonly PdpwDbContext _context;

    public DadosHidraulicosRepository(PdpwDbContext context)
    {
        _context = context;
    }

    public async Task<List<DadosHidraulicos>> ObterTodosAsync()
    {
        return await _context.DadosHidraulicos.ToListAsync();
    }

    public async Task<DadosHidraulicos?> ObterPorIdAsync(int id)
    {
        return await _context.DadosHidraulicos.FindAsync(id);
    }
}
```

## Convenções

- Todos os métodos devem ser `async`
- Use `await` para chamadas ao banco
- Nomes seguem padrão: `ObterAsync`, `CriarAsync`, `AtualizarAsync`, `RemoverAsync`
- Implemente interfaces definidas no Domain

## Entity Framework Core

- Configurações de mapeamento no `PdpwDbContext.OnModelCreating`
- Use Fluent API para mapeamentos complexos
- Migrations versionadas no git
