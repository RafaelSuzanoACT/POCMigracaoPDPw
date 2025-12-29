# Contribuindo para o Projeto PDPw

Obrigado por contribuir para o projeto PDPw! Este documento fornece diretrizes para contribuições.

## Como Contribuir

### 1. Preparar o Ambiente

```bash
git clone <url-do-repositorio>
cd Automacao_POCMigracaoPDPw
dotnet restore
cd frontend && npm install && cd ..
```

### 2. Criar uma Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/descricao-da-feature develop
```

### 3. Desenvolver a Feature

Siga as convenções de código documentadas em [DEVELOPMENT.md](docs/DEVELOPMENT.md)

### 4. Testar

```bash
# Back-end
dotnet test tests/UnitTests

# Front-end (⚠️ OBRIGATÓRIO usar este comando)
cd frontend && npm test
# OU explicitamente:
cd frontend && npx vitest run tests
```

**Importante**: Para testes do front-end, sempre use `npx vitest run tests` para executar todos os testes de forma determinística.

### 5. Commit com Mensagem Clara

```bash
git commit -m "feat(dados-hidraulicos): implementar coleta de dados"
```

Formatos de commit:
- `feat(escopo): descrição` - Nova funcionalidade
- `fix(escopo): descrição` - Correção de bug
- `refactor(escopo): descrição` - Refatoração
- `test(escopo): descrição` - Adicionar testes
- `docs(escopo): descrição` - Documentação

### 6. Push e Pull Request

```bash
git push origin feature/descricao-da-feature
```

Crie um Pull Request com:
- Descrição clara do que foi implementado
- Referência a issues relacionadas
- Screenshots se relevante (UI changes)
- Checklist de testes

## Checklist para Pull Request

- [ ] Código segue convenções de codificação
- [ ] Adicionei testes unitários
- [ ] Testes unitários passam
- [ ] Documentação foi atualizada
- [ ] Sem código comentado ou debug
- [ ] Mensagens de commit são claras
- [ ] Não há conflitos com a branch base

## Code Review

Um membro do time reviará seu código. Durante a revisão:

- Melhorias sugeridas são feitas como comentários
- Discussões construtivas sobre design e implementação
- Aprovação quando o código está pronto

## Padrões de Código

### .NET / C#

```csharp
// ✅ Bom
public class DadosHidraulicosService
{
    public async Task<List<DadosHidraulicosDto>> ObterTodosAsync()
    {
        var dados = await _repository.ObterTodosAsync();
        return dados.Select(MapearParaDto).ToList();
    }
}

// ❌ Ruim
public class Service
{
    public List<Dto> GetAll()
    {
        return _repo.GetAll().ToList();
    }
}
```

### React / TypeScript

```typescript
// ✅ Bom
interface DadosHidraulicosTableProps {
  dados: DadosHidraulicos[];
  onSave: (dados: DadosHidraulicos) => Promise<void>;
}

export const DadosHidraulicosTable: React.FC<DadosHidraulicosTableProps> = ({
  dados,
  onSave
}) => {
  return <table>{/* ... */}</table>;
};

// ❌ Ruim
const Table = ({ data, onSave }: any) => {
  return <table>{/* ... */}</table>;
};
```

## Problemas Comuns

### Erro de Build

```bash
# Limpar cache
dotnet clean
dotnet restore
dotnet build
```

### Testes Falhando

- Verificar se migrations foram aplicadas
- Validar connection string
- Verificar mocks em testes unitários

### Conflitos de Merge

```bash
git fetch origin
git merge origin/develop
# Resolver conflitos e fazer commit
```

## Dúvidas?

- Consulte a documentação em `/docs`
- Leia o arquivo `.github/copilot-instructions.md`
- Abra uma issue para discussão
- Contate o tech lead

## Conduta

Todos os contribuidores devem:
- Ser respeitosos e incluivos
- Fornecer feedback construtivo
- Aceitar críticas com profissionalismo
- Focar na qualidade do código
