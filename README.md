# PDPw - Programação Diária de Produção (Migração .NET 8 + React)

Sistema crítico de coleta e gerenciamento de dados para o processo de Programação Diária de Produção do setor elétrico brasileiro.

## 📋 Sobre o Projeto

Migração incremental do sistema PDPw de um legado .NET Framework 4.8/VB.NET com WebForms para uma arquitetura moderna usando:

- **Back-end**: .NET 8 com C# e ASP.NET Core Web API
- **Front-end**: React com TypeScript
- **Banco de Dados**: SQL Server (Entity Framework Core)
- **Infraestrutura**: Docker e Docker Compose

## 🏗️ Estrutura do Projeto

```
.
├── legado/                 # Código VB.NET/WebForms original (referência)
├── src/
│   ├── Web.Api/           # Controllers e configuração ASP.NET Core
│   ├── Application/       # Services com regras de negócio
│   ├── Domain/            # Entidades e interfaces de domínio
│   └── Infrastructure/    # Repositórios e Entity Framework Core
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes React reutilizáveis
│   │   ├── pages/         # Páginas principais
│   │   └── services/      # Serviços de chamadas API
│   └── tests/             # Testes Jest/Testing Library
├── tests/
│   └── UnitTests/         # Testes xUnit para back-end
└── docs/                  # Documentação do projeto
```

## 🚀 Primeiros Passos

### Pré-requisitos

- .NET 8 SDK
- Node.js 18+
- Docker e Docker Compose
- SQL Server (Development ou Container)
- Visual Studio Code ou Visual Studio

### Configuração Local

#### Back-end

```bash
# Restaurar dependências
dotnet restore

# Criar banco de dados (migrations)
dotnet ef database update --project src/Infrastructure

# Executar testes
dotnet test

# Rodar aplicação
dotnet run --project src/Web.Api
```

#### Front-end

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Executar testes
npm test

# Build produção
npm run build
```

#### Docker

```bash
# Build dos containers
docker-compose build

# Iniciar ambiente completo
docker-compose up -d

# Parar ambiente
docker-compose down
```

## 📚 Convenções de Código

### Linguagem Ubíqua (Domínio PDP)

Utilize sempre os termos do domínio no código:

- `ProgramacaoEnergetica` - Planejamento de geração de energia
- `DadosHidraulicos` - Informações de usinas hidrelétricas
- `DadosTermicos` - Informações de usinas termelétricas
- `OfertaExportacao` - Propostas de exportação de térmicas
- `ComentarioDESSEM` - Comentários do modelo de despacho
- `Agente` - Entidade do setor elétrico
- `Insumos` - Dados de entrada para modelos

### .NET 8 / C#

- **Controllers**: Orquestração HTTP apenas
- **Services**: Regras de negócio exclusivamente
- **Repositories**: Acesso a dados com Entity Framework Core
- **Nomenclatura**: PascalCase para classes/métodos, camelCase para variáveis

### React / TypeScript

- **Componentes**: Functional components com hooks
- **Props**: Tipadas com TypeScript
- **Estilos**: Próximos ao visual original das telas WebForms
- **Nomenclatura**: PascalCase para componentes, camelCase para utilitários

## 🧪 Testes

### Back-end (xUnit)

```bash
dotnet test tests/UnitTests
```

### Front-end (Jest)

```bash
cd frontend
npm test
```

## 🔄 Workflow Git

### Branches

- `main` - Código estável e testado
- `develop` - Integração de features
- `feature/nome-da-funcionalidade` - Desenvolvimento
- `bugfix/descricao-do-bug` - Correções

### Commits

Formato: `tipo(escopo): mensagem`

Exemplos:
```
feat(dados-hidraulicos): implementar coleta de dados
fix(ofertas): corrigir validação de data
refactor(services): aplicar padrão repository
test(dados-termicos): adicionar testes unitários
```

## 📖 Documentação

Consulte os seguintes arquivos para mais informações:

- [Copilot Instructions](.github/copilot-instructions.md) - Diretrizes para agentes IA
- [AGENTS.md](AGENTS.md) - Documentação detalhada do projeto
- [docs/](docs/) - Documentação adicional

## 🤝 Contribuindo

1. Crie uma branch a partir de `develop`
2. Faça commits frequentes com mensagens descritivas
3. Abra um Pull Request com descrição detalhada
4. Garanta que testes passam e cobertura é adequada
5. Aguarde revisão de código antes de mergear

## ⚖️ Licença

Propriedade intelectual do ONS (Operador Nacional do Sistema Elétrico Brasileiro).

## 📞 Contato

Para dúvidas sobre o projeto, contate o time de desenvolvimento.
