package au.com.healthhack.timedilation.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

import com.androidquery.AQuery;

import net.servicestack.func.Func;

import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

import au.com.healthhack.timedilation.R;
import au.com.healthhack.timedilation.dal.TestSession;
import au.com.healthhack.timedilation.dal.api.ApiConstants;
import au.com.healthhack.timedilation.dal.api.IntervalTiming;
import au.com.healthhack.timedilation.dal.api.TestResult;
import au.com.healthhack.timedilation.util.IntentUtil;

/**
 * Show instructions, eg 'you will see 6 sets of intervals, and will be asked to estimate the duration'.
 */

public class IntervalInstructionsActivity extends AppCompatActivity {
    private TestSession testSession;
    private String testName;
    private AQuery aq;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        testName = getIntent().getStringExtra(IntentUtil.ARG_TEST_NAME);
        setContentView(R.layout.activity_interval_instructions);
        aq = new AQuery(this);
        if(testSession==null){
            switch (testName){
                case ApiConstants.TEST_BASIC:
                    testSession = makeBasicSession();
                    break;
                case ApiConstants.TEST_SIMULTANEOUS_INTERVALS:
                    testSession = makeSimultIntervalSession();
                    break;
                case ApiConstants.TEST_DISTRACTOR:
                    testSession = makeDistractorSession();
                    break;
            }
        }

        aq.id(R.id.text1).text(String.format("You will see %d sets of intervals, and will be asked to estimate the duration",
                testSession.TestResults.size()));
        aq.id(R.id.button1).clicked(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=null;
                switch (testName){
                    case ApiConstants.TEST_BASIC:
                        intent = new Intent(IntervalInstructionsActivity.this, IntervalBasicActivity.class);
                        break;
                }
                if(intent!=null){
                    intent.putExtra(IntentUtil.ARG_TEST_NAME, testName);
                    intent.putExtra(IntentUtil.ARG_TEST_SESSION, testSession);
                    startActivity(intent);
                }
            }
        });
    }

    private TestSession makeBasicSession(){
        TestSession result = new TestSession();
        result.SessionId= UUID.randomUUID().toString();
        result.TestResults = new ArrayList<>();
        //random list of intervals
        for(int i : new int[]{10,20,30,40,60,90}){
            TestResult screen = new TestResult();
            screen.SessionId=result.SessionId;
            screen.TestName=ApiConstants.TEST_BASIC;
            IntervalTiming timing = new IntervalTiming();
            timing.OffsetFromStartTime=0;
            timing.ExpectedDuration=i*1000L;
            screen.Timings= Func.toList(timing);
            result.TestResults.add(screen);
        }
        //random order of intervals
        Collections.shuffle(result.TestResults);
        return result;
    }
    private TestSession makeDistractorSession(){
        TestSession result = new TestSession();
        result.SessionId= UUID.randomUUID().toString();
        result.TestResults = new ArrayList<>();
        //random list of intervals
        for(int i : new int[]{10,20,30,40,60,90}){
            TestResult screen = new TestResult();
            screen.SessionId=result.SessionId;
            screen.TestName=ApiConstants.TEST_DISTRACTOR;
            IntervalTiming timing = new IntervalTiming();
            timing.OffsetFromStartTime=0;
            timing.ExpectedDuration=i*1000L;
            screen.Timings= Func.toList(timing);
            result.TestResults.add(screen);
        }
        //random order of intervals
        Collections.shuffle(result.TestResults);
        return result;
    }
    private TestSession makeSimultIntervalSession(){
        TestSession result = new TestSession();
        result.SessionId= UUID.randomUUID().toString();
        result.TestResults = new ArrayList<>();
        //random list of intervals
        final ArrayList<Integer> firstDurations = Func.toList(new int[]{10, 20, 30, 40, 60, 90});
        ArrayList<Integer> secondDurations = Func.toList(firstDurations);//clone
        Collections.shuffle(secondDurations);
        for(int i =0;i<firstDurations.size();i++){
            TestResult screen = new TestResult();
            screen.SessionId=result.SessionId;
            screen.TestName=ApiConstants.TEST_SIMULTANEOUS_INTERVALS;
            IntervalTiming firstDuration = new IntervalTiming();
            firstDuration.OffsetFromStartTime=0;
            firstDuration.ExpectedDuration=firstDurations.get(i)*1000L;
            IntervalTiming secondDuration = new IntervalTiming();
            secondDuration.OffsetFromStartTime=0;
            secondDuration.ExpectedDuration=secondDurations.get(i)*1000L;
            screen.Timings= Func.toList(firstDuration,secondDuration);
            result.TestResults.add(screen);
        }
        return result;
    }

}
