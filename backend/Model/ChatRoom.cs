using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class ChatRoom
    {
        public string ChatRoomId { get; set; }
        public int UserId { get; set; }
        public User Users { get; set; }
        public int AdminId { get; set; }
        public User Admin { get; set; }
        public List<Message> Messages { get; set; }
        
    
    
    }
}