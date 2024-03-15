using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class AppUserChatRoom
    {
        public int AppUserID { get; set; }
        public int ChatRoomID { get; set; }
        public ApplicationUser AppUser { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}