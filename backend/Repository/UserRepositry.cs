using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using backend.Data;
using backend.Interface;
using backend.Model;

namespace backend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDBContext _context;
        public UserRepository(ApplicationDBContext context)
        {
            _context = context;
        
        }
        public async Task<ApplicationUser> AddUser(ApplicationUser user)
        {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
        }
        }
}