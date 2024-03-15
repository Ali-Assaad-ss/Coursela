using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Question
    {

        public string? QuestionType { get; set; }
        public float MaxScore { get; set; }
        public int ResponseId { get; set; }
        public List<Response> Responses { get; set; }
        public string? CorrectResponse { get; set; }
        public int QuizId {get;set;}
        public Quiz Quiz {get;set;}
        

    }
}