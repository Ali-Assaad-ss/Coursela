using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Product
{
    public class AdminProductTableDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public double? Price { get; set; }
        public int Members { get; set; }
    }
}