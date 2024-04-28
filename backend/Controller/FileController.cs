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
            var adminId = User.GetUserId();
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
            var adminId = User.GetUserId();

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
        // [Authorize]
        // [HttpGet("product/{id}/video")]
        // public async Task<IActionResult> getVideo(int id)
        // {
        //     var adminId = User.GetUserId();

        //     var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", adminId, id.ToString(), "video.mp4");
        //     if (!System.IO.File.Exists(path))
        //     {
        //         return NotFound();
        //     }

        //     var memory = new MemoryStream();
        //     using (var stream = new FileStream(path, FileMode.Open))
        //     {
        //         await stream.CopyToAsync(memory);
        //     }
        //     memory.Position = 0;
        //     return File(memory, GetContentType(path), Path.GetFileName(path));
        // }
        [HttpGet("product/{id}/video")]
        public async Task<IActionResult> GetVideo(int id)
        {
            var adminId = User.GetUserId();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Files", "94978062-f5a5-49cb-a99d-fe7e14fc65a5", id.ToString(), "video.mp4");
            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            // Check if the request contains a Range header
            var rangeHeader = Request.GetTypedHeaders().Range;
            if (rangeHeader != null)
            {
                // Handle range request
                long totalBytes = memory.Length;
                var requestedRange = rangeHeader.Ranges.FirstOrDefault();
                if (requestedRange != null)
                {
                    long start = requestedRange.From ?? 0;
                    long end = requestedRange.To ?? totalBytes - 1;
                    long bytesToSend = end - start + 1;

                    Response.Headers.Add("Accept-Ranges", "bytes");
                    Response.Headers.Add("Content-Range", $"bytes {start}-{end}/{totalBytes}");
                    Response.ContentLength = bytesToSend;
                    Response.StatusCode = StatusCodes.Status206PartialContent;

                    memory.Position = start;
                    return File(memory, GetContentType(path), Path.GetFileName(path), enableRangeProcessing: true);
                }
            }

            // If not a range request, return the file normally
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }



        [Authorize]
        [HttpPost("product/{id}/video")]
        public async Task<IActionResult> UploadVideo([FromForm] IFormFile file, int id)
        {
            var adminId = User.GetUserId();
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