using backend.Data;
using backend.Dto.Lesson;
using backend.Dto.Section;
using backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Repository
{
    public class LessonRepository(ApplicationDBContext context)
    {
        protected readonly ApplicationDBContext _context = context;

        public async Task<List<Lesson>?> GetLessons(string adminId, int ParentsectionId)
        {
            var section = await _context.Sections.Where(x => x.Id == ParentsectionId).FirstOrDefaultAsync();
            if (section == null || section.AdminId != adminId) return null;
            return [.. section.Lessons.OrderBy(x => x.Order)];
        }
        public async Task<Lesson?> GetLesson(int lessonId, string adminId)
        {
            var lesson = await _context.Lessons.Include(x=>x.Quiz).ThenInclude(x=>x.Questions).Include(x=>x.ChildSection).ThenInclude(x=>x.Lessons).Where(x => x.Id == lessonId && x.ParentSection.AdminId == adminId).FirstOrDefaultAsync();
            if((lesson.Type=="quiz")&&(lesson.Quiz.Questions!=null))
                lesson.Quiz.Questions=[..lesson.Quiz.Questions.OrderBy(x=>x.Order)];
            if ((lesson.Type == "section") && (lesson.ChildSection.Lessons != null))
                lesson.ChildSection.Lessons = [..lesson.ChildSection.Lessons.OrderBy(x => x.Order)];
            return lesson;
        }
        public async Task<Lesson?> AddLesson(string adminId, NewLessonDto lessonDto)
        {
            string[] validTypes = ["section", "text", "video", "quiz", "image", "pdf", "file"];
            if (!validTypes.Contains(lessonDto.Type) || string.IsNullOrWhiteSpace(lessonDto.Title)) return null;

            var section = await _context.Sections.Include(x => x.Lessons).Where(x => x.Id == lessonDto.ParentSectionId).FirstOrDefaultAsync();
            if (section == null || section.AdminId != adminId) return null;
            Section childSection = null;
            Quiz quiz = null;
            if (lessonDto.Type == "section")
            {
                childSection = new Section
                {
                    Lessons = [],
                    AdminId = adminId,
                };
                await _context.Sections.AddAsync(childSection);
                await _context.SaveChangesAsync();
            }
            if (lessonDto.Type == "quiz")
            {
                quiz = new Quiz
                {
                    Questions=[],
                };
                await _context.Quizzes.AddAsync(quiz);
                await _context.SaveChangesAsync();
            }
            int order = section.Lessons.Count;
            var lesson = new Lesson
            {
                Title = lessonDto.Title,
                Type = lessonDto.Type,
                ParentSectionId = lessonDto.ParentSectionId,
                Visibility = "members",
                Order = order,
            };
            if (lessonDto.Type == "section")
                lesson.ChildSectionId = childSection.Id;

            if (lessonDto.Type == "quiz")
                lesson.QuizId = quiz.Id;

            await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }
        public async Task<Lesson?> UpdateLesson(int lessonId, string adminId, UpdateLessonDto lessonDto)
        {
            string[] visibility = ["members", "everyone", "hidden"];
            var lesson = await _context.Lessons.Where(x => x.Id == lessonId && x.ParentSection.AdminId == adminId).FirstOrDefaultAsync();
            if (lesson == null) return null;
            if (!string.IsNullOrWhiteSpace(lessonDto.Title))
                lesson.Title = lessonDto.Title;
            if (!string.IsNullOrWhiteSpace(lessonDto.Content))
                lesson.Content = lessonDto.Content;
            if (visibility.Contains(lessonDto.Visibility))
                lesson.Visibility = lessonDto.Visibility;
            if (!string.IsNullOrWhiteSpace(lessonDto.Description))
                lesson.Description = lessonDto.Description;
            await _context.SaveChangesAsync();
            return lesson;
        }

        public async Task<bool> DeleteLesson(int lessonId, string adminId)
        {

            var lesson = await _context.Lessons.Where(x => x.Id == lessonId && x.ParentSection.AdminId == adminId).FirstOrDefaultAsync();
            if (lesson == null) return false;
            _context.Lessons.Remove(lesson);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<Lesson>> SortLessons(string adminId, List<int> lessonIds)
        {
            var lessons = await _context.Lessons.Where(x => lessonIds.Contains(x.Id) && x.ParentSection.AdminId == adminId).ToListAsync();
            if (lessons.Count != lessonIds.Count) return null;
            for (int i = 0; i < lessonIds.Count; i++)
            {
                var lesson = await _context.Lessons.Where(x => x.Id == lessonIds[i]).FirstOrDefaultAsync();
                lesson.Order = i;
            }
            await _context.SaveChangesAsync();
            return lessons;
        }
        public async Task<Lesson?> AddLessonFile(int lessonId, string adminId, string fileName)
        {
            var lesson = await _context.Lessons.Where(x => x.Id == lessonId && x.ParentSection.AdminId == adminId).FirstOrDefaultAsync();
            if (lesson == null) return null;
            if (lesson.Type == "image" && fileName.EndsWith(".jpg") || fileName.EndsWith(".png") || fileName.EndsWith(".jpeg") || fileName.EndsWith(".gif"))
                lesson.Content = fileName;
            else if (lesson.Type == "pdf" && fileName.EndsWith(".pdf"))
                lesson.Content = fileName;
            else if (lesson.Type == "file")
                lesson.Content = fileName;
            else if (lesson.Type == "video" && fileName.EndsWith(".mp4") || fileName.EndsWith(".webm") || fileName.EndsWith(".ogg"))
                lesson.Content = fileName;
            else return null;
            await _context.SaveChangesAsync();
            return lesson;
        }

    }
}