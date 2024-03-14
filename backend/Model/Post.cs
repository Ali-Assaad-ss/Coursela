using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Post
    {
        public int ComunityId {get;set;}
        public Comunity Comunity { get; set; }
        public string PostId { get; set; }
        public string PostTitle { get; set; }
        public DateTime PostDate { get; set; }
        public string PostType { get; set; }
        public string PostContent { get; set; }
        public string PostImage { get; set; }
        public string PostVideo { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsPinned {get; set;}
        public List<Comment> Comments { get; set; }
        public List<Like> Likes { get; set; }
    
    }
}