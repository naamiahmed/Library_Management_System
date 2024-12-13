using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using LibraryManagement.Data;
using LibraryManagement.Models;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole()
    .AddDebug()
    .SetMinimumLevel(LogLevel.Information);

// Add services to the container
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "Library Management API", 
        Version = "v1",
        Description = "API for managing library books"
    });
});

// Add DbContext
builder.Services.AddDbContext<LibraryDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Create wwwroot directory if it doesn't exist
var webRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
if (!Directory.Exists(webRootPath))
{
    Directory.CreateDirectory(webRootPath);
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library Management API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("ReactApp");
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "Library Management API Running");

// Initialize Database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<LibraryDbContext>();
        context.Database.EnsureCreated();
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Database created successfully");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while creating the database.");
    }
}

// Print startup information
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("\n=================================================");
Console.WriteLine("🚀 Library Management API is running!");
Console.WriteLine("=================================================");
Console.WriteLine("📍 API Endpoints:");
Console.WriteLine("   HTTP:  http://localhost:3000");
Console.WriteLine("   HTTPS: https://localhost:3001");
Console.WriteLine("📝 Swagger UI: https://localhost:3001/index.html");
Console.WriteLine("=================================================\n");
Console.ResetColor();

// Run application with correct URL format
await app.RunAsync();