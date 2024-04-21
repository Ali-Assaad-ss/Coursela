using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Interface;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace backend.Repository
{
    public class ProductRepositry : IProductRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProductRepositry(ApplicationDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }

        public async Task<List<AdminProductTableDto>> GetProducts(string adminId)
        {
            var offers = await _context.Offers.Where(x => x.AdminId == adminId).Include(o => o.Product).ToListAsync();
            return offers.Select(x => new AdminProductTableDto
            {
                Id = x.Product.Id,
                Name = x.Product.Name,
                Type = x.Product.GetType().Name,
                Members = x.Product.Purchases?.Count ?? 0
            }).ToList();
        }
        public async Task<Product?> GetProduct(int id,string adminId)
        {
            var offers = await _context.Offers.Where(x => x.AdminId == adminId).Include(o => o.Product).Where(x => x.ProductId == id).FirstOrDefaultAsync();
            if (offers == null)
                return null;
            return offers.Product;
        }
        public async Task<Product?> DeleteProduct(int id, string adminId)

        {
            var product = GetProduct(id,adminId).Result;
            if (product != null)
            {
                if (product.GetType().Name == "Course")
                {
                    _context.Sections.RemoveRange(_context.Sections.Where(x => x.CourseId == product.Id));
                }
                _context.Offers.RemoveRange(_context.Offers.Where(x => x.ProductId == id));
                _context.Purchases.RemoveRange(_context.Purchases.Where(x => x.ProductId == id));
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return product;
            }
            return null;
        }



    }
}