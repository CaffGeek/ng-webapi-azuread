using System.Linq;
using System.Reflection;
using System.Web.Http;

namespace webapi.Controllers
{
    [Extensibility.Authorize()]
    public class HomeController : ApiController
    {
        [HttpGet]
        [Route("")]
        [OverrideAuthorization]
        [AllowAnonymous]
        public string Index()
        {
            return "Web API Started successfully";
        }

        [HttpGet]
        [Route("rolemap")]
        [OverrideAuthorization]
        [AllowAnonymous]
        public dynamic RoleMap()
        {
            var roles = typeof(Roles).GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Where(fi => fi.IsLiteral && !fi.IsInitOnly).ToList()
                    .Select(x => x.Name)
                    .Select(r => new {
                        role = r,
                        mapped = RoleHelper.Map(r)
                    });

            return roles;
        }
    }
}
