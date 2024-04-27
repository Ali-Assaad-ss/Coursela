using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Lesson
{
    public class NewLessonDto
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }=string.Empty;
        public string Visibility { get; set; }
        public int ParentSectionId { get; set; }
    }
}