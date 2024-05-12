using System.Security.Claims;
using backend.Dto.DigitalProduct;
using backend.Dto.Lesson;
using backend.Dto.Product;
using backend.Dto.Quiz;
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
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly ICourseRepository _courseRepository;
        private readonly IProductRepository _productRepositry;
        private readonly SectionRepository _sectionRepository;
        private readonly IOfferRepository _offerRepository;
        private readonly LessonRepository _lessonRepository;
        private readonly DigitalProductRepository _digitalProductRepository;
        private readonly CoachingRepository _coachingRepository;
        private readonly QuizRepository _quizRepository;
        public AdminController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
        ICourseRepository courseRepository, IProductRepository productRepository, SectionRepository sectionRepository,
        IOfferRepository offerRepository, LessonRepository lessonRepository, DigitalProductRepository digitalProductRepository,
         CoachingRepository coachingRepository, QuizRepository quizRepository)
        {
            _signinManager = signInManager;
            _userManager = userManager;
            _courseRepository = courseRepository;
            _productRepositry = productRepository;
            _sectionRepository = sectionRepository;
            _offerRepository = offerRepository;
            _lessonRepository = lessonRepository;
            _digitalProductRepository = digitalProductRepository;
            _coachingRepository = coachingRepository;
            _quizRepository = quizRepository;

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

            var result = await _signinManager.PasswordSignInAsync(user, loginDto.Password, isPersistent: true, lockoutOnFailure: false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            var userRoles = await _userManager.GetRolesAsync(user);

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    UserRoles = userRoles,
                }
            );
        }
        [HttpGet("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signinManager.SignOutAsync();
            return Ok("Logged out successfully");
        }
        
        [HttpGet("validate")]
        public async Task<IActionResult> Validate()
        {
            var role= User.FindAll(ClaimTypes.Role).Select(x=>x.Value);
            return Ok(role);
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
                        await _signinManager.SignInAsync(user, isPersistent: true);
                        return Ok(
                            new NewUserDto
                            {
                                UserName = user.UserName,
                                Email = user.Email,
                                UserRoles = userRoles
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
        public async Task<IActionResult> GetProducts()
        {
            var AdminId = User.GetId();
            var products = await _productRepositry.GetProducts(AdminId);
            return Ok(products);
        }

        //getting a Course by id
        [HttpGet("courses/{id}")]
        public async Task<IActionResult> GetCourses(int id)
        {
            var adminId = User.GetId();

            var courses = await _courseRepository.GetCourse(id, adminId);
            return Ok(courses);
        }
        //deleting a Product by id
        [HttpDelete("products/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var adminId = User.GetId();

            var courses = await _productRepositry.DeleteProduct(id, adminId);
            if (courses == null) return NotFound("Course not found");
            return Ok("course deleted successfully");
        }

        //creating a new product
        [HttpPost("product")]
        public async Task<IActionResult> AddProduct([FromBody] CreateNewProductDto productDto)
        {
            //get the admin id
            var adminId = User.GetId();
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
                var NewProductDto = new NewProductDto
                {
                    Id = newCourse.Id,
                    Name = newCourse.Name,
                    Type = "Course",
                    members = 0
                };
                return Ok(NewProductDto);
            }
            else if (productDto.Type == "DigitalDownload")
            {
                var createdDigitalDownload = await _digitalProductRepository.AddDigitalProduct(productDto);
                var NewProductDto = new NewProductDto
                {
                    Id = createdDigitalDownload.Id,
                    Name = createdDigitalDownload.Name,
                    Type = "DigitalDownload",
                    members = 0
                };
                var offer = new Offer
                {
                    AdminId = adminId,
                    ProductId = createdDigitalDownload.Id,
                };
                await _offerRepository.AddOffer(offer);

                return Ok(NewProductDto);
            }
            else if (productDto.Type == "Coaching")
            {
                var createdCoaching = await _coachingRepository.AddCoaching(productDto);
                var NewProductDto = new NewProductDto
                {
                    Id = createdCoaching.Id,
                    Name = createdCoaching.Name,
                    Type = "Coaching",
                    members = 0
                };
                var offer = new Offer
                {
                    AdminId = adminId,
                    ProductId = createdCoaching.Id,
                };
                await _offerRepository.AddOffer(offer);
                return Ok(NewProductDto);

            }
            return BadRequest("Invalid product type");
        }

        //get a lesson by id
        [HttpGet("courses/lessons/{lessonId}")]
        public async Task<IActionResult> GetLesson(int lessonId)
        {
            var adminId = User.GetId();
            var lesson = await _lessonRepository.GetLesson(lessonId, adminId);
            if (lesson == null) return NotFound("Lesson not found");
            return Ok(lesson);
        }

        //ceating a new lesson
        [HttpPost("courses/lessons")]
        public async Task<IActionResult> AddLesson([FromBody] NewLessonDto LessonDto)
        {
            var adminId = User.GetId();
            var newLesson = await _lessonRepository.AddLesson(adminId, LessonDto);
            if (newLesson == null) return Unauthorized("You don't have access to this course");
            return Ok(newLesson);
        }

        //delete a lesson
        [HttpDelete("courses/lessons/{lessonId}")]
        public async Task<IActionResult> DeleteLesson(int lessonId)
        {
            var adminId = User.GetId();
            if (await _lessonRepository.DeleteLesson(lessonId, adminId))
            {
                return Ok("Lesson deleted successfully");
            }
            return NotFound("Lesson not found");
        }
        //update a lesson   
        [HttpPut("courses/lessons/{lessonId}")]
        public async Task<IActionResult> UpdateLesson(int lessonId, [FromBody] UpdateLessonDto lessonDto)
        {
            var adminId = User.GetId();
            var lesson = await _lessonRepository.UpdateLesson(lessonId, adminId, lessonDto);
            if (lesson == null) return NotFound("Lesson not found");
            return Ok("Lesson updated successfully");
        }


        //sort lessons
        [HttpPut("courses/lessons/sort")]
        public async Task<IActionResult> SortLessons([FromBody] List<int>idArray)
        {
            var adminId = User.GetId();
            var lessons =await _lessonRepository.SortLessons(adminId, idArray);
            if (lessons != null)
                return Ok(lessons);
            return NotFound("Lesson not found");
        }

        //add a question to quiz
        [HttpPost("courses/lessons/quiz/{quizId}/question")]
        public async Task<IActionResult> AddQuestion(int quizId, [FromBody] QuestionDto questionDto)
        {
            var adminId = User.GetId();
            var question = await _quizRepository.AddQuestion(questionDto ,quizId, adminId);
            if (question == null) return NotFound("Quiz not found");
            return Ok(question);
        }
        [HttpPut("courses/lessons/quiz/question/{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] QuestionDto questionDto)
        {
            var adminId = User.GetId();
            var question = await _quizRepository.UpdateQuestion(questionDto ,id, adminId);
            if (question == null) return NotFound("Quiz not found");
            return Ok(question);
        }
        [HttpDelete("courses/lessons/quiz/question/{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var adminId = User.GetId();
            var question = await _quizRepository.DeleteQuestion(id, adminId);
            if (!question) return NotFound("Quiz not found");
            return Ok(question);
        }
        [HttpPut("courses/lessons/quiz/sort")]
        public async Task<IActionResult> SortQuiz([FromBody] List<int>idArray)
        {
            var adminId = User.GetId();
            var quiz =await _quizRepository.SortQuestions(adminId, idArray);
            if (quiz != null)
                return Ok(quiz);
            return NotFound("Lesson not found");
        }

        [HttpGet("digitaldownload/{id}")]
        public async Task<IActionResult> GetDigitalDownload(int id)
        {
            var adminId = User.GetId();

            var digitalDownload = await _digitalProductRepository.GetDigitalProduct(id, adminId);
            if (digitalDownload == null) return NotFound("DigitalDownload not found");
            return Ok(digitalDownload);
        }
        [HttpPut("products/{id}")]
        public async Task<IActionResult> UpdateDigitalDownload(int id, [FromBody] UpdateProductDto dto)
        {
            var adminId = User.GetId();
            var product = await _productRepositry.UpdateProduct(id,adminId,dto);
            return Ok(product);
        }

    }
}