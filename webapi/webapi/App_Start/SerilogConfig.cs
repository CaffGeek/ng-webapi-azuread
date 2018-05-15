using Microsoft.Owin.BuilderProperties;
using Owin;
using Serilog;
using Serilog.Exceptions;

namespace webapi
{
    public static class SerilogConfig
    {
        public static void Configure(IAppBuilder app)
        {
            Log.Logger = new LoggerConfiguration()
				.Enrich.WithExceptionDetails()
				.ReadFrom.AppSettings()
                .CreateLogger();

            // Close and Flush the Log when the OWIN Host is disposed
            new AppProperties(app.Properties).OnAppDisposing.Register(Log.CloseAndFlush);
        }
    }
}
