namespace backend.Model
{
    public class WeeklyAvailability
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public string AdminId { get; set; }
        public Admin Admin;
        public List<TimeSlot> TimeSlots { get; set; }=[];
    }

    public class TimeSlot
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int? WeeklyAvailabilityId { get; set; }
        public WeeklyAvailability? WeeklyAvailability { get; set; }
        public int? SpecificDaysId { get; set; }
        public SpecificDays? SpecificDays { get; set; }
    }
    public class SpecificDays
    {
        public int Id { get; set; }
        public string AdminId { get; set; }
        public Admin Admin;
        public DateOnly Date { get; set; }
        public List<TimeSlot> TimeSlots { get; set; }
    }
}