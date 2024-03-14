using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Section
    {
        public string SectionId { get; set; }
        public string SectionTitle { get; set; }
        public string SectionDescription { get; set; }
        public string SectionImage { get; set; }
        public List<Lesson> Lessons { get; set; }
        

    }
}