using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Data;
using backend.Dto.Product;
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
    public class CourseController(UserManager<ApplicationUser> userManager, ICourseRepository courseRepositry, IOfferRepository offerRepository) : ControllerBase
    {
        private readonly ICourseRepository _courseRepositry = courseRepositry;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly IOfferRepository _offerRepository = offerRepository;

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCourse([FromBody] CreateNewProductDto course)
        {
            var adminId = User.GetId();
            Course newCourse= new()
            {
                Name = course.Name,
            };
            var CreatedCourse = await _courseRepositry.AddCourse(newCourse,adminId);
            var offer = new Offer{
                AdminId=adminId,
                ProductId=newCourse.Id,
            };
            offer = await _offerRepository.AddOffer(offer);
            return Ok((Product)CreatedCourse);
        }
        [Authorize]
        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var adminId = User.GetId();
            var course = await _courseRepositry.GetCourse(id,adminId);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }
        [Authorize]
        [HttpGet("{id}/sections")]
        public async Task<IActionResult> GetSections(int id)
        {
            var adminId = User.GetId();
            var course = await _courseRepositry.GetCourse(id,adminId);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course.Section);
        }
    }
}