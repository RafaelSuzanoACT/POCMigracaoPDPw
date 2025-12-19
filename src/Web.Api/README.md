# Web.Api

Camada de apresentação com controllers ASP.NET Core.

## Responsabilidades

- **Controllers**: Orquestração de requisições HTTP
- **Configuração**: Middleware e injeção de dependências
- **Roteamento**: Endpoints da API REST

## Estrutura

```
Web.Api/
├── Controllers/        # Controllers REST
├── Program.cs         # Configuração da aplicação
├── appsettings.json   # Configurações
└── Web.Api.csproj
```

## Exemplo de Controller

```csharp
namespace Web.Api.Controllers;

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
    public async Task<ActionResult<List<DadosHidraulicosDto>>> Get()
    {
        var dados = await _service.ObterTodosAsync();
        return Ok(dados);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DadosHidraulicosDto>> GetById(int id)
    {
        var dado = await _service.ObterPorIdAsync(id);
        if (dado == null)
            return NotFound();
        return Ok(dado);
    }

    [HttpPost]
    public async Task<ActionResult<DadosHidraulicosDto>> Create([FromBody] CriarDadosHidraulicosDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var resultado = await _service.CriarAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = resultado.Id }, resultado);
    }
}
```

## Convenções

- Controllers herdam de `ControllerBase`
- Use `[ApiController]` e `[Route]`
- Métodos HTTP: `Get`, `Post`, `Put`, `Delete`
- Sempre retornar `ActionResult<T>`
- Usar `async/await` consistentemente
- Validar `ModelState` antes de processar
- Injetar services via construtor

## Configuração (Program.cs)

Registrar services:
```csharp
builder.Services.AddScoped<IDadosHidraulicosService, DadosHidraulicosService>();
builder.Services.AddScoped<IDadosHidraulicosRepository, DadosHidraulicosRepository>();
```

## Controllers não fazem lógica de negócio

Controllers são responsáveis exclusivamente por:
- Orquestrar chamadas aos services
- Validar entrada HTTP
- Retornar respostas apropriadas

Nunca coloque em controllers:
- Queries LINQ diretas
- Cálculos de negócio
- Acesso direto ao banco de dados
