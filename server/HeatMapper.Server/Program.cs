using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;


var CorsPolicyName = "SomeOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicyName,
        policy =>
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
    );
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CorsPolicyName);
app.UseHttpsRedirection();

var _clicks = new List<ClickInfo>();
var _hosts = new List<HostInfo>();

app.MapPost("/clicks", ([FromBody] ClicksData data) =>
{
    foreach (var click in data.Clicks) 
    {
        _clicks.Add(new (data.HostId, click.ElementId, click.Date));
    }
});
app.MapGet("/clicks",
    ([FromBody] GetClicksRequest request) => { return _clicks.Where(c => c.HostId == request.HostId); });
app.MapGet("/host/id", async Task<IdInfo> (HttpContext context) =>
{
    var baseUrl = context.Request.Host;
    // var basePath = context.Request.Path;

    var host = _hosts.FirstOrDefault(h => h.Uri == baseUrl.ToString());

    if (host is not null)
    {
        return new IdInfo(host.Id, baseUrl.ToString());
    }

    var newHost = new HostInfo(Guid.NewGuid().ToString(), baseUrl.ToString());
    _hosts.Add(newHost);

    return new IdInfo(newHost.Id, baseUrl.ToString());
});

app.Run();

record ClickData(string ElementId, DateTime Date);
record ClicksData(string HostId, IEnumerable<ClickData> Clicks);
record GetClicksRequest(string HostId);

record IdInfo(string Id, string Url);

record HostInfo(string Id, string Uri);

record ClickInfo(string HostId, string ElementId, DateTime Date);