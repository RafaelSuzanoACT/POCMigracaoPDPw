# Documentação de Arquitetura

## Visão Geral

O projeto PDPw utiliza uma arquitetura em camadas com separação clara de responsabilidades.

## Camadas

### 1. Domain (Domínio)
Contém as entidades e interfaces que representam o modelo de negócio do PDPw.

- Entidades como `DadosHidraulicos`, `DadosTermicos`, etc.
- Interfaces de repositório
- Objetos de valor (Value Objects)

### 2. Infrastructure (Infraestrutura)
Implementação de acesso a dados usando Entity Framework Core.

- `PdpwDbContext`: DbContext principal
- Repositórios que implementam interfaces do Domain
- Migrations (para versionamento do banco de dados)

### 3. Application (Aplicação)
Contém a lógica de negócio e orquestração.

- Services que implementam regras de negócio
- DTOs (Data Transfer Objects)
- Mapeamentos entre entidades e DTOs

### 4. Web.Api (Apresentação)
Controllers ASP.NET Core que expõem a API REST.

- Controllers que orquestram chamadas aos Services
- Configuração de middleware
- Autenticação e autorização

## Fluxo de Requisição

```
Cliente HTTP
    ↓
Controller
    ↓
Service (lógica de negócio)
    ↓
Repository (acesso a dados)
    ↓
DbContext / SQL Server
```

## Padrões Utilizados

### Repository Pattern
Abstrai o acesso a dados através de interfaces.

### Dependency Injection
Configurado no `Program.cs` para injetar dependências.

### Data Transfer Object (DTO)
Separa modelos internos de modelos expostos pela API.

### Entity Framework Core
ORM para acesso a dados de forma abstrata.

## Estrutura de Pacotes

```
Domain/
├── Entities/         # Entidades de negócio
└── Interfaces/       # Contratos de repositório

Infrastructure/
├── Data/            # DbContext e configurações
├── Repositories/    # Implementações de repositório
└── Migrations/      # Migrations do Entity Framework

Application/
├── Services/        # Serviços de negócio
├── DTOs/           # Data Transfer Objects
└── Mappings/       # Mapeamentos

Web.Api/
├── Controllers/    # Controllers REST
└── Program.cs      # Configuração da aplicação
```
