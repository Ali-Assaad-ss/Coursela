using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Course;
using backend.Extensions;
using backend.Interface;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controller
{
    [ApiController]
    [Route("api/course")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepositry;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOfferRepository _offerRepository;
        public CourseController(UserManager<ApplicationUser> userManager ,ICourseRepository courseRepositry, IOfferRepository offerRepository)
        {
            _courseRepositry = courseRepositry;
            _userManager = userManager;
            _offerRepository = offerRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddCourse([FromBody] CreateCourseDto course)
        {
            var username = User.GetUsername();
            var admin= (Admin)await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            Course newCourse= new()
            {
                Name = course.Name,
            };
            var CreatedCourse = await _courseRepositry.AddCourse(newCourse);
            var offer = new Offer{
                AdminId=admin.Id,
                ProductId=newCourse.Id,
            };
            offer = await _offerRepository.AddOffer(offer);
            return Ok(CreatedCourse);
        }
        
    }
}