using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Product
{
    public class NewProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type{get;set;}
        public int members { get; set; }=0;
    }
}