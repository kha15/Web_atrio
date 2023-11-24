namespace Web_Atrio_Back.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int PersonId { get; set; }
        public Person Person { get; set; }
    }
}
