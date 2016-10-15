package au.com.healthhack.timedilation.dal;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import au.com.healthhack.timedilation.dal.api.TestResult;
import au.com.healthhack.timedilation.util.StringUtils;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class TestSession implements Serializable {
    public String AuthId;
    public String SessionId;
    /**
     * Populated if the session has tests of only one kind
     */
    public String TestName;
    public String SessionNotes;
    public Date StartTime;
    public Date EndTime;
    public ArrayList<TestResult> TestResults;

    public void setSessionId(String sessionId) {
        SessionId = sessionId;
        if(TestResults!=null)for(TestResult result:TestResults){
            result.SessionId=sessionId;
        }
    }
    public void setAuthId(String authId) {
        AuthId = authId;
        if(TestResults!=null)for(TestResult result:TestResults){
            result.AuthId=authId;
        }
    }
    public double calculateSessionScore(){
        if(EndTime!=null&&!StringUtils.isNullOrEmpty(TestResults)){
            double sum = 0;
            for(TestResult result : TestResults){
                double score = result.calculateScore();
                if(score==0)return 0;//incomplete
                sum+=score;
            }
            return sum/TestResults.size();
        }
        return 0;
    }
}
