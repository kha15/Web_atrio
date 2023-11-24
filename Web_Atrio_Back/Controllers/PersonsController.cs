using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Atrio_Back.Data;
using Web_Atrio_Back.Models;

namespace Web_Atrio_Back.Controllers
{
    // PersonsController.cs
    [ApiController]
    [Route("api/[controller]")]
    public class PersonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PersonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Person>> GetPersons()
        {
            var persons = _context.Persons.OrderBy(p => p.LastName).ToList();
            return Ok(persons);
        }
        private int CalculateAge(DateTime birthDate)
        {
            DateTime currentDate = DateTime.Now;
            int age = currentDate.Year - birthDate.Year;

            // Check if the birthday has occurred this year
            if (birthDate.Date > currentDate.AddYears(-age))
            {
                age--;
            }

            return age;
        }

        [HttpPost]
        public ActionResult<Person> CreatePerson(Person person)
        {
            if (CalculateAge(person.DateOfBirth) >= 150)
            {
                return BadRequest("Person cannot be older than 150 years.");
            }

            _context.Persons.Add(person);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetPersons), new { id = person.Id }, person);
        }

        [HttpGet("persons/details")]
        public IActionResult GetPersonsWithDetails()
        {
            var persons = _context.Persons
                .Include(p => p.Jobs.Where(j => j.EndDate == null || j.EndDate >= DateTime.Now)) // Filter current jobs
                .OrderBy(p => p.LastName)
                .ThenBy(p => p.FirstName)
                .ToList();

            var result = persons.Select(p => new
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DateOfBirth = p.DateOfBirth,
                Age = CalculateAge(p.DateOfBirth),
                Jobs = p.Jobs.Select(j => new
                {
                    Id = j.Id,
                    CompanyName = j.CompanyName,
                    Position = j.Position,
                    StartDate = j.StartDate,
                    EndDate = j.EndDate
                }).ToList()
            });

            return Ok(result);
        }

        [HttpGet("persons/bycompany/{companyName}")]
        public IActionResult GetPersonsByCompany(string companyName)
        {
            var persons = _context.Persons
                .Include(p => p.Jobs.Where(j => j.CompanyName == companyName))
                .OrderBy(p => p.LastName)
                .ThenBy(p => p.FirstName)
                .ToList();

            var result = persons.Select(p => new
            {
                Id = p.Id,
                FirstName = p.FirstName,
                LastName = p.LastName,
                DateOfBirth = p.DateOfBirth,
                Age = CalculateAge(p.DateOfBirth),
                Jobs = p.Jobs.Select(j => new
                {
                    Id = j.Id,
                    CompanyName = j.CompanyName,
                    Position = j.Position,
                    StartDate = j.StartDate,
                    EndDate = j.EndDate
                }).ToList()
            });

            return Ok(result);
        }
    }
}
