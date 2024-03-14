using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class Comunity
    {
        public string ComunityId { get; set; }
        public string ComunityName { get; set; }
        public string ComunityDescription { get; set; }
        public string ComunityImage { get; set; }
        public List<User> Users { get; set; }
        public List<User> Admins { get; set; }
    
    }
}