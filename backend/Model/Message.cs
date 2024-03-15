using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Message
    {
        public string MessageId { get; set; }
        public string MessageType { get; set; }
        public string MessageContentUrl { get; set; }
        public DateTime MessageDate { get; set; }
        public int SenderId { get; set; }
        public int ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}