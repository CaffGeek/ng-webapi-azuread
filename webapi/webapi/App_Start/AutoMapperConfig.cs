using System.Reflection;
using AutoMapper;
using webapi.Models;

namespace webapi
{
    public static class AutoMapperConfig
    {
        public static MapperConfiguration Configure()
        {
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.ShouldMapProperty = p => p.GetMethod.IsPublic || p.SetMethod.IsPrivate;
                cfg.AddProfiles(Assembly.GetExecutingAssembly());
                
                //cfg.CreateMissingTypeMaps = true;
            });

            return mapperConfiguration;
        }
    }
}