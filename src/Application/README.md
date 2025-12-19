# Application

Camada de aplicação que contém a lógica de negócio.

## Responsabilidades

- **Services**: Implementação de regras de negócio
- **DTOs**: Transfer Objects para separar modelos de dados
- **Mappings**: Mapeamento entre entidades e DTOs

## Estrutura

```
Application/
├── Services/      # Serviços de negócio
├── DTOs/         # Data Transfer Objects
├── Mappings/     # Mapeamentos (AutoMapper, etc)
└── Application.csproj
```

## Exemplo de Service

```csharp
namespace Application.Services;

public class DadosHidraulicosService : IDadosHidraulicosService
{
    private readonly IDadosHidraulicosRepository _repository;

    public DadosHidraulicosService(IDadosHidraulicosRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<DadosHidraulicosDto>> ObterTodosAsync()
    {
        var dados = await _repository.ObterTodosAsync();
        return dados.Select(d => new DadosHidraulicosDto
        {
            Id = d.Id,
            NomeUsina = d.NomeUsina,
            VazaoAfluente = d.VazaoAfluente,
            VolumeUtil = d.VolumeUtil
        }).ToList();
    }
}
```

## Exemplo de DTO

```csharp
namespace Application.DTOs;

public class DadosHidraulicosDto
{
    public int Id { get; set; }
    public string NomeUsina { get; set; } = string.Empty;
    public decimal VazaoAfluente { get; set; }
    public decimal VolumeUtil { get; set; }
}
```

## Convenções

- Services implementam interfaces (IXxxService)
- DTOs recebem sufixo `Dto`
- Services retornam DTOs, nunca entidades
- Métodos públicos devem ser `async`
- Injetar repositórios via construtor
- Separar criação de DTOs em métodos privados se complexo

## Responsabilidade Única

Cada service é responsável por:
- Orquestrar chamadas aos repositórios
- Aplicar validações de negócio
- Transformar dados (repository para DTO)
- Tratar exceções apropriadamente
