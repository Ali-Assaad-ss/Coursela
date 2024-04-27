using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Course : Product
    {
        public int SectionId { get; set; }
        public Section? Section{ get; set; }
    }
}