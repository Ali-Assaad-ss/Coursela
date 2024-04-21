using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Interface;
using backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace backend.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDBContext _context;
        public CourseRepository(ApplicationDBContext context,IProductRepository productRepository)
        {
            _context = context;
            
        }
        public async Task<Course> AddCourse(Course course,string adminId)
        {

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> GetCourse(int id,string adminId)
        {
            var course = await _context.Courses.Where(x=>x.Id==id && x.Offerings.Any(x=>x.AdminId==adminId)).Include(x=>x.Sections).FirstOrDefaultAsync();
            if (course == null)
            {
                course = await _context.Courses.Where(x=>x.Id==id && x.Purchases.Any(x=>x.UserId==adminId)).Include(x=>x.Sections).FirstOrDefaultAsync();
                if (course == null) return null;
            
            }
            return course;
        }

    }
}