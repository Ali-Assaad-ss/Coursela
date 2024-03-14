using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Course : Product
    {
        public List<Section>? Sections { get; set; }
        

    }
}