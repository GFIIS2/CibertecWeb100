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
            services.AddSingleton<IUnitOfWork>(option => new NorthwindUnitOfWork(Configuration.GetConnectionString("Northwind")));
            services.AddMvc().AddFluentValidation();
            services.AddTransient<IValidator<Customer>, CustomerValidator>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
