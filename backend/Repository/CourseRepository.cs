using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Interface;
using backend.Model;
using Microsoft.EntityFrameworkCore;
namespace backend.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDBContext _context;
        public CourseRepository(ApplicationDBContext context, IProductRepository productRepository)
        {
            _context = context;

        }
        public async Task<Course> AddCourse(Course course, string adminId)
        {

            var section = new Section
            {
                Title = course.Name,
                Lessons = [],
                Visibility = "visible",
                AdminId = adminId
            };
            await _context.Sections.AddAsync(section);
            await _context.SaveChangesAsync();
            course.SectionId = section.Id;
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();

            return course;
        }

        public async Task<Course?> GetCourse(int id, string adminId)
        {
            var course= await _context.Courses.Include(x=>x.Section).ThenInclude(x=>x.Lessons).Where(x=>x.Offerings.Any(x=>x.AdminId==adminId) && x.Id==id).FirstOrDefaultAsync();
            return course;
        }
    }
}