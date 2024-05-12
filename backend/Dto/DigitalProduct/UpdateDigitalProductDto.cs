using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.DigitalProduct
{
    public class UpdateDigitalProductDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Limit { get; set; }
        public bool Visibility { get; set; }

    }
}