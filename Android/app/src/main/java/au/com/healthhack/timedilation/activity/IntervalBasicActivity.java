package au.com.healthhack.timedilation.activity;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.style.RelativeSizeSpan;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;

import com.androidquery.AQuery;

import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import au.com.healthhack.timedilation.R;
import au.com.healthhack.timedilation.dal.TestSession;
import au.com.healthhack.timedilation.dal.api.TestResult;
import au.com.healthhack.timedilation.util.IntentUtil;
import au.com.healthhack.timedilation.util.UIUtil;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class IntervalBasicActivity extends AppCompatActivity {

    private TestSession testSession;
    private int testIndex;
    private Button btnStartStop;
    private AQuery aq;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_interval_basic);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        aq = new AQuery(this);
        Bundle restoreState = savedInstanceState!=null?savedInstanceState:getIntent().getExtras();
        testSession = (TestSession) restoreState.getSerializable(IntentUtil.ARG_TEST_SESSION);
        testIndex = restoreState.getInt("testIndex",0);

        btnStartStop = (Button) findViewById(R.id.button_start_stop);
        btnStartStop.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                if(motionEvent.getAction()==MotionEvent.ACTION_DOWN){
                    Date now = new Date();
                    if(testSession.TestResults.get(testIndex).StartTime==null){
                        //START
                        testSession.TestResults.get(testIndex).StartTime=now;
                        btnStartStop.setText("Stop");
                        btnStartStop.setActivated(true);
                        aq.id(R.id.text_instructions).text("Hit stop to finish");

                    }
                    else if (testSession.TestResults.get(testIndex).Timings.get(0).ActualDuration<=0){
                        long duration =now.getTime()- testSession.TestResults.get(testIndex).StartTime.getTime();
                        if(duration>2000){
                            //debounce
                            //STOP
                            testSession.TestResults.get(testIndex).Timings.get(0).ActualDuration=duration;
                            aq.id(R.id.text_instructions).text("Results");
                            btnStartStop.setActivated(false);
                            btnStartStop.setText(testIndex<testSession.TestResults.size()-1?"Next":"Done");
                            aq.id(R.id.text_duration).text(formatDuration(duration));
                            double v = (duration - testSession.TestResults.get(testIndex).Timings.get(0).ExpectedDuration) / 1000d;
                            aq.id(R.id.text_delta).visible().text(String.format("%s%.1f s", v>0?"+":"", v));
                            aq.id(R.id.lbl_actual_time).visible();

                        }
                    }else{
                        btnStartStop.setActivated(false);
                        if(testIndex<testSession.TestResults.size()-1){
                            //todo save result
                            testIndex++;
                            loadTest();
                        }
                        else{
                            //done
                            finish();
                        }
                    }
                }
                return false;
            }
        });
        loadTest();
    }
    private CharSequence formatDuration(long duration){
        UIUtil.SpannableStringBuilder sb = new UIUtil.SpannableStringBuilder();
        double seconds = duration/1000d;
        String str = String.format(Locale.US, "%.1f",seconds);
        sb.append(str.substring(0, str.indexOf(".")));
        sb.appendSpans(str.substring(str.indexOf("."), str.length()), new RelativeSizeSpan(2/3f));
        sb.append('\n');
        sb.appendSpans("seconds", new RelativeSizeSpan(2/3f));
        return sb;
    }
    private View.OnClickListener mClick = new View.OnClickListener() {
        @Override
        public void onClick(View view) {

        }
    };

    private void loadTest(){
        TestResult test = testSession.TestResults.get(testIndex);
        btnStartStop.setText("Start");
        btnStartStop.setActivated(false);

        UIUtil.SpannableStringBuilder sb = new UIUtil.SpannableStringBuilder();
        sb.append(String.format("%.0f", test.Timings.get(0).ExpectedDuration/1000d));
        sb.append('\n');
        sb.appendSpans("seconds", new RelativeSizeSpan(2/3f));
        aq.id(R.id.text_duration).text(sb);

        aq.id(R.id.lbl_actual_time).gone();
        aq.id(R.id.text_delta).gone();
        aq.id(R.id.text_instructions).text("Hit start to begin");

        ViewGroup tabContainer = (ViewGroup) findViewById(R.id.tabs_progress_container);
        if(tabContainer.getChildCount()!=testSession.TestResults.size()){
            tabContainer.removeAllViews();
            for(int i=0;i<testSession.TestResults.size();i++){
                View view = new View(this);

            }
        }
    }
}