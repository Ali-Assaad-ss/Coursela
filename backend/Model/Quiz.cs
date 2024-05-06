namespace backend.Model
{
    public class Quiz
    {
        public int Id { get; set; }
        public List<Question>? Questions { get; set; }
    }
}