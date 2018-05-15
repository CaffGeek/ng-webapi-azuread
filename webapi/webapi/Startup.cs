using System.Threading.Tasks;
using System.Web.Http;
using webapi;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace webapi
{
    /// <summary>
    /// Represents the entry point into an application.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Specifies how the ASP.NET application will respond to individual HTTP request.
        /// </summary>
        /// <param name="app">Instance of <see cref="IAppBuilder"/>.</param>
        public void Configuration(IAppBuilder app)
        {            
            EnvironmentConfig.Configure();

            AuthConfig.Configure(app);

            CorsConfig.Configure();
            app.UseCors(CorsConfig.Options);

            var config = new HttpConfiguration();

            AutofacConfig.Configure(config);
            app.UseAutofacMiddleware(AutofacConfig.Container);
            app.UseAutofacWebApi(config);

            SerilogConfig.Configure(app);

            // Configure Web API
            FilterConfig.Configure(config);
            ServiceConfig.Configure(config);
            FormatterConfig.Configure(config);
            SwaggerConfig.Configure(config);
            RouteConfig.Configure(config);
            app.UseWebApi(config);
            
            config.EnsureInitialized();
        }
    }
}