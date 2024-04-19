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
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace backend.Repository
{
    public class ProductRepositry:IProductRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

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

        public async Task<AdminViewProductDto?> GetProduct(int id,ApplicationUser User)
        {
            var Product = await _context.Products.FindAsync(id);
            if (Product != null)
            {
                var adminViewProductDto = new AdminViewProductDto()
                {
                    Id = Product.Id,
                    Name = Product.Name,
                    Description = Product.Description,
                    Image = Product.Image
                };
                return adminViewProductDto;
            }
            return null;
        }

        public async Task<List<AdminViewProductDto>> GetProducts(ApplicationUser user)
        {
            var Offerings =_context.Offers.Where(x => x.AdminId == user.Id).ToList();
            var products = new List<AdminViewProductDto>();
            foreach (var offering in Offerings)
            {
                var product = await _context.Products.FindAsync(offering.ProductId);
                if (product != null)
                {
                    var adminViewProductDto = new AdminViewProductDto()
                    {
                        Id = product.Id,
                        Name = product.Name,
                        Description = product.Description,
                        Image = product.Image
                    };
                    products.Add(adminViewProductDto);
                }
            }
            return products;
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
        // public async Task<Product?> AddProduct(NewProductDto newProductDto){
        //     if (newProductDto.Type=="course"){}

        // }
    }
}