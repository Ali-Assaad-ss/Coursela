using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public string Visibility { get; set; }
        public Section Section { get; set; }
        public int SectionId { get; set; }
    }
}