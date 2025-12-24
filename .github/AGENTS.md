# Projeto de Migração PDPw - Legado para .NET 8

## Visão Geral do Projeto

Migração incremental do sistema PDPw (Programação Diária de Produção) de .NET Framework 4.8/VB.NET/WebForms para .NET 8 com React. O sistema é responsável pela coleta de dados para o processo PDP, incluindo dados hidráulicos, térmicos, ofertas de exportação e comentários DESSEM.

**Objetivo Principal:** Tornar a aplicação crítica resiliente e containerizável, mantendo funcionalidades existentes com arquitetura moderna.

**Abordagem:** Entregas incrementais em ciclos pequenos, priorizando funcionalidades críticas.

## Estrutura do Projeto

```
/
├── legado/               # Código VB.NET/WebForms original (somente leitura)
├── src/
│   ├── Web.Api/         # Controllers e configuração ASP.NET Core
│   ├── Application/     # Services e regras de negócio
│   ├── Domain/          # Entidades e interfaces
│   └── Infrastructure/  # Entity Framework e repositórios
├── frontend/
│   ├── src/
│   │   ├── components/  # Componentes React reutilizáveis
│   │   ├── pages/       # Páginas principais da aplicação
│   │   └── services/    # Chamadas API
│   └── tests/           # Testes Jest/Testing Library
└── tests/
    └── UnitTests/       # Testes xUnit para back-end
```

**Pasta `legado/`**: Contém código VB.NET original. Use como referência para entender regras de negócio. Não modifique.

## Stack Tecnológica

### Back-end
- `.NET 8` + `C#`
- `ASP.NET Core` (Web API)
- `Entity Framework Core`
- `xUnit` + `Moq` + `FluentAssertions` (testes)

### Front-end
- `React` (versão mais atual)
- `TypeScript` (recomendado)
- `Vite` (dev server + build - **OBRIGATÓRIO**)
- `Vitest` + `Testing Library` (testes - **OBRIGATÓRIO**)

### DevOps
- `Docker` + `Docker Compose`
- `Git` com workflow baseado em branches
- Visual Studio Community

## Comandos Principais

### Back-end (.NET 8)

**Build:**
```bash
dotnet build src/Web.Api/Web.Api.csproj
```

**Testes unitários:**
```bash
 - **Testes front-end DEVEM usar Vitest** (não Jest)
 - Validar que imports do Vitest estão presentes: `import { describe, it, expect, vi, beforeEach } from 'vitest'`
**Cobertura de testes:**
```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
**Instalar dependências:**
```bash
cd frontend && npm install
```

**Executar em desenvolvimento:**
```bash
npm start
```

**Build produção:**
```bash
npm run build
```

**Testes (⚠️ OBRIGATÓRIO usar este comando):**
```bash
npm test
# OU explicitamente:
npx vitest run tests
```

**Testes em modo watch (desenvolvimento):**
```bash
npm run test:watch
```

### Docker

**Build containers:**
```bash
docker-compose build
```

**Iniciar ambiente completo:**
```bash
docker-compose up -d
```

**Parar containers:**
```bash
docker-compose down
```

## Diretrizes de Código

### Princípios Fundamentais

1. **Linguagem Ubíqua**: Use termos do domínio PDP (ProgramacaoEnergetica, DadosHidraulicos, DadosTermicos, OfertaExportacao, ComentarioDESSEM)
2. **SRP (Single Responsibility)**: Cada classe com uma única responsabilidade
3. **Testes Obrigatórios**: Todo código novo deve ter testes unitários
4. **Código Limpo**: Métodos pequenos, evitar duplicação, preferir composição

### .NET 8 - Padrões

**Controllers:**
- Apenas orquestração e retorno HTTP
- Sem regras de negócio
- Sem acesso direto ao banco
- Use `async/await` consistentemente

```csharp
[ApiController]
[Route("api/[controller]")]
public class DadosHidraulicosController : ControllerBase
{
    private readonly IDadosHidraulicosService _service;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DadosHidraulicosDto>>> Get()
    {
        var dados = await _service.ObterTodosAsync();
        return Ok(dados);
    }
}
```

**Services:**
- Exclusivamente regras de negócio
- Injeção de dependências via construtor
- Retornar DTOs, não entidades diretamente

**Repositórios:**
- Apenas acesso a dados
- Usar Entity Framework Core
- Métodos async

**Nomenclatura:**
- Classes: PascalCase
- Métodos: PascalCase com verbos (Obter, Criar, Atualizar, Remover)
- Variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE

### React - Padrões

**Componentes:**
- Functional components com hooks
- Manter estilo próximo ao original (WebForms)
- Props tipadas com TypeScript

```typescript
interface DadosHidraulicosProps {
  dados: DadosHidraulicos[];
  onSave: (dados: DadosHidraulicos) => void;
}

export const DadosHidraulicosTable: React.FC<DadosHidraulicosProps> = ({ dados, onSave }) => {
  // implementação
};
```

**Services:**
- Usar `fetch` ou `axios` para chamadas API
- Tratar erros adequadamente

**Nomenclatura:**
- Componentes: PascalCase
- Hooks customizados: use prefix (useDadosHidraulicos)
- Arquivos: PascalCase para componentes, camelCase para utils

**Testes com Vitest (⚠️ OBRIGATÓRIO):**
- ✅ **Framework**: Use `Vitest` exclusivamente (não use Jest)
- ✅ **Imports obrigatórios**: `import { describe, it, expect, vi, beforeEach } from 'vitest'`
- ✅ **Remova**: `@testing-library/jest-dom` e qualquer import de Jest
- ✅ **Mocks**: Use `vi.mock()` e `vi.fn()` (não `jest.mock()` ou `jest.fn()`)
- ✅ **Setup**: Use `vi.clearAllMocks()` em `beforeEach`
- ✅ **Cobertura mínima**: 100% de cobertura em cada componente
- ✅ **Casos de teste obrigatórios**:
  - Rendering (renderização correta)
  - Filtros e interações do usuário
  - Data loading (async/await com `waitFor`)
  - CRUD operations (create, read, update, delete)
  - Validações e regras de negócio
  - Accessibility (labels, ARIA, navegação por teclado)
  - Responsiveness (mobile, tablet, desktop)
  - Error handling (tratamento de erros)
  - Integration scenarios (fluxos completos)

Exemplo correto com Vitest:
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DadosHidraulicos from './DadosHidraulicos';

// Mock com Vitest (não jest.mock)
vi.mock('../services/api', () => ({
  get: vi.fn(),
  post: vi.fn(),
}));

describe('DadosHidraulicos Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar e carregar dados', async () => {
    render(<DadosHidraulicos />);
    
    await waitFor(() => {
      expect(screen.getByText('Dados Hidráulicos')).toBeInTheDocument();
    });
  });
});
```

## Convenções Git e Workflow

### Branches

- `main`: Código estável e testado
- `develop`: Integração de features
- `feature/nome-da-funcionalidade`: Desenvolvimento de novas features
- `bugfix/descricao-do-bug`: Correções

### Commits

Formato: `tipo(escopo): mensagem`

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `refactor`: Refatoração sem mudança de comportamento
- `test`: Adição de testes
- `docs`: Documentação

**Exemplos:**
```
feat(dados-hidraulicos): migrar tela de coleta e consulta
fix(ofertas): corrigir validação de data de exportação
refactor(services): aplicar padrão repository em DadosTermicos
test(dados-hidraulicos): adicionar testes unitários do service
```

### Workflow

1. Criar branch a partir de `develop`
2. Desenvolver em ciclos pequenos (1-3 dias)
3. Commit frequente com mensagens claras
4. Pull Request para `develop` com descrição detalhada
5. Code review obrigatório
6. Testes devem passar (bloqueiam merge se falharem)
7. Merge após aprovação

## Ciclos Pequenos de Entrega

### Estratégia de Migração Incremental

1. **Priorizar por criticidade**: Funcionalidades mais usadas primeiro
2. **Módulos independentes**: Migrar módulos que podem funcionar isoladamente
3. **Entregas frequentes**: Máximo 3 dias por ciclo
4. **Validação constante**: Testar a cada entrega com usuários

### Ordem de Prioridades (PDPw)

1. Dados Hidráulicos - Coleta e Consulta
2. Dados Térmicos - Coleta e Consulta
3. Oferta de Exportação
4. Comentários DESSEM
5. Funcionalidades secundárias

### Checklist por Ciclo

- [ ] Analisar código legado VB.NET em `legado/`
- [ ] Criar entidades no `Domain`
- [ ] Implementar repositórios no `Infrastructure`
- [ ] Criar services no `Application` com testes
- [ ] Criar controllers no `Web.Api`
- [ ] Desenvolver componentes React no `frontend/src`
- [ ] Testes unitários (back-end e front-end)
- [ ] Revisão de código
- [ ] Deploy em ambiente de homologação

## Considerações de Segurança

- **Segredos**: Nunca commitar credenciais ou connection strings
- **Configuração**: Usar variáveis de ambiente
- **HTTPS**: Obrigatório em produção
- **Validação**: Validar entrada em controllers e front-end
- **Autenticação/Autorização**: Implementar desde o início
- **Logs**: Não logar dados sensíveis

## Uso de IA no Desenvolvimento

### Permitido (com revisão obrigatória)

- Documentação técnica

- Código deve seguir padrões deste documento

### Proibido

- Código de segurança sem revisão humana
- Decisões arquiteturais sem validação
- Copiar código sem entendimento

## Vocabulário do Domínio (PDP)

### Conceitos Principais

- **PDP**: Programação Diária de Produção
- **DESSEM**: Modelo de despacho elétrico
- **Programação Energética**: Planejamento de geração de energia
- **Programação Elétrica**: Configuração da rede elétrica
- **Previsão Eólica**: Estimativa de geração eólica
- **Dados Hidráulicos**: Informações de usinas hidrelétricas
- **Dados Térmicos**: Informações de usinas termelétricas
- **Oferta de Exportação**: Propostas de exportação de térmicas
- **Energia Vertida Turbinável**: Água que passou por turbinas

### Termos Técnicos

- **Agente**: Entidade do setor elétrico (geradora, transmissora, distribuidora)
- **Insumos**: Dados de entrada para modelos
- **Finalização**: Conclusão do processo de programação
- **Coleta**: Recebimento de dados dos agentes

## Recursos e Documentação

- Manual de Boas Práticas: `/docs/manual_boas_praticas.pdf`
- Documentação .NET 8: https://learn.microsoft.com/dotnet/
- React Docs: https://react.dev/
- Entity Framework Core: https://learn.microsoft.com/ef/core/