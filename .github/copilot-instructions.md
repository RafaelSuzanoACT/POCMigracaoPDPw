# GitHub Copilot Instructions - Projeto PDPw

## Visão Geral do Projeto

Você está auxiliando na migração incremental do sistema PDPw (Programação Diária de Produção) de um legado .NET Framework 4.8/VB.NET com WebForms para uma arquitetura moderna usando .NET 8 (C#) no back-end e React no front-end.

O PDPw é um sistema crítico responsável pela coleta de dados para o processo de Programação Diária de Produção do setor elétrico brasileiro, incluindo dados hidráulicos, térmicos, ofertas de exportação e comentários do modelo DESSEM.

O objetivo é tornar a aplicação resiliente, containerizável e manutenível, mantendo todas as funcionalidades existentes e preservando a experiência do usuário o máximo possível.

## Stack Tecnológica

### Back-end
- .NET 8 com C# (migrando de .NET Framework 4.8/VB.NET)
- ASP.NET Core Web API (migrando de WebForms)
- Entity Framework Core para acesso a dados
- xUnit, Moq e FluentAssertions para testes unitários
- Docker para containerização

### Front-end
- React (versão mais atual) com TypeScript quando possível
- Jest e Testing Library para testes
- Estilo visual deve ser próximo ao das telas WebForms originais

### Infraestrutura
- Docker e Docker Compose para desenvolvimento local
- Git com workflow baseado em branches (main, develop, feature/*, bugfix/*)

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas:

- **legado/**: Código VB.NET/WebForms original (apenas leitura, não modificar - use como referência)
- **src/Web.Api/**: Controllers ASP.NET Core, configuração da API
- **src/Application/**: Services com regras de negócio
- **src/Domain/**: Entidades de domínio e interfaces
- **src/Infrastructure/**: Repositórios, Entity Framework, acesso a dados
- **frontend/src/**: Componentes React, páginas, services para chamadas API
- **tests/**: Testes unitários

## Diretrizes de Codificação

### Princípios Fundamentais

1. **Use Linguagem Ubíqua**: Sempre utilize os termos do domínio PDP no código. Exemplos: ProgramacaoEnergetica, DadosHidraulicos, DadosTermicos, OfertaExportacao, ComentarioDESSEM, Agente, Insumos, DESSEM. Evite termos genéricos como Manager, Helper, Utils.

2. **Responsabilidade Única (SRP)**: Cada classe deve ter apenas uma razão para mudar. Services contêm apenas regras de negócio, Repositories apenas acesso a dados, Controllers apenas orquestração HTTP.

3. **Código Limpo**: Métodos pequenos e coesos, evite duplicação, prefira composição à herança, use async/await consistentemente.

4. **Testes São Obrigatórios**: Todo código novo deve ter testes unitários. Testes devem ser determinísticos, rápidos e testar exclusivamente regras de negócio usando mocks para isolar dependências.

### Padrões .NET 8

**Controllers:**
- Controllers devem apenas orquestrar chamadas e retornar respostas HTTP
- Não coloque regras de negócio em controllers
- Não acesse banco de dados diretamente
- Use sempre async/await
- Nomenclatura de métodos: HttpGet, HttpPost, HttpPut, HttpDelete

Exemplo:
```csharp
[ApiController]
[Route("api/[controller]")]
public class DadosHidraulicosController : ControllerBase
{
    private readonly IDadosHidraulicosService _service;
    
    public DadosHidraulicosController(IDadosHidraulicosService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DadosHidraulicosDto>>> ObterTodos()
    {
        var dados = await _service.ObterTodosAsync();
        return Ok(dados);
    }
    
    [HttpPost]
    public async Task<ActionResult<DadosHidraulicosDto>> Criar([FromBody] CriarDadosHidraulicosDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
            
        var resultado = await _service.CriarAsync(dto);
        return CreatedAtAction(nameof(ObterPorId), new { id = resultado.Id }, resultado);
    }
}
```

**Services:**
- Exclusivamente regras de negócio da aplicação
- Receba dependências via injeção no construtor
- Retorne DTOs, nunca entidades de domínio diretamente
- Use nomenclatura com verbos em português: Obter, Criar, Atualizar, Remover, Validar

**Repositórios:**
- Apenas acesso a dados
- Use Entity Framework Core
- Todos os métodos devem ser async
- Nomenclatura: ObterPorIdAsync, ObterTodosAsync, AdicionarAsync, AtualizarAsync, RemoverAsync

**Nomenclatura C#:**
- Classes e métodos: PascalCase
- Variáveis e parâmetros: camelCase
- Interfaces: IPrefixo (ex: IDadosHidraulicosService)
- Constantes: UPPER_SNAKE_CASE

### Padrões React

**Componentes:**
- Use functional components com hooks
- Mantenha componentes pequenos e reutilizáveis
- O estilo visual deve ser próximo ao das telas WebForms originais
- Use TypeScript para tipar props e state

Exemplo:
```typescript
interface DadosHidraulicosTableProps {
  dados: DadosHidraulicos[];
  onSave: (dados: DadosHidraulicos) => void;
  onDelete: (id: number) => void;
}

export const DadosHidraulicosTable: React.FC<DadosHidraulicosTableProps> = ({ 
  dados, 
  onSave, 
  onDelete 
}) => {
  return (
    <table className="dados-hidraulicos-table">
      {/* implementação */}
    </table>
  );
};
```

**Services API:**
- Centralize chamadas HTTP em services
- Use async/await
- Trate erros adequadamente

**Nomenclatura React:**
- Componentes: PascalCase (ex: DadosHidraulicosForm.tsx)
- Hooks customizados: use prefix (ex: useDadosHidraulicos)
- Funções utilitárias: camelCase

### Testes Unitários

**Back-end (xUnit):**
```csharp
public class DadosHidraulicosServiceTests
{
    [Fact]
    public async Task ObterTodos_DeveRetornarListaDeDados()
    {
        // Arrange
        var mockRepository = new Mock<IDadosHidraulicosRepository>();
        mockRepository.Setup(r => r.ObterTodosAsync())
            .ReturnsAsync(new List<DadosHidraulicos> { /* dados teste */ });
        var service = new DadosHidraulicosService(mockRepository.Object);
        
        // Act
        var resultado = await service.ObterTodosAsync();
        
        // Assert
        resultado.Should().NotBeNull();
        resultado.Should().HaveCount(1);
    }
}
```

**Front-end (Jest + Testing Library):**
```typescript
describe('DadosHidraulicosTable', () => {
  it('deve renderizar tabela com dados', () => {
    const mockDados = [/* dados teste */];
    render(<DadosHidraulicosTable dados={mockDados} onSave={jest.fn()} />);
    
    expect(screen.getByText('Dados Hidráulicos')).toBeInTheDocument();
  });
});
```

## Abordagem de Migração Incremental

### Ciclos Pequenos de Entrega (1-3 dias)

A migração deve acontecer em ciclos curtos e incrementais, priorizando funcionalidades por criticidade:

**Prioridades PDPw:**
1. Dados Hidráulicos - Coleta e Consulta
2. Dados Térmicos - Coleta e Consulta
3. Oferta de Exportação
4. Comentários DESSEM
5. Funcionalidades secundárias

### Fluxo de Trabalho por Funcionalidade

Para cada funcionalidade a ser migrada:

1. **Análise do Legado**: Consulte o código VB.NET na pasta `legado/` para entender as regras de negócio
2. **Domínio**: Crie entidades no `Domain` refletindo o modelo de dados
3. **Infraestrutura**: Implemente repositórios no `Infrastructure` com Entity Framework Core
4. **Aplicação**: Crie services no `Application` com regras de negócio e testes unitários
5. **API**: Crie controllers no `Web.Api` para expor endpoints REST
6. **Front-end**: Desenvolva componentes React replicando a funcionalidade das telas WebForms
7. **Testes**: Garanta cobertura de testes unitários no back-end e front-end
8. **Validação**: Teste em ambiente de homologação antes de mergear

### Commits e Branches

Use commits frequentes com mensagens claras seguindo o padrão:

```
tipo(escopo): mensagem descritiva

Tipos: feat, fix, refactor, test, docs
Exemplos:
- feat(dados-hidraulicos): implementar coleta de dados hidráulicos
- fix(ofertas): corrigir validação de data de exportação
- refactor(services): aplicar padrão repository
- test(dados-termicos): adicionar testes unitários do service
```

Trabalhe em branches de feature a partir de `develop` e crie Pull Requests para integração.

## Segurança e Configuração

- **Nunca** commite credenciais, connection strings ou secrets no código
- Use variáveis de ambiente para configuração sensível
- Configure HTTPS para comunicação segura
- Valide entrada de dados tanto no back-end quanto no front-end
- Implemente autenticação e autorização adequadas
- Não logue dados sensíveis

## Uso de Inteligência Artificial

Ao gerar código usando IA:

- Sempre revise cuidadosamente o código gerado
- Garanta que o código segue os padrões definidos neste documento
- Verifique se a linguagem ubíqua do domínio está sendo respeitada
- Assegure-se de entender completamente o código antes de usar
- Não use código gerado por IA para funcionalidades de segurança sem revisão humana minuciosa

## Vocabulário do Domínio PDP

Sempre que estiver trabalhando com o código, use estes termos do domínio:

- **PDP**: Programação Diária de Produção
- **DESSEM**: Modelo computacional de despacho elétrico de curto prazo
- **Programação Energética**: Planejamento da geração de energia elétrica
- **Programação Elétrica**: Configuração da rede elétrica para operação
- **Previsão Eólica**: Estimativa de geração de energia eólica
- **Dados Hidráulicos**: Informações operacionais de usinas hidrelétricas (vazão, volume, geração)
- **Dados Térmicos**: Informações operacionais de usinas termelétricas (disponibilidade, geração, combustível)
- **Oferta de Exportação**: Propostas de exportação de energia de usinas térmicas
- **Energia Vertida Turbinável**: Volume de água que passou pelas turbinas da usina
- **Agente**: Entidade do setor elétrico (geradora, transmissora, distribuidora)
- **Insumos**: Dados de entrada necessários para os modelos de programação
- **Finalização**: Processo de conclusão e validação da programação diária
- **Coleta**: Processo de recebimento de dados dos agentes do setor

## Recursos e Documentação Disponível

- Código legado em VB.NET/WebForms disponível na pasta `legado/` (somente leitura)
- Manual de Boas Práticas do projeto
- Documentação oficial .NET 8: https://learn.microsoft.com/dotnet/
- Documentação React: https://react.dev/
- Documentação Entity Framework Core: https://learn.microsoft.com/ef/core/

## Contexto do Time

Este projeto está sendo conduzido por uma squad enxuta:
- 2 desenvolvedores back-end (.NET)
- 1 desenvolvedor front-end (React)
- 1 QA Engineer
- 0.5 Tech Lead (parcial)

Priorize soluções pragmáticas, bem testadas e documentadas que possam ser facilmente compreendidas e mantidas pela equipe.