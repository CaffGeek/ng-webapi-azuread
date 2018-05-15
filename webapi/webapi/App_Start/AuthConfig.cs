using System.IdentityModel.Tokens;
using Microsoft.Owin.Security.ActiveDirectory;
using Owin;

namespace webapi
{
    public static class AuthConfig
    {
        public static void Configure(IAppBuilder app)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(
                new WindowsAzureActiveDirectoryBearerAuthenticationOptions
                {
                    TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidAudience = ApiSettings.IdaAudience
                    },
                    Tenant = ApiSettings.IdaTenant
                });
        }
    }
}