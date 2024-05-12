using backend.Data;
using backend.Interface;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});


builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 4;
}).AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie();

builder.Services.Configure<Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = 10L * 1024 * 1024 * 1024; // Set the limit to 10 GB
});
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10L * 1024 * 1024 * 1024; // Set to 10 GB
    // Optionally, you can also adjust other limits as needed
    options.MultipartHeadersLengthLimit = Int32.MaxValue;
    options.MultipartBoundaryLengthLimit = Int32.MaxValue;
    options.ValueLengthLimit = Int32.MaxValue;
    options.BufferBodyLengthLimit = Int64.MaxValue;
    options.MemoryBufferThreshold = Int32.MaxValue;
});


builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepositry>();
builder.Services.AddScoped<IOfferRepository, OfferRepository>();
builder.Services.AddScoped<SectionRepository>();
builder.Services.AddScoped<LessonRepository>();
builder.Services.AddScoped<DigitalProductRepository>();
builder.Services.AddScoped<CoachingRepository>();
builder.Services.AddScoped<QuizRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();
app.Run();