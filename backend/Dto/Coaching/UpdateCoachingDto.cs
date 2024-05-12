using backend.Model;

namespace backend.Dto.Coaching
{
    public class UpdateCoachingDto
    {
        public string Name { get; set; }
        public string Description  { get; set; }
        public List<WeeklyAvailability> WeeklyAvailabilities { get; set; }
        public List<SpecificDays> SpecificDays { get; set; }
        public double Price { get; set; }
        public int Limit { get; set; }

    }
}