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
        /// <summary>
        /// For staggered offsets. In the basic case, this will be 0.
        /// Values in ms
        /// </summary>
        public long OffsetFromStartTime { get; set; }
        /// <summary>
        /// values in ms
        /// </summary>
        public long ExpectedDuration { get; set; }
        /// <summary>
        /// values in ms
        /// </summary>
        public long ActualDuration { get; set; }
    }


    public class ApiResult
    {
        /// <summary>
        /// 0 for success
        /// </summary>
        public int ErrorNo { get; set; }
        public string Message { get; set; }
        /// <summary>
        /// id of created record, if necessary
        /// </summary>
        public long? Identity { get; set; }
    }
    [RoutePrefix("api/Intervals")]
    public class IntervalsController : ApiController
    {
        [Route("QueryIntervals")]
        public List<TestResult> Get(DateTime DateFrom, DateTime? DateTo, string AuthId)
        {
            return new List<TestResult>();
        }
        

        // POST api/intervals
        public ApiResult Post([FromBody]TestResult value)
        {

            //todo save this object
            return new ApiResult
            {
                ErrorNo = 0,
                Message = "Success"
            };
        }

        
    }
}
