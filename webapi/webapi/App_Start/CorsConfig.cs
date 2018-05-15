using System;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Cors;
using Microsoft.Owin.Cors;
using Serilog;

namespace webapi
{
    /// <summary>
    /// Represents CORS configuration.
    /// </summary>
    public class CorsConfig
    {
        /// <summary>
        /// Instance of <see cref="CorsOptions"/> that is set to allow all by default.
        /// </summary>
        public static CorsOptions Options = CorsOptions.AllowAll;

        /// <summary>
        /// Initializes and configures <see cref="CorsOptions"/> instance.
        /// </summary>
        public static void Configure()
        {
            var corsPolicy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true,
                SupportsCredentials = ApiSettings.CorsSupportsCredentials
            };

            AddOrigins(corsPolicy, ApiSettings.CorsOrigins);

            Options = new CorsOptions
            {
                PolicyProvider = new CorsPolicyProvider
                {
                    PolicyResolver = context => Task.FromResult(corsPolicy)
                }
            };
        }

        /// <summary>
        /// Adds origins of a <see cref="UriKind.Absolute"/> format to a <see cref="CorsPolicy"/> instance.
        /// </summary>
        /// <param name="corsPolicy">CorsPolicy for the origins to be added to</param>
        /// <param name="origins">String of allowed origins delimited by: ';'</param>
        internal static void AddOrigins(CorsPolicy corsPolicy, string origins)
        {
            if (String.IsNullOrWhiteSpace(origins) || origins == "*")
            {
                corsPolicy.AllowAnyOrigin = true;
            }
            else
            {
                var originList = origins.Split(new[] {';'}, StringSplitOptions.RemoveEmptyEntries)
                                        .Select(s => s.Trim())
                                        .ToList();
                
                if (originList.Any(uri => !Uri.IsWellFormedUriString(uri, UriKind.Absolute)))
                {
                    Log.Fatal("CorsOrigins contains one or more malfomred URIs: {CorsOrigins}", origins);
                    throw new ConfigurationErrorsException("CorsOrigins contains one or more malformed URIs." + origins);
                }
                
                foreach (var origin in originList)
                {
                    corsPolicy.Origins.Add(origin);
                }
            }
        }
    }
}