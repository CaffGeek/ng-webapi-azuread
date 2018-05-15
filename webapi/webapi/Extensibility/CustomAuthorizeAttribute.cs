using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http.Controllers;

namespace webapi.Extensibility
{
    public class CustomAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        public CustomAuthorizeAttribute(params string[] roles) : base()
        {
            Roles = string.Join(",", roles);
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            if (!actionContext.RequestContext.Principal.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(actionContext);
            }
            else
            {
                // Authenticated, but not Authorized. Return 403 instead.
                actionContext.Response = actionContext.ControllerContext.Request.CreateErrorResponse(HttpStatusCode.Forbidden, "User is not authorized to access the requested resource.");
            }
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            //if (actionContext.Request.RequestUri.Host == "localhost")
            //    return true;

            var controllerType = actionContext.ControllerContext.Controller.GetType();

            if (IsInRoles(Roles))
            {
                var method = controllerType.GetMethod(actionContext.ActionDescriptor.ActionName);
                var methodAttrib = method.GetCustomAttributes(typeof(AuthorizeAttribute), true).FirstOrDefault() as AuthorizeAttribute;

                if (methodAttrib != null)
                {
                    return IsInRoles(methodAttrib.Roles);
                }

                return true;
            }

            return false;
        }

        private bool IsInRoles(string rolesList)
        {
            var user = (ClaimsIdentity)HttpContext.Current.User.Identity;
            //Log.Warning($"user {user.Name} with NameClaimType = {user.NameClaimType}, RoleClaimType = {user.RoleClaimType} , IsAuthenticated = {user.IsAuthenticated} , AuthenticationType = {user.AuthenticationType}");

            var roles = rolesList.Split(',');
            var mappedRoles = roles.Select(RoleHelper.Map).SelectMany(x => x);
            return mappedRoles.Any(role => user.HasClaim("roles", role.Trim()));
        }
    }
}