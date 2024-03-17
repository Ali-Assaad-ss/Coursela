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
        Task<Product?> GetProduct(int id);
        Task<List<Product>> GetProducts(string AdminId);
        Task<Product?> UpdateProduct(int id, UpdateProductDto updateCourseDto);
        

    }
}