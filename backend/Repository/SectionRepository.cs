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
        public async Task<Section?> GetSection(int id, string adminId)
        {
            {
                var course = await _context.Courses.Include(x => x.Section).ThenInclude(x=>x.Lessons).Where(x => x.Offerings.Any(x => x.AdminId == adminId) && x.SectionId == id).FirstOrDefaultAsync();
                return course.Section;
            }
        }
    }
}