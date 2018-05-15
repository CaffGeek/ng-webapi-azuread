using System.Web.Http;
using Swashbuckle.Application;

namespace webapi
{
    public class SwaggerConfig
    {
        public static void Configure(HttpConfiguration configuration)
        {

            configuration.EnableSwagger(x => x.SingleApiVersion("v1", "Web.API"))
                .EnableSwaggerUi();
        }
    }
}