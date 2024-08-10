using System;
using FullStack.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace FullStack.Api.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<Note> Notes { get; set; }
}
