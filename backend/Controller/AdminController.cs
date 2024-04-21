using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dto.Product;
using backend.Dto.Section;
using backend.Dto.User;
using backend.Extensions;
using backend.Interface;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly ICourseRepository _courseRepository;
        private readonly IProductRepository _productRepositry;
        private readonly SectionRepository _sectionRepository;
        private readonly IOfferRepository _offerRepository;
        public AdminController(UserManager<ApplicationUser> userManager, ITokenService tokenService, SignInManager<ApplicationUser> signInManager, ICourseRepository courseRepository, IProductRepository productRepository, SectionRepository sectionRepository, IOfferRepository offerRepository)
        {
            _signinManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
            _courseRepository = courseRepository;
            _productRepositry = productRepository;
            _sectionRepository = sectionRepository;
            _offerRepository = offerRepository;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Email.ToLower());
            if (user == null) user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());
            if (user == null) return Unauthorized("Invalid username");
            if (user.GetType().Name != "Admin") return Unauthorized("Not an admin!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");
            var userRoles = await _userManager.GetRolesAsync(user);

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateTokenAsync(user, userRoles)
                }
            );
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("validate")]
        public IActionResult Validate()
        {
            return Ok("Validated");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new Admin
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName
                };

                var createdUser = await _userManager.CreateAsync(user, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "Admin");
                    if (roleResult.Succeeded)
                    {
                        var userRoles = await _userManager.GetRolesAsync(user);
                        return Ok(
                            new NewUserDto
                            {
                                UserName = user.UserName,
                                Email = user.Email,
                                Token = _tokenService.CreateTokenAsync(user, userRoles)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        //getting all the products of the user
        [HttpGet("products")]
        [Authorize]
        public async Task<IActionResult> GetProducts()
        {
            var AdminId = User.GetUserId();
            var products = await _productRepositry.GetProducts(AdminId);
            return Ok(products);
        }

        //getting a Course by id
        [HttpGet("courses/{id}")]
        [Authorize]
        public async Task<IActionResult> GetCourses(int id)
        {
            var adminId =User.GetUserId() ;
            
            var courses = await _courseRepository.GetCourse(id, adminId);
            return Ok(courses);
        }
        //deleting a Product by id
        [HttpDelete("products/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var adminId =User.GetUserId() ;
            
            var courses = await _productRepositry.DeleteProduct(id, adminId);
            if (courses == null) return NotFound("Course not found");
            return Ok("course deleted successfully");
        }

        //creating a new product
        [HttpPost("product")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProduct([FromBody] NewProductDto productDto)
        {
            //get the admin id
            var adminId = User.GetUserId();
            //create the product
            //case of course
            if(productDto.Type == "Course")
            {
                Course newCourse = new()
                {
                    Name = productDto.Name,
                };
                var CreatedCourse = await _courseRepository.AddCourse(newCourse,adminId);
                //create the offer many to many realtion
                var offer = new Offer
                {
                    AdminId = adminId,
                    ProductId = newCourse.Id,
                };
                offer = await _offerRepository.AddOffer(offer);
                return Ok(CreatedCourse);
            }
            return BadRequest("Invalid product type");
        }

        //getting all the sections of a course
        [HttpGet("course/{id}/sections")]
        [Authorize]
        public async Task<IActionResult> GetCourseSections(int id)
        {
            var adminId =User.GetUserId() ;
            
            var course = await _courseRepository.GetCourse(id, adminId);
            if (course == null) return NotFound("Course not found");
            return Ok(course.Sections);
        }

        //creating a new section
        [HttpPost("course/{courseId}/sections")]
        [Authorize]
        public async Task<IActionResult> CreateSection(int courseId, [FromBody] CreateSectionDto section)
        {
            var adminId =User.GetUserId() ;
            
            var course = await _courseRepository.GetCourse(courseId, adminId);
            if (course == null) return NotFound("Course not found");
            int order = course.Sections?.Count ?? 0;
            var newSection = new Section
            {
                Title = section.Title,
                CourseId = courseId,
                ParentSectionId = section.ParentSectionId,
                Order = order,
                Visibility = section.Visibility ?? "visible"
            };
            await _sectionRepository.AddSection(newSection);

            return Ok(newSection);
        }

        //deleting a section
        [HttpDelete("course/{courseId}/sections/{sectionId}")]
        [Authorize]
        public async Task<IActionResult> DeleteSection(int courseId, int sectionId)
        {
            var adminId =User.GetUserId() ;
            
            var course = await _courseRepository.GetCourse(courseId, adminId);
            if (course == null) return NotFound("Course not found");
            if (await _sectionRepository.DeleteSection(sectionId))
            {
                return Ok("Section deleted successfully");
            }
            return NotFound("section not found");
        }
    }
}