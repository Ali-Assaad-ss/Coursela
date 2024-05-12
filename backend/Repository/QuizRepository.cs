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
        public async Task<Question> UpdateQuestion(QuestionDto questionDto, int id, string adminId)
        {
            var question = await _context.Questions.Where(x => x.Id == id).Include(x => x.Quiz).FirstOrDefaultAsync();
            var sections = await _context.Sections.Include(x => x.Lessons).ThenInclude(x => x.Quiz).Where(x => x.AdminId == adminId && x.Lessons.Any(x => x.QuizId == question.QuizId)).ToListAsync();
            if (question == null || sections.Count == 0) return null;

            question.Content = questionDto.Content;
            question.QuestionType = questionDto.QuestionType;
            question.MaxScore = questionDto.MaxScore;
            question.Choices = questionDto.Choices;
            question.CorrectResponse = questionDto.CorrectResponse;

            await _context.SaveChangesAsync();
            return question;
        }
        public async Task<List<Question>> SortQuestions(string adminId, List<int> questionIds)
        {
            var id = questionIds[0];
            var quiz = await _context.Quizzes.Where(x => x.Questions.Any(x => x.Id == id)).FirstOrDefaultAsync();
            var sections = await _context.Sections.Include(x => x.Lessons).ThenInclude(x => x.Quiz).Where(x => x.AdminId == adminId && x.Lessons.Any(x => x.QuizId == quiz.Id)).ToListAsync();
            List<Question> questions = [];
            for (int i = 0; i < questionIds.Count; i++)
            {
                var question = await _context.Questions.Where(x => x.Id == questionIds[i]).FirstOrDefaultAsync();
                questions.Add(question);
                
            }
            await _context.SaveChangesAsync();
            return questions;
        }
        public async Task<bool> DeleteQuestion(int id,string adminId)
        {
            var question = await _context.Questions.Where(x => x.Id == id).FirstOrDefaultAsync();
            var sections = await _context.Sections.Include(x => x.Lessons).ThenInclude(x => x.Quiz).Where(x => x.AdminId == adminId && x.Lessons.Any(x => x.QuizId == question.QuizId)).ToListAsync();
            if (question == null || sections.Count == 0) return false;
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}