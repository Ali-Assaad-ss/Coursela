using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Lesson
    {
        public int LessonId { get; set; }
        public string LessonTitle { get; set; }
        public string LessonType { get; set; }
        public string LessonContent { get; set; }
        public string LessonVisibility { get; set; }
        public Section LessonSection { get; set; }
        public int SectionId { get; set; }
    }
}