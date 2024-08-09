using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interface;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PurchasesRepository(ApplicationDBContext context)
    {
        private readonly ApplicationDBContext _context = context;
        public async Task<List<Purchase>> GetAllPurchases()
        {
            var purchases = await _context.Purchases.Include(x => x.User).ToListAsync();
            return purchases;
        }
        //get users that made purchase using product id
        public async Task<List<User>> GetUsersByProductId(int productId)
        {
            var users = await _context.Purchases
                                      .Where(p => p.ProductId == productId)
                                       .Select(p => p.User)
                                      .Distinct()
                                      .ToListAsync();
            return users;
        }

    }
}