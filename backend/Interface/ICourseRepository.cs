using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Product;
using backend.Model;

namespace backend.Interface
{
    public interface ICourseRepository
    {
        Task<Course> AddCourse(Course Course,string adminId);
        Task<Course?> GetCourse(int id ,string adminId);
    }
}