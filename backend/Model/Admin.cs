using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Admin:ApplicationUser
    {
        public List<Offer>? Offerings { get; set; }


    }
}