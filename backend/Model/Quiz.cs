using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Quiz:Lesson
    {
        public List<Question>? Questions { get; set; }
    }
}