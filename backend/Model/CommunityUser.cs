using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Model
{
    public class CommunityUser
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int CommunityId { get; set; }
        public ApplicationUser User { get; set; }
        public Community Community { get; set; }
    }
}