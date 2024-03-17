using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Course;
using backend.Dto.Product;
using backend.Interface;
using backend.Model;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace backend.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDBContext _context;
        public CourseRepository(ApplicationDBContext context)
        {
            _context = context;
            
        }
        public async Task<Course> AddCourse(Course course)
        {

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> GetCourse(int id)
        {
            var Course = await _context.Courses.FindAsync(id);
            return Course;
        }

        public async Task<Course?> UpdateCourse(int id, UpdateProductDto updateCourseDto)
        {
            var Course = await _context.Courses.FindAsync(id);
            if (Course != null)
            {
            }
            return Course;
        }
    }
}