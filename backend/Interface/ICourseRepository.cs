using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Course;
using backend.Dto.Product;
using backend.Model;

namespace backend.Interface
{
    public interface ICourseRepository
    {
        //create
        Task<Course> AddCourse(Course Course);
        //read
        Task<Course?> GetCourse(int id);
        //UpdateCourse
        Task<Course?> UpdateCourse(int id, UpdateProductDto updateCourseDto);

    }
}