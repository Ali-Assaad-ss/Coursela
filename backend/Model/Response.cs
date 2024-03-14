using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Response
    {
        public int ResponseId { get; set; }
        public string? ResponseType { get; set; }
        public string ResponseContent { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public int UserId { get; set; }
        public float Score { get; set; }
    }
}