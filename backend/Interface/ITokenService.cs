using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using Microsoft.AspNetCore.Identity;

namespace backend.Interface
{
    public interface ITokenService
    {
        string CreateTokenAsync(ApplicationUser user,IList<string>? userRoles); 
    }
}