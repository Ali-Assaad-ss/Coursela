using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public DateTime CommnetDate { get; set; }
    
    }
}