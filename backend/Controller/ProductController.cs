using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interface;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepositry;
        public ProductController(IProductRepository productRepositry)
        {
            _productRepositry = productRepositry;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            await Task.Delay(10);
            return Ok();
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var Product= await _productRepositry.DeleteProduct(id);
            if (Product == null)
            {
                return NotFound();
            }
            return NoContent();

        }

        
    }
}