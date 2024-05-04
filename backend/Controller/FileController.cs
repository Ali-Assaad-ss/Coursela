using System.Net;
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
    [Route("api/file")]
    public class FileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly DigitalProductRepository _digitalProductrepository;
        private readonly IProductRepository _productRepository;
        private readonly LessonRepository _lessonRepository;

        public FileController(IProductRepository productRepositry, UserManager<ApplicationUser> userManager, DigitalProductRepository digitalProductRepository, IProductRepository productRepository, LessonRepository lessonRepository)
        {
            _userManager = userManager;
            _digitalProductrepository = digitalProductRepository;
            _productRepository = productRepository;
            _lessonRepository = lessonRepository;


        }
        //product image upload
        [Authorize]
        [HttpPost("product/{id}/image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetId();
            var fileType = Path.GetExtension(file.FileName).ToLower();
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
                if (await _productRepository.AddImage(id, adminId))
                    await file.CopyToAsync(stream);
                else return BadRequest(new { message = "Product not found" });
            }
            return Ok(fileName);
        }
        //get product image
        [Authorize]
        [HttpGet("product/{id}/image")]
        public IActionResult GetImage(int id)
        {
            var adminId = User.GetId();
            var imageExtensions = new[] { "jpg", "png", "jpeg", "gif" };

            var lastModifiedImage = default((string, DateTime)?);

            foreach (var extension in imageExtensions)
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, $"{id}", $"image.{extension}");

                if (System.IO.File.Exists(imagePath))
                {
                    var lastModified = System.IO.File.GetLastWriteTime(imagePath);
                    if (!lastModifiedImage.HasValue || lastModified > lastModifiedImage.Value.Item2)
                    {
                        lastModifiedImage = (imagePath, lastModified);
                    }
                }
            }

            if (lastModifiedImage.HasValue)
            {
                return PhysicalFile(lastModifiedImage.Value.Item1, $"image/{Path.GetExtension(lastModifiedImage.Value.Item1).TrimStart('.')}"); // Return the last modified image
            }

            return NotFound();
        }

        //digital product file upload
        [HttpPost("product/{id}/file")]
        [Authorize]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetId();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var filePath = Path.Combine(path, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                var product = await _digitalProductrepository.AddFile(id, adminId, file.FileName);
                if (product == null)
                    return BadRequest(new { message = "Product not found" });
                await file.CopyToAsync(stream);
            }

            return Ok(file.FileName);
        }

        //lesson image video file pdf upload
        [HttpPost("lesson/{id}/file")]
        [Authorize]
        public async Task<IActionResult> UploadLessonFile([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetId();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, "lessons", id.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var filePath = Path.Combine(path, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                var lesson = await _lessonRepository.AddLessonFile(id, adminId, file.FileName);
                if (lesson == null)
                    return BadRequest(new { message = "Lesson not found" });
                await file.CopyToAsync(stream);
            }

            return Ok(file.FileName);
        }
        //get lesson file image video pdf
        [HttpGet("lesson/{id}/file")]
        [Authorize]
        public IActionResult GetLessonFile(int id)
        {
            var adminId = User.GetId();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, "lessons", id.ToString());
            var filePath = Directory.GetFiles(path).FirstOrDefault();
            if (filePath == null)
                return NotFound();
            return PhysicalFile(filePath, "application/octet-stream", Path.GetFileName(filePath), enableRangeProcessing: true);
        }

    }
}