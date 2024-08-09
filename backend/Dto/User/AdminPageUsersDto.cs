using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.User
{
    public class AdminPageUsersDto
    {

        public string? Id { get; set; }
        public string? Username { get; set; }
        public float? Paid { get; set; }

    }
}