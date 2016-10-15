using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace TimeDilation.Controllers
{
    
    public class TestResult
    {
        public string AuthId { get; set; }
        public string SessionId { get; set; }
        /// <summary>
        /// eg
        /// basic, simultaneousIntervals, distractors
        /// </summary>
        public string TestName { get; set; }
        public DateTime StartTime { get; set; }

        public List<IntervalTiming> Timings { get; set; }
    }
    public class IntervalTiming
    {
        public long ExpectedDuration { get; set; }
        public long ActualDuration { get; set; }
    }


    public class ApiResult
    {
        public int ErrorNo { get; set; }
        public string Message { get; set; }
        public long? Identity { get; set; }
    }
    public class IntervalsController : ApiController
    {
        

        // POST api/intervals
        public ApiResult Post([FromBody]TestResult value)
        {
            return new ApiResult
            {
                Message = "Success"
            };
        }

        
    }
}
