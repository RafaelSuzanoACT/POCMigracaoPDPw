# Estrutura do Projeto PDPw

## 📁 Visão Geral da Estrutura

```
Automacao_POCMigracaoPDPw/
│
├── .github/
│   └── copilot-instructions.md    # Diretrizes para agentes IA
│
├── src/                           # Código-fonte do back-end
│   ├── Web.Api/                   # API ASP.NET Core
│   ├── Application/               # Lógica de negócio
│   ├── Domain/                    # Entidades e interfaces
│   └── Infrastructure/            # Acesso a dados
│
├── frontend/                      # Aplicação React
│   ├── src/
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── pages/                 # Páginas principais
│   │   ├── services/              # Serviços de API
│   │   └── App.tsx
│   ├── tests/                     # Testes unitários
│   └── public/                    # Arquivos estáticos
│
├── tests/                         # Testes do back-end
│   └── UnitTests/                 # Testes xUnit
│
├── docs/                          # Documentação
│   ├── ARCHITECTURE.md            # Arquitetura do sistema
│   ├── DEVELOPMENT.md             # Guia de desenvolvimento
│   └── MIGRATION.md               # Guia de migração
│
├── legado/                        # Código VB.NET original (referência)
│
├── docker-compose.yml             # Orquestração de containers
├── .editorconfig                  # Configuração de editor
├── .gitignore                     # Arquivos ignorados pelo git
├── README.md                      # Documentação principal
└── CONTRIBUTING.md                # Guia de contribuição
```

## 🔑 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `.github/copilot-instructions.md` | Instruções para agentes IA |
| `docs/ARCHITECTURE.md` | Explicação da arquitetura |
| `docs/DEVELOPMENT.md` | Guia de desenvolvimento |
| `docs/MIGRATION.md` | Guia de migração do legado |
| `docker-compose.yml` | Ambiente local completo |
| `CONTRIBUTING.md` | Como contribuir |

## 🚀 Quick Start

### Back-end
```bash
dotnet restore
dotnet build
dotnet run --project src/Web.Api
```

### Front-end
```bash
cd frontend
npm install
npm start
```

### Com Docker
```bash
docker-compose up -d
```

## 📝 Convenções de Nomenclatura

### Pastas
- Use `lowercase` com hífens: `src/`, `frontend/`, `tests/`
- Pastas de camada: `Web.Api/`, `Application/`, `Domain/`, `Infrastructure/`

### C# / .NET
- Classes: `PascalCase` → `DadosHidraulicos`
- Métodos: `PascalCase` com verbo → `ObterTodosAsync`
- Variáveis: `camelCase` → `meusDados`
- Constantes: `UPPER_SNAKE_CASE` → `MAX_RETRIES`

### React / TypeScript
- Componentes: `PascalCase` → `DadosHidraulicosTable.tsx`
- Hooks: `use + PascalCase` → `useDadosHidraulicos.ts`
- Utilities: `camelCase` → `apiClient.ts`

## 🗂️ Onde Colocar Cada Coisa

| O que | Onde | Exemplo |
|------|------|---------|
| Entidade de domínio | `src/Domain/Entities/` | `DadosHidraulicos.cs` |
| Interface repositório | `src/Domain/Interfaces/` | `IDadosHidraulicosRepository.cs` |
| Repositório | `src/Infrastructure/Repositories/` | `DadosHidraulicosRepository.cs` |
| Service | `src/Application/Services/` | `DadosHidraulicosService.cs` |
| DTO | `src/Application/DTOs/` | `DadosHidraulicosDto.cs` |
| Controller | `src/Web.Api/Controllers/` | `DadosHidraulicosController.cs` |
| Componente React | `frontend/src/components/` | `DadosHidraulicosTable.tsx` |
| Página React | `frontend/src/pages/` | `DadosHidraulicos.tsx` |
| Serviço API | `frontend/src/services/` | `dadosHidraulicosService.ts` |
| Teste unitário | `tests/UnitTests/` | `DadosHidraulicosServiceTests.cs` |

## 🔄 Fluxo de Dados

```
Cliente (React)
    ↓
Frontend Service API
    ↓
HTTP GET/POST/PUT/DELETE
    ↓
Web.Api Controller
    ↓
Application Service
    ↓
Domain Repository (Interface)
    ↓
Infrastructure Repository (Implementação)
    ↓
Entity Framework Core
    ↓
SQL Server Database
```

## 📦 Dependências Principais

### Back-end
- `.NET 8`
- `ASP.NET Core`
- `Entity Framework Core`
- `xUnit`, `Moq`, `FluentAssertions`

### Front-end
- `React 18`
- `TypeScript`
- `Jest`, `Testing Library`

### Infraestrutura
- `Docker`
- `SQL Server`

## ✅ Checklist para Nova Feature

- [ ] Criou branch `feature/nome` a partir de `develop`
- [ ] Adicionou entidade em `src/Domain/Entities/`
- [ ] Adicionou interface em `src/Domain/Interfaces/`
- [ ] Implementou repositório em `src/Infrastructure/Repositories/`
- [ ] Criou service em `src/Application/Services/`
- [ ] Criou DTO em `src/Application/DTOs/`
- [ ] Adicionou controller em `src/Web.Api/Controllers/`
- [ ] Criou componentes React em `frontend/src/components/`
- [ ] Adicionou testes unitários
- [ ] Atualizou documentação se necessário
- [ ] Testes passam: `dotnet test` e `npm test`
- [ ] Sem warnings de build
- [ ] Mensagens de commit seguem padrão
- [ ] Criou Pull Request com descrição clara

## 🔗 Recursos

- [Documentação .NET 8](https://learn.microsoft.com/dotnet/)
- [ASP.NET Core](https://learn.microsoft.com/aspnet/core/)
- [Entity Framework Core](https://learn.microsoft.com/ef/core/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
