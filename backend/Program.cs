using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services.AddIdentity<User,IdentityRole>(options=>{
    options.Password.RequireLowercase=true;
    options.Password.RequireUppercase=true;
    options.Password.RequireNonAlphanumeric=true;
    options.Password.RequiredLength=12;
}).AddEntityFrameworkStores<ApplicationDBContext>();

 builder.Services.AddAuthentication(options=>{
options.DefaultAuthenticateScheme=
options.DefaultChallengeScheme=
options.DefaultForbidScheme=
options.DefaultScheme=
options.DefaultSignInScheme=
options.DefaultSignOutScheme=JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options=>
{
    options.TokenValidationParameters=new TokenValidationParameters{
        ValidateIssuer=true,
        ValidIssuer=builder.Configuration["JWT:Issuer"],
        ValidateAudience=true,
        ValidAudience=builder.Configuration["JWT:Audience"],
        IssuerSigningKey=new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SignInKey"]))
    };
});

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

app.Run();