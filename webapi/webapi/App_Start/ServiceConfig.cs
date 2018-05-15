using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using Serilog;
using webapi.Extensibility;

namespace webapi
{
    /// <summary>
    /// Represents configuration for <see cref="IExceptionHandler"/> and <see cref="IExceptionLogger"/>.
    /// </summary>
    public class ServiceConfig
    {
        /// <summary>
        /// COnfigures custom implementations for: <see cref="IExceptionHandler"/> and <see cref="IExceptionLogger"/>.
        /// </summary>
        /// <param name="config"></param>
        public static void Configure(HttpConfiguration config)
        {
            config.Services.Replace(typeof(IExceptionLogger), new UnhandledExceptionLogger(Log.ForContext<UnhandledExceptionLogger>()));
            if (ApiSettings.EnableGlobalExceptionHandler)
            {
                config.Services.Replace(typeof(IExceptionHandler), new UnhandledExceptionHandler());
            }
        }
    }
}