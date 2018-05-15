using System;
using System.Web;

namespace webapi.Extensibility
{
    public class CorsOptionsModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.BeginRequest += HandleRequest;
        }

        private void HandleRequest(object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;

            //Cross-Origin preflight request
            if (context.Request.HttpMethod == "OPTIONS")
            {
                ClearResponse(context);

                //Set allowed method and headers
                SetAllowCrossSiteRequestHeaders(context);
                //Set allowed origin
                SetAllowCrossSiteRequestOrigin(context);

                //End
                context.Response.End();
            }
        }
        static void SetAllowCrossSiteRequestHeaders(HttpContext context)
        {
            context.Response.AppendHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

            //We allow any custom headers
            string requestHeaders = context.Request.Headers["Access-Control-Request-Headers"];
            if (!String.IsNullOrEmpty(requestHeaders))
                context.Response.AppendHeader("Access-Control-Allow-Headers", requestHeaders);

            //allow credentials
            context.Response.AppendHeader("Access-Control-Allow-Credentials", "true");
        }

        static void SetAllowCrossSiteRequestOrigin(HttpContext context)
        {
            var origin = context.Request.Headers["Origin"];
            context.Response.AppendHeader("Access-Control-Allow-Origin", !String.IsNullOrEmpty(origin) ? origin : "*");
        }

        static void ClearResponse(HttpContext context)
        {
            context.Response.ClearHeaders();
            context.Response.ClearContent();
            context.Response.Clear();
        }

        public void Dispose()
        {
        }
    }
}