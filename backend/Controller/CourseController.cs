using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Course;
using backend.Interface;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/course")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepositry;
        public CourseController(ICourseRepository _courseRepositry)
        {
            this._courseRepositry = _courseRepositry;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var Course = await _courseRepositry.GetCourse(id);
            if (Course == null)
            {
                return NotFound();
            }
            return Ok(Course);
        }
        [HttpPost]
        public async Task<IActionResult> AddCourse([FromBody] CreateCourseDto course)
        {
            var newCourse= new Course{
                Name = course.Name,
                Description = course.Description,
                Price = course.Price,
                Image = course.Image,
                Limit = course.Limit,
                Visibility = course.Visibility
            };

            var CreatedCourse = await _courseRepositry.AddCourse(newCourse);
            return CreatedAtAction(nameof(GetCourse), new { id = newCourse.Id }, newCourse);
        }
        
    }
}