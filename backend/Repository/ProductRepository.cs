using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
using backend.Interface;
using backend.Model;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace backend.Repository
{
    public class ProductRepositry:IProductRepository
    {
        private readonly ApplicationDBContext _context;
        public ProductRepositry(ApplicationDBContext context)
        {
            _context = context;
            
        }
        public async Task<Product?> DeleteProduct(int id)
        {
            var Product =await _context.Products.FindAsync(id);
            if (Product != null)
            {
                _context.Products.Remove(Product);
                await _context.SaveChangesAsync();
                
            }
            return Product;

        }

        public async Task<Product?> GetProduct(int id)
        {
            var Product = await _context.Products.FindAsync(id);
            return Product;
        }
        public async Task<List<Product>> GetProducts(string AdminId)
        {
            var Offerings =_context.Offers.Where(x => x.AdminId == AdminId).ToList();
            List<Product> Products = new List<Product>();
            foreach (var offering in Offerings)
            {
                var Product = await _context.Products.FindAsync(offering.ProductId);
                if (Product != null)
                {
                    Products.Add(Product);
                }
            }
            return Products;
        }

        public async Task<Product?> UpdateProduct(int id, UpdateProductDto updateCourseDto)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product != null)
            {
                if (updateCourseDto.Name != null)
                {
                    Product.Name = updateCourseDto.Name;
                }
                if (updateCourseDto.Description != null)
                {
                    Product.Description = updateCourseDto.Description;
                }
                if (updateCourseDto.Image != null)
                {
                    Product.Image = updateCourseDto.Image;
                }
                await _context.SaveChangesAsync();
                
            }
            return Product;
        }
    }
}