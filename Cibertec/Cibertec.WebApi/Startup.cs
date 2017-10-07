using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Cibertec.Repositories.Dapper.Northwind;
using Cibertec.UnitOfWork;
using FluentValidation.AspNetCore;
using Cibertec.Models;
using Cibertec.WebApi.Validators;
using FluentValidation;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using System.Linq;

namespace Cibertec.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddFluentValidation();
            services.AddSingleton<IUnitOfWork>(option => new NorthwindUnitOfWork(Configuration.GetConnectionString("Northwind")));
            services.AddTransient<IValidator<Customer>, CustomerValidator>();

            services.AddResponseCompression();
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseResponseCompression();
            app.UseMvc();
        }
    }
}
//https://stackoverflow.com/questions/45715394/asp-net-core-2-0-bearer-auth-without-identity