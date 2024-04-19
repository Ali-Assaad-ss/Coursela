using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Extensions;
using backend.Interface;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepositry;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProductController(IProductRepository productRepositry, UserManager<ApplicationUser> userManager)
        {
            _productRepositry = productRepositry;
            _userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProducts()
        {
            var username = User.GetUsername();
            var admin =_userManager.Users.FirstOrDefault(x => x.UserName == username);
            var Products = await _productRepositry.GetProducts(admin);
            return Ok(Products);
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