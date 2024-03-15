using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string? Role { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }
        public List<Post>? Posts { get; set; }

        public List<Comment>? Comments { get; set; }
        public List<Like>? Likes { get; set; }
        public List<View>? Views { get; set; }
        public List<ChatRoom>? ChatRooms { get; set; }
        public List<Product>? Products { get; set; }

    }
}