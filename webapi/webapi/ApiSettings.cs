using System;
using System.Collections.Specialized;
using System.Configuration;
using Serilog;

namespace webapi
{
    public static class ApiSettings
    {
        private static readonly ILogger _log = Log.ForContext(typeof(ApiSettings));

        /// <summary>
        /// Set the NameValueCollection containing the configuration settings. 
        /// <remarks>Override this property for unit testing.</remarks>
        /// </summary>
        public static NameValueCollection AppSettings { get; set; } = ConfigurationManager.AppSettings;

        public static bool EnableGlobalExceptionHandler => GetValue<bool>("EnableGlobalExceptionHandler");
        
        public static string CorsOrigins => GetValue<string>("cors:Origins");
        public static bool CorsSupportsCredentials => GetValue<bool>("cors:SupportsCredentials");
        
	    public static string IdaAudience => GetValue<string>("ida:Audience");
        public static string IdaTenant => GetValue<string>("ida:Tenant");

        private static T GetValue<T>(string key)
        {
            var value = AppSettings[key];

            if (value == null) { return default(T); }

            try
            {
                return (T)Convert.ChangeType(value, typeof(T));
            }
            catch (FormatException ex)
            {
                _log.Error(ex, "Invalid value for configuration key {ConfigurationKey} = {ConfigurationValue}. Expected type: {ExpectedType}.", key, value, typeof(T));
                return default(T);
            }
        }
    }
}
