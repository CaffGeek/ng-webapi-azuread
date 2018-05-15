using System;

namespace webapi
{
    public class EnvironmentConfig
    {
        public static void Configure()
        {
            Environment.SetEnvironmentVariable("BSWebApiBaseDir", AppDomain.CurrentDomain.BaseDirectory);
        }
    }
}