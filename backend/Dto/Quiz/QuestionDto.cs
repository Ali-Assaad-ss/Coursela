using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Quiz
{
    public class QuestionDto
    {
        public string QuestionType { get; set; }
        public string Content { get; set; }
        public float MaxScore { get; set; }
        public string? CorrectResponse { get; set; }
        public List<string>? Choices { get; set; }
        public int Order { get; set; }
        
    }
}