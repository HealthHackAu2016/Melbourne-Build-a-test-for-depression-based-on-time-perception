package au.com.healthhack.timedilation.dal.api;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class TestResult implements Serializable{
    public String AuthId;
    public String SessionId;
    /// <summary>
    /// eg
    /// basic, simultaneousIntervals, distractors
    /// </summary>
    public String TestName;
    public Date StartTime;

    public List<IntervalTiming> Timings;
}
