using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string? QuestionType { get; set; }
        public float MaxScore { get; set; }
        public List<string>? Choices { get; set; }
        public List<Response> Responses { get; set; }
        public string? CorrectResponse { get; set; }
        public int QuizId {get;set;}
        public Quiz Quiz {get;set;}
        public int Order { get; set; }
        
    }
}