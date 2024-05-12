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
using Microsoft.IdentityModel.Tokens;

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
                Type = x.Product.GetType().Name == "DigitalProduct" ? "DigitalDownload" : x.Product.GetType().Name,
                Members = x.Product.Purchases?.Count ?? 0,
                Price=x.Product.Price,
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
            var product = await GetProduct(id,adminId);
            if (product != null)
            {
                if (product.GetType().Name == "Course")
                {
                    var course= await _context.Courses.Include(x=>x.Section).ThenInclude(s=>s.Lessons).Where(x=>x.Id==product.Id).FirstOrDefaultAsync();
                    if (!course.Section.Lessons.IsNullOrEmpty())
                    {
                        _context.Lessons.RemoveRange(course.Section.Lessons);
                    }
                    _context.Sections.Remove(course.Section);
                }
                _context.Offers.RemoveRange(_context.Offers.Where(x => x.ProductId == id));
                _context.Purchases.RemoveRange(_context.Purchases.Where(x => x.ProductId == id));
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return product;
            }
            return null;
        }
        //add image to product
        public async Task<bool> AddImage(int id, string adminId)
        {
            var product = await GetProduct(id, adminId);
            if (product == null) return false;
            product.Image = true;
            await _context.SaveChangesAsync();
            return true;
        }
        //update product
        public async Task<Product?> UpdateProduct(int id, string adminId, UpdateProductDto product)
        {
            var oldProduct = await GetProduct(id, adminId);
            if (oldProduct == null) return null;
            oldProduct.Name = product.Name;
            oldProduct.Price = product.Price;
            oldProduct.Description = product.Description;
            oldProduct.Limit = product.Limit;
            oldProduct.Visibility = product.Visibility;
            await _context.SaveChangesAsync();
            return oldProduct;
        }



    }
}