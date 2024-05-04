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
        public string Content { get; set; }=string.Empty;
        public string? Description { get; set; }=string.Empty;
        public string Visibility { get; set; }
        public int ParentSectionId { get; set; }
        public Section? ParentSection { get; set; }
        public int? ChildSectionId { get; set; }=null;
        public Section? ChildSection { get; set; }
        public int Order { get; set; }
    }
}