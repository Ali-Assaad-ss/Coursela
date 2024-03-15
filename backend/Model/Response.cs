using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Response
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string? Content { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public float Score { get; set; }
    }
}