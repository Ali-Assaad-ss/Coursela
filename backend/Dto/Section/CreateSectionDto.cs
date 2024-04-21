using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Section
{
    public class CreateSectionDto
    {
        public string Title { get; set; }
        public int? ParentSectionId { get; set; }
        public int Order { get; set; }
        public string? Visibility { get; set; }
    }
}