using System;

namespace webapi.Models
{
    public class LogDto
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public string Message { get; set; }
    }
}