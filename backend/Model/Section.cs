using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Section
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string CourseId { get; set; }
        public Course Course { get; set; }
        public Section? ParentSection { get; set; }
        public Section? ParentSectionId { get; set; }
        public List<Section>? ChildSections { get; set; }
        public List<Lesson>? Lessons { get; set; }
        public int Order { get; set; }
        public string Visibility { get; set; }
    }
}