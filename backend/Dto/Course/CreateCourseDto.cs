using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Course
{
    public class CreateCourseDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Price { get; set; }
        public string? Image { get; set; }
        public int Limit { get; set; }
        public bool Visibility { get; set; }
    }
}