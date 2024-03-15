using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Video { get; set; }
        public string AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public bool IsPinned { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<View>? Views { get; set; }
        public List<Like>? Likes { get; set; }
        public int CommunityId { get; set; }
        public Community Community { get; set; }

    }
}