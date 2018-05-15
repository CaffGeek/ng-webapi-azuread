using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Results;
using webapi.Models;

namespace webapi.Extensibility
{
    /// <summary>
    /// Represents implementation of <see cref="ExceptionHandler"/>.
    /// </summary>
    public class UnhandledExceptionHandler : ExceptionHandler
    {
        /// <summary>
        /// Overrides <see cref="ExceptionHandler.Handle"/> method with code that sets friendly error message to be shown in browser.
        /// </summary>
        /// <param name="context">Instance fo <see cref="ExceptionHandlerContext"/>.</param>
        public override void Handle(ExceptionHandlerContext context)
        {
            var metadata = new ErrorInfoModel
            {
                //Message = "An unexpected error occurred! Please use the Error ID to contact support",
                Message = context.Exception.ToString(),
                TimeStamp = DateTimeOffset.UtcNow,
                RequestUri = context.Request.RequestUri,
            };

            var response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, metadata);
            context.Result = new ResponseMessageResult(response);
        }
    }
}