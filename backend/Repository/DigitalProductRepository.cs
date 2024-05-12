using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.DigitalProduct;
using backend.Dto.Product;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class DigitalProductRepository
    {
        private readonly ApplicationDBContext _context;
        
        public DigitalProductRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<DigitalProduct> AddDigitalProduct(CreateNewProductDto productDto)
        {
            var product = new DigitalProduct
            {
                Name = productDto.Name,
            };
            await _context.DigitalProducts.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public async Task<DigitalProduct?> GetDigitalProduct(int id,string adminId)
        {
            var products= _context.Offers.Where(x=>x.AdminId==adminId).Select(x=>x.ProductId).ToList();
            if(products.Contains(id))
            {
                var product = await _context.DigitalProducts.FirstOrDefaultAsync(x => x.Id == id);
                return product;
            }
            return null;
        }
       
        public async Task<DigitalProduct?> AddFile(int id, string adminId, string fileName)
        {
            var product = await GetDigitalProduct(id, adminId);
            if (product == null)
            {
                return null;
            }
            product.FileName = fileName;
            await _context.SaveChangesAsync();
            return product;
        }


    }
}