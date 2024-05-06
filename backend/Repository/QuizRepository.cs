using backend.Data;
using backend.Dto.Quiz;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class QuizRepository

    {
        private readonly ApplicationDBContext _context;
        public QuizRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Question> AddQuestion(QuestionDto questionDto, int quizId, string adminId)
        {
            var quiz = await _context.Quizzes.Include(x => x.Questions).Where(x => x.Id == quizId).FirstOrDefaultAsync();
            var sections = await _context.Sections.Include(x => x.Lessons).ThenInclude(x => x.Quiz).Where(x => x.AdminId == adminId && x.Lessons.Any(x => x.QuizId == quizId)).ToListAsync();
            if (quiz == null || sections.Count == 0) return null;
            var question = new Question
            {
                Content = questionDto.Content,
                QuestionType = questionDto.QuestionType,
                MaxScore = questionDto.MaxScore,
                Choices = questionDto.Choices,
                CorrectResponse = questionDto.CorrectResponse,
                QuizId = quizId,
                Order = quiz.Questions.Count
            };
            quiz.Questions.Add(question);
            await _context.SaveChangesAsync();
            return question;
        }
    }
}