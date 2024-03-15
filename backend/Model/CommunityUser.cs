using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class CommunityUser
    {
        public int UserId { get; set; }
        public int ComunityId { get; set; }
        public ApplicationUser User { get; set; }
        public Community Community { get; set; }
    }
}