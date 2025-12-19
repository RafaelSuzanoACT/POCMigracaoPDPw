# Guia de Migração do Legado

## Objetivo

Migrar funcionalidades do código VB.NET/WebForms legado para a arquitetura moderna (.NET 8 + React) de forma incremental e controlada.

## Processo de Migração

### 1. Análise do Código Legado

Consulte a pasta `legado/` para entender:
- Estrutura de dados (tabelas, campos)
- Regras de negócio (validações, cálculos)
- Fluxos de trabalho (sequência de operações)
- Interface com usuário (layout, campos visíveis)

### 2. Mapear Entidades

Crie o modelo de domínio baseado no legado:
```csharp
// Domain/Entities/DadosHidraulicos.cs
public class DadosHidraulicos : EntityBase
{
    public string NomeUsina { get; set; } = string.Empty;
    public decimal VazaoAfluente { get; set; }
    public decimal VolumeUtil { get; set; }
    public DateTime DataMedicao { get; set; }
}
```

### 3. Configurar Entity Framework

Configure o mapeamento no `PdpwDbContext`:
```csharp
modelBuilder.Entity<DadosHidraulicos>(entity =>
{
    entity.ToTable("TB_DADOS_HIDRAULICOS");
    entity.HasKey(e => e.Id);
    entity.Property(e => e.NomeUsina).HasMaxLength(255).IsRequired();
});
```

### 4. Implementar Repositório

```csharp
// Infrastructure/Repositories/DadosHidraulicosRepository.cs
public class DadosHidraulicosRepository : IDadosHidraulicosRepository
{
    public async Task<List<DadosHidraulicos>> ObterTodosAsync()
    {
        return await _context.DadosHidraulicos.ToListAsync();
    }
}
```

### 5. Criar Service de Negócio

```csharp
// Application/Services/DadosHidraulicosService.cs
public class DadosHidraulicosService
{
    public async Task<List<DadosHidraulicosDto>> ObterTodosAsync()
    {
        var dados = await _repository.ObterTodosAsync();
        return _mapper.Map<List<DadosHidraulicosDto>>(dados);
    }
}
```

### 6. Expor via API

```csharp
// Web.Api/Controllers/DadosHidraulicosController.cs
[ApiController]
[Route("api/[controller]")]
public class DadosHidraulicosController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<DadosHidraulicosDto>>> Get()
    {
        var dados = await _service.ObterTodosAsync();
        return Ok(dados);
    }
}
```

### 7. Implementar Frontend

```typescript
// frontend/src/pages/DadosHidraulicos.tsx
export const DadosHidraulicos: React.FC = () => {
  const [dados, setDados] = useState<DadosHidraulicos[]>([]);

  useEffect(() => {
    apiClient.get<DadosHidraulicos[]>('/dados-hidraulicos')
      .then(setDados)
      .catch(console.error);
  }, []);

  return (
    <table>
      {/* renderizar dados */}
    </table>
  );
};
```

## Estratégia de Migração

### Fases

1. **Fase 1**: Dados Hidráulicos (coleta e consulta)
2. **Fase 2**: Dados Térmicos (coleta e consulta)
3. **Fase 3**: Oferta de Exportação
4. **Fase 4**: Comentários DESSEM
5. **Fase 5**: Funcionalidades secundárias

### Testes de Migração

1. Validar dados antes e depois da migração
2. Comparar resultados com sistema legado
3. Testar em ambiente de staging antes de produção
4. Manter sistema legado rodando em paralelo durante transição

## Troubleshooting

### Problema: Dados não aparecem após migração

1. Verificar connection string no `appsettings.json`
2. Executar migrations: `dotnet ef database update`
3. Verificar se tabelas foram criadas no banco
4. Revisar mapeamento no Entity Framework

### Problema: Erro ao consultar dados

1. Verificar logs da aplicação
2. Testar query no SQL Server Management Studio
3. Revisar LINQ no repositório

### Problema: Interface não atualiza

1. Verificar se API está retornando dados
2. Testar chamada à API com curl ou Postman
3. Verificar console do navegador para erros
4. Revisar service de API no frontend
