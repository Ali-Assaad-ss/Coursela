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

        public FileController(IProductRepository productRepositry, UserManager<ApplicationUser> userManager, DigitalProductRepository digitalProductRepository, IProductRepository productRepository)
        {
            _userManager = userManager;
            _digitalProductrepository = digitalProductRepository;
            _productRepository = productRepository;

        }
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

        [HttpGet("product/{id}/video")]
        [Authorize]
        public IActionResult GetVideo(int id)
        {
            var adminId = User.GetId();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "video.mp4");

            if (!System.IO.File.Exists(path))
                return NotFound();

            return PhysicalFile(path, "video/mp4", enableRangeProcessing: true);
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

    }
}