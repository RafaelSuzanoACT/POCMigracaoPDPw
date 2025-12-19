# Domain

Camada de domínio que contém as entidades e interfaces do negócio PDPw.

## Responsabilidades

- **Entidades**: Modelos de domínio que representam conceitos do PDPw
- **Interfaces**: Contratos para repositórios e serviços
- **Objetos de Valor**: Estruturas imutáveis para representar conceitos

## Estrutura

```
Domain/
├── Entities/      # Entidades de negócio
├── Interfaces/    # Contratos de repositório e serviço
└── Domain.csproj
```

## Exemplo de Entidade

```csharp
namespace Domain.Entities;

public class DadosHidraulicos : EntityBase
{
    public string NomeUsina { get; set; } = string.Empty;
    public decimal VazaoAfluente { get; set; }
    public decimal VolumeUtil { get; set; }
    public DateTime DataMedicao { get; set; }
}
```

## Convenções

- Entidades herdam de `EntityBase`
- Nomes sempre em português (linguagem ubíqua do domínio)
- Propriedades com tipos explícitos e inicializações
- Validações básicas no construtor quando necessário

## Sem Dependências Externas

Esta camada não deve depender de:
- Entity Framework Core
- ASP.NET Core
- Qualquer biblioteca específica de infraestrutura

Mantém a independência e facilita testes.
