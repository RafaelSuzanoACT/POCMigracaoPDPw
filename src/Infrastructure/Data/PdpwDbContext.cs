using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Data;

/// <summary>
/// DbContext para o projeto PDPw
/// </summary>
public class PdpwDbContext : DbContext
{
    public PdpwDbContext(DbContextOptions<PdpwDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configurações de entidades serão adicionadas aqui
    }
}
