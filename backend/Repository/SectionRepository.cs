using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Model;

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
        public async Task<bool> DeleteSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section != null)
            {
                _context.Sections.Remove(section);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}