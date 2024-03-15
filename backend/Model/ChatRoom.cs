using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class ChatRoom
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string AdminId { get; set; }
        public Admin Admin { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public List<Message>? Messages { get; set; }
    }
}