package au.com.healthhack.timedilation.dal.api;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import au.com.healthhack.timedilation.util.StringUtils;

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
    public double calculateScore(){
        if(!StringUtils.isNullOrEmpty(Timings)){
            double sum = 0;
            for(IntervalTiming timing:Timings){
                if(timing.ActualDuration<=0)return 0;//not finished
                double score = Math.sqrt(Math.pow((timing.ActualDuration-timing.ExpectedDuration),2))/(double)timing.ExpectedDuration;
                sum+=score;
            }
            return 100f-(100f*(sum/Timings.size()));
        }
        return 0;
    }
}
