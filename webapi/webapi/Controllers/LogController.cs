using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using domain;
using webapi.Extensibility;
using webapi.Models;

namespace webapi.Controllers
{
    [RoutePrefix("log")]
    [CustomAuthorize(new[] { Roles.USER })]
    public class LogController : ApiController
    {
        private readonly IApiDbContext _db;
        private readonly MapperConfiguration _mapperConfig;
        private readonly IMapper _mapper;

        public LogController(IApiDbContext db, MapperConfiguration mapperConfig, IMapper mapper)
        {
            _db = db;
            _mapperConfig = mapperConfig;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        [CustomAuthorize(new[] { Roles.USER })]
        public async Task<IHttpActionResult> GetLogs()
        {
            var logs = await _db.Logs
                .ProjectTo<LogDto>(_mapperConfig).ToListAsync();

            return Ok(logs);
        }

        [HttpPost]
        [Route("")]
        [CustomAuthorize(new[] { Roles.USER })]
        public async Task<IHttpActionResult> CreateLog(LogDto log)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        [Route("{id}")]
        [CustomAuthorize(new[] { Roles.USER })]
        public async Task<IHttpActionResult> EditLog(int id, LogDto log)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("{id}")]
        [CustomAuthorize(new[] { Roles.USER })]
        public async Task<IHttpActionResult> DeleteLog(int id)
        {
            throw new NotImplementedException();
        }
    }
}
