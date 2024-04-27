using backend.Data;
using backend.Dto.Lesson;
using backend.Dto.Section;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class LessonRepository
    {
        protected readonly ApplicationDBContext _context;
        public LessonRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Lesson>?> GetLessons(string adminId,int ParentsectionId)
        {
            var section= await _context.Sections.Where(x=>x.Id==ParentsectionId).FirstOrDefaultAsync();
            if (section==null || section.AdminId!=adminId) return null;
            return section.Lessons;
        }
        public async Task<Lesson?> AddSection(string adminId,CreateSectionDto sectionDto){
            var section = await _context.Sections.Where(x=>x.Id==sectionDto.ParentSectionId).FirstOrDefaultAsync();
            if (section==null || section.AdminId!=adminId) return null;

            var childSection=new Section{
                Title=sectionDto.Title,
                Visibility="visible",
                Lessons=[],
                AdminId=adminId,
            };
            await _context.AddAsync(childSection);
            await _context.SaveChangesAsync();
            
            var lesson=new Lesson{
                Type="Section",
                ChildSectionId=childSection.Id,
                Visibility="Visible",
                ParentSectionId=sectionDto.ParentSectionId,
                Title=sectionDto.Title,
            };
            await _context.AddAsync(lesson);
            await _context.SaveChangesAsync();
            return lesson;
        }
        public async Task<Lesson?> AddLesson(string adminId,NewLessonDto lessonDto){
            var section= await _context.Sections.Where(x=>x.Id==lessonDto.ParentSectionId).FirstOrDefaultAsync();
            if (section==null || section.AdminId!=adminId) return null;
        
            var lesson=new Lesson{
                Title=lessonDto.Title,
                Type=lessonDto.Type,
                Content=lessonDto.Content,
                Visibility=lessonDto.Visibility,
                ParentSectionId=lessonDto.ParentSectionId,
            };
           await _context.Lessons.AddAsync(lesson);
            await _context.SaveChangesAsync();
            return lesson;

            
            
            

        }
    }
}