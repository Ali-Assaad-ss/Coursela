using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class SectionRepository
    {
        private readonly ApplicationDBContext _context;
        public SectionRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task AddSection(Section section)
        {
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();
        }
        //delete course
        public async Task<bool> DeleteSection(int id, string adminId)
        {
            var section = await _context.Sections.Include(x=>x.Lessons).Where(x => x.Id == id).FirstOrDefaultAsync();
            if (section == null || section.AdminId != adminId) return false;
            var course=await _context.Courses.Where(x=>x.SectionId==id).FirstOrDefaultAsync();
            if (course!=null) return false;
            _context.Lessons.RemoveRange(section.Lessons);
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<Section?> GetSection(int id, string adminId)
        {
            {
                var course = await _context.Courses.Include(x => x.Section).ThenInclude(x=>x.Lessons).Where(x => x.Offerings.Any(x => x.AdminId == adminId) && x.SectionId == id).FirstOrDefaultAsync();
                return course.Section;
            }
        }
    }
}