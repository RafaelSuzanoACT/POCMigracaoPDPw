namespace Domain.Entities;

/// <summary>
/// Entidade base para todas as entidades de domínio do PDPw
/// </summary>
public abstract class EntityBase
{
    public int Id { get; set; }
    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    public DateTime? DataAtualizacao { get; set; }
}
