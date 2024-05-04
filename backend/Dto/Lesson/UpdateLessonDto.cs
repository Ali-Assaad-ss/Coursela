using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Lesson
{
    public class UpdateLessonDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Visibility { get; set; }
        public string? Description { get; set; }
    }
}