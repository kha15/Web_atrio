using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Web_Atrio_Back.Models;

namespace Web_Atrio_Back.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Job> Jobs { get; set; }
    }
}
