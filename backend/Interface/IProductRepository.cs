using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Product;
using backend.Model;

namespace backend.Interface
{
    public interface IProductRepository
    {
        Task<Product?> DeleteProduct(int id);
        Task<AdminViewProductDto?> GetProduct(int id, ApplicationUser User);
        Task<List<AdminViewProductDto>> GetProducts(ApplicationUser user);
        Task<Product?> UpdateProduct(int id, UpdateProductDto updateCourseDto);
        // Task<Product?> AddProduct(NewProductDto newProductDto);
        

    }
}