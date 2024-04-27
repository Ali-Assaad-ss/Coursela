using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Section
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public List<Lesson>? Lessons { get; set; }
        public string Visibility { get; set; }
        public string AdminId { get; set; }
    }
}