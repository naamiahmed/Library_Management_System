using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using LibraryManagement.Data;
using LibraryManagement.Models;
using System.Text.Json.Serialization;

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
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Configure Authentication
builder.Services.AddAuthentication();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Library Management API", Version = "v1" });
});

// Configure Database Connections
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=library.db";

// Configure LibraryDbContext
builder.Services.AddDbContext<LibraryDbContext>(options =>
{
    options.UseSqlite(connectionString, sqliteOptions =>
    {
        sqliteOptions.CommandTimeout(60);
    });
}, ServiceLifetime.Scoped);

// Configure UserDbContext
builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseSqlite(connectionString, sqliteOptions =>
    {
        sqliteOptions.CommandTimeout(60);
    });
}, ServiceLifetime.Scoped);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library Management API V1");
    });
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Initialize Databases
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    var retry = 0;
    const int maxRetries = 3;

    while (retry < maxRetries)
    {
        try
        {
            logger.LogInformation($"Attempting database initialization (attempt {retry + 1})...");
            
            // Initialize UserDbContext first
            var userContext = services.GetRequiredService<UserDbContext>();
            await userContext.Database.MigrateAsync();
            logger.LogInformation("User database initialized");

            // Then initialize LibraryDbContext
            var libraryContext = services.GetRequiredService<LibraryDbContext>();
            await libraryContext.Database.MigrateAsync();
            logger.LogInformation("Library database initialized");

            break;
        }
        catch (Exception ex)
        {
            retry++;
            if (retry == maxRetries)
            {
                logger.LogError(ex, "Failed to initialize database after {maxRetries} attempts");
                throw;
            }
            logger.LogWarning(ex, "Database initialization failed, retrying in 1 second...");
            await Task.Delay(1000);
        }
    }
}

app.Run();