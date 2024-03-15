using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Model
{
    public class Offer
    {
        public int Id { get; set; }
        public string AdminId { get; set; }
        public Admin Admin { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}