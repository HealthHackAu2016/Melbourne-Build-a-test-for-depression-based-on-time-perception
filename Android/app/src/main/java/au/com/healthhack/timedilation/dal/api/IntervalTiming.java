package au.com.healthhack.timedilation.dal.api;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class IntervalTiming implements Serializable{
    /// <summary>
    /// For staggered offsets. In the basic case, this will be 0.
    /// Values in ms
    /// </summary>
    public long OffsetFromStartTime;
    /// <summary>
    /// values in ms
    /// </summary>
    public long ExpectedDuration;
    /// <summary>
    /// values in ms
    /// </summary>
    public long ActualDuration;
}
