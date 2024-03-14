using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Message
    {
        public ChatRoom ChatRoom { get; set; }
        public string MessageId { get; set; }
        public string MessageType { get; set; }
        public string MessageContentUrl { get; set; }
        public DateTime MessageDate { get; set; }
        public int SenderId { get; set; }
        public bool FromAdmin { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Like> Likes { get; set; }
    }
}