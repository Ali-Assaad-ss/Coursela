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
        Task<List<AdminProductTableDto>> GetProducts(string adminId);
        Task<Product?> GetProduct(int id, string adminId);
        Task<Product?> DeleteProduct(int id, string adminId);

    }
}