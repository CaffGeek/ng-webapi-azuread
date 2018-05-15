using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;

namespace webapi.Extensibility
{
    public class AuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
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
    }
}