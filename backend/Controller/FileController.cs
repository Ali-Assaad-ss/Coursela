using System.Net;
using backend.Extensions;
using backend.Interface;
using backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace backend.Controller
{
    [ApiController]
    [Route("api/file")]
    public class FileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public FileController(IProductRepository productRepositry, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [Authorize]
        [HttpPost("product/{id}/image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetId();
            var fileType = Path.GetExtension(file.FileName);
            if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg")
            {
                return BadRequest(new { message = "Invalid file type" });
            }
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileName = "image" + fileType;
            var filePath = Path.Combine(path, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(fileName);
        }
        [Authorize]
        [HttpGet("product/{id}/image")]
        public async Task<IActionResult> getImage(int id)
        {
            var adminId = User.GetId();

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "image.jpg");
            if (!System.IO.File.Exists(path))
            {
                path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "image.png");
                if (!System.IO.File.Exists(path))
                {
                    path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "image.jpeg");
                    if (!System.IO.File.Exists(path))
                    {
                        return NotFound();
                    }
                }
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }
        private static string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(path, out string contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

        [HttpGet("product/{id}/video")]
        [Authorize]
        public IActionResult GetVideo(int id)
        {
            var adminId = User.GetId();

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "video.mp4");
            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
            var response = File(fileStream, "video/mp4");
            response.EnableRangeProcessing = true;

            return response;
        }



        [Authorize]
        [HttpPost("product/{id}/video")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetId();
            var fileType = Path.GetExtension(file.FileName);
            if (fileType != ".mp4")
            {
                return BadRequest(new { message = "Invalid file type" });
            }
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileName = "video" + fileType;
            var filePath = Path.Combine(path, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return Ok(fileName);
        }

    }
}