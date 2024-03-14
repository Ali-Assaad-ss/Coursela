using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class ComunityUser
    {
        public int UserId { get; set; }
        public int ComunityId { get; set; }
        public User User { get; set; }
        public Comunity Comunity { get; set; }
    }
}