using System.Linq;
using System.Reflection;
using System.Web.Compilation;
using System.Web.Hosting;
using System.Web.Http;
using Autofac;
using Autofac.Integration.SignalR;
using Autofac.Integration.WebApi;
using AutofacSerilogIntegration;
using AutoMapper;
using database;
using domain;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Infrastructure;
using Newtonsoft.Json;
using webapi.Extensibility;

namespace webapi
{
    /// <summary>
    /// Represent Autofac configuration.
    /// </summary>
    public static class AutofacConfig
    {
        private static readonly Assembly ExecutingAssembly = Assembly.GetExecutingAssembly();

        /// <summary>
        /// Configured instance of <see cref="IContainer"/>
        /// <remarks><see cref="AutofacConfig.Configure"/> must be called before trying to get Container instance.</remarks>
        /// </summary>
        public static IContainer Container;

        /// <summary>
        /// Initializes and configures instance of <see cref="IContainer"/>.
        /// </summary>
        /// <param name="config"></param>
        public static void Configure(HttpConfiguration config)
        {
            if (HostingEnvironment.IsHosted)
            {
                // Forces load all referenced assemblies into the AppDomain so assembly scanning works properly. 
                // Reference: http://docs.autofac.org/en/latest/faq/iis-restart.html
                var assemblies = BuildManager.GetReferencedAssemblies().Cast<Assembly>();
            }

            var builder = new ContainerBuilder();

            // Other components can be registered here.
            RegisterAutoMapper(builder);
            
            RegisterEntityFramework(builder);

            RegisterJsonSerializer(builder);

            builder.RegisterLogger();

            builder.RegisterApiControllers(ExecutingAssembly);

            builder.RegisterWebApiFilterProvider(config);

            Container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(Container);
        }

        private static void RegisterAutoMapper(ContainerBuilder builder)
        {
            builder.RegisterInstance(AutoMapperConfig.Configure())
                 .AutoActivate()
                 .AsSelf();

            builder.Register(c => c.Resolve<MapperConfiguration>().CreateMapper(c.Resolve))
                   .SingleInstance()
                   .AutoActivate()
                   .As<IMapper>();
        }

        private static void RegisterJsonSerializer(ContainerBuilder builder)
        {
            builder.Register(s => new JsonSerializer
            {
                ContractResolver = new FilteredCamelCasePropertyNamesContractResolver
                {
                    AssembliesToInclude =
                 {
                     typeof (Startup).Assembly
                 }
                }
            });
        }

        private static void RegisterEntityFramework(ContainerBuilder builder)
        {
            builder.RegisterType<ApiDbContext>().As<IApiDbContext>().InstancePerLifetimeScope();
        }
    }
}
