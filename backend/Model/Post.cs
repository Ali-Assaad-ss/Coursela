using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Post
    {
        public string PostId { get; set; }
        public string PostTitle { get; set; }
        public DateTime PostDate { get; set; }
        public string PostType { get; set; }
        public string PostContent { get; set; }
        public string PostImage { get; set; }
        public string PostVideo { get; set; }
        public int AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public bool IsPinned { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<View>? Views { get; set; }
        public List<Like>? Likes { get; set; }
        public int CommunityId { get; set; }
        public Community Community { get; set; }

    }
}