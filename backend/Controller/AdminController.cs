using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dto.Lesson;
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
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly ICourseRepository _courseRepository;
        private readonly IProductRepository _productRepositry;
        private readonly SectionRepository _sectionRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly LessonRepository _lessonRepository;
        public AdminController(UserManager<ApplicationUser> userManager, ITokenService tokenService, SignInManager<ApplicationUser> signInManager, ICourseRepository courseRepository, IProductRepository productRepository, SectionRepository sectionRepository, IOfferRepository offerRepository, LessonRepository lessonRepository)
        {
            _signinManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
            _courseRepository = courseRepository;
            _productRepositry = productRepository;
            _sectionRepository = sectionRepository;
            _offerRepository = offerRepository;
            _lessonRepository = lessonRepository;
        }

        [HttpPost("login")]
        [AllowAnonymous]
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
                    UserRoles = userRoles,
                    Token = _tokenService.CreateTokenAsync(user, userRoles)
                }
            );
        }
        [HttpGet("validate")]
        [Authorize]
        public async Task<IActionResult> Validate()
        {
            return Ok("Valid");
        }

        [HttpPost("register")]
        [AllowAnonymous]
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
                                UserRoles = userRoles,
                                Token = _tokenService.CreateTokenAsync(user, userRoles),
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
        public async Task<IActionResult> GetCourses(int id)
        {
            var adminId = User.GetUserId();

            var courses = await _courseRepository.GetCourse(id, adminId);
            return Ok(courses);
        }
        //deleting a Product by id
        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var adminId = User.GetUserId();

            var courses = await _productRepositry.DeleteProduct(id, adminId);
            if (courses == null) return NotFound("Course not found");
            return Ok("course deleted successfully");
        }

        //creating a new product
        [HttpPost("product")]
        public async Task<IActionResult> AddProduct([FromBody] NewProductDto productDto)
        {
            //get the admin id
            var adminId = User.GetUserId();
            //create the product
            //case of course
            if (productDto.Type == "Course")
            {
                Course newCourse = new()
                {
                    Name = productDto.Name,
                };
                var CreatedCourse = await _courseRepository.AddCourse(newCourse, adminId);
                //create the offer many to many realtion
                var offer = new Offer
                {
                    AdminId = adminId,
                    ProductId = newCourse.Id,
                };
                await _offerRepository.AddOffer(offer);
                return Ok(CreatedCourse);
            }
            return BadRequest("Invalid product type");
        }

        //getting all the sections of a course
        [HttpGet("course/sections/{id}")]
        public async Task<IActionResult> GetCourseSections(int id)
        {
            var adminId = User.GetUserId();

            var section = await _sectionRepository.GetSection(id, adminId);
            if (section == null) return NotFound("section not found");
            return Ok(section);
        }

        //creating a new section
        [HttpPost("course/sections")]
        public async Task<IActionResult> CreateSection([FromBody] CreateSectionDto section)
        {
            var adminId = User.GetUserId();
            var newSection = await _lessonRepository.AddSection(adminId, section);
            if (newSection == null) return Unauthorized("You don't have access to this course");
            return Ok(newSection);
        }

        //deleting a section
        [HttpDelete("course/sections/{sectionId}")]
        public async Task<IActionResult> DeleteSection(int sectionId)
        {
            var adminId = User.GetUserId();

            if (await _sectionRepository.DeleteSection(sectionId, adminId))
            {
                return Ok("Section deleted successfully");
            }
            return NotFound("section not found");
        }
        [HttpPost("Lesson")]
        public async Task<IActionResult> AddLesson([FromBody] NewLessonDto LessonDto){
            var adminId = User.GetUserId();
            var newLesson = await _lessonRepository.AddLesson(adminId, LessonDto);
            if (newLesson == null) return Unauthorized("You don't have access to this course");
            return Ok(newLesson);  
        }
        
    }
}