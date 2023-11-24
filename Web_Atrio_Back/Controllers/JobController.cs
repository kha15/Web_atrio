using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Atrio_Back.Data;
using Web_Atrio_Back.Models;

namespace Web_Atrio_Back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{companyId}")]
        public ActionResult<IEnumerable<Person>> GetPersonsByCompany(string companyName)
        {
            var persons = _context.Jobs
                .Where(j => j.CompanyName == companyName)
                .Select(j => j.Person)
                .Distinct()
                .ToList();

            return Ok(persons);
        }

        [HttpGet("persons/{personId}/jobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobsByPersonAndDateRange(int personId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var jobs = await _context.Jobs
                .Where(j => j.PersonId == personId && j.StartDate >= startDate && (j.EndDate == null || j.EndDate <= endDate))
                .ToListAsync();

            return jobs;
        }
    }
}
