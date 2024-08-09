using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Message
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public DateTime MessageDate { get; set; }
        public string SenderId { get; set; }
        public int ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}