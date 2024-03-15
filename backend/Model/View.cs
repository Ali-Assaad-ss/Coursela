using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class View
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        
    }
}