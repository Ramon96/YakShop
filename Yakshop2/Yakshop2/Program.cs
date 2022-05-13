using Microsoft.EntityFrameworkCore;
using Yakshop2.HerdData;
using Yakshop2.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
       .AddJsonOptions(options =>
       {
           options.JsonSerializerOptions.DefaultIgnoreCondition =
           System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
       });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddSingleton<IHerdData, SqlHerdData>();
builder.Services.AddDbContextPool<YakContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("YakContextConnectionString"));
});
builder.Services.AddScoped<IHerdData, SqlHerdData>();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
