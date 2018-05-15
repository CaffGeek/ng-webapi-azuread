using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace webapi
{
    public static class RoleHelper
    {
        public static List<string> Map(string role)
        {
            var roles = ConfigurationManager.AppSettings["rolemap_" + role.ToUpper()];
            if (!string.IsNullOrWhiteSpace(roles))
                return roles.Split(',').Select(x => x.Trim()).ToList();
            else
                return new[] { role }.ToList();
        }
    }
}