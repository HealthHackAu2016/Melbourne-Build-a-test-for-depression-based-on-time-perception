package au.com.healthhack.timedilation.activity;

import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.widget.ViewDragHelper;
import android.support.v7.app.AppCompatActivity;
import android.text.style.RelativeSizeSpan;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;

import com.androidquery.AQuery;

import java.util.Date;
import java.util.Locale;

import au.com.healthhack.timedilation.R;
import au.com.healthhack.timedilation.dal.AppDatabaseHelper;
import au.com.healthhack.timedilation.dal.TestSession;
import au.com.healthhack.timedilation.dal.api.IntervalTiming;
import au.com.healthhack.timedilation.dal.api.TestResult;
import au.com.healthhack.timedilation.util.IntentUtil;
import au.com.healthhack.timedilation.util.UIUtil;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class IntervalSimultActivity extends AppCompatActivity {

    private static final String TAG = "IntervalSimult";
    private TestSession testSession;
    private int testIndex;
    private Button btnStartStopAll;
    private AQuery aq;
    private final int[] incIds = new int[]{R.id.include_simultaneous_container_1,R.id.include_simultaneous_container_2};
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_interval_simult);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        aq = new AQuery(this);


        Bundle restoreState = savedInstanceState!=null?savedInstanceState:getIntent().getExtras();
        testSession = (TestSession) restoreState.getSerializable(IntentUtil.ARG_TEST_SESSION);
        testIndex = restoreState.getInt("testIndex",0);

        View.OnTouchListener touchListener = new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                if (motionEvent.getAction() == MotionEvent.ACTION_DOWN) {
                    Date now = new Date();
                    onButtonTouch(view, now);
                }
                return false;
            }
        };
        for (int i = 0; i < incIds.length; i++) {
            Button btnStartStop = aq.id(incIds[i], R.id.button_start_stop).getButton();
            btnStartStop.setTag(i);
            btnStartStop.setOnTouchListener(touchListener);
            btnStartStop.setActivated(true);
        }
        btnStartStopAll = (Button) findViewById(R.id.button_start_stop_all);
        btnStartStopAll.setOnTouchListener(touchListener);
        loadTest();
    }
    private boolean finishedThisTest(){
        return countIntervalsComplete()==testSession.TestResults.get(testIndex).Timings.size();
    }
    private int countIntervalsComplete(){
        TestResult testResult = testSession.TestResults.get(testIndex);
        int allDone=0;
        for(IntervalTiming timing : testResult.Timings){
            if(timing.ActualDuration>0){
                allDone++;
            }
        }
        return allDone;
    }

    private Date mLastTouch;
    private void onButtonTouch(View view, Date now){
        if(mLastTouch!=null && (now.getTime()-mLastTouch.getTime())<1500) //debounce
            return;
        mLastTouch=now;
        TestResult testResult = testSession.TestResults.get(testIndex);
        if(view==btnStartStopAll){
            if(testResult.StartTime==null){
                //START all
                testResult.StartTime=now;
                btnStartStopAll.setVisibility(View.INVISIBLE);
                aq.id(R.id.text_instructions).text("Hit stop to finish each timer");
                for(int i=0;i<incIds.length;i++){
                    aq.id(incIds[i],R.id.button_start_stop).visible();
                }
            }
            else{
                //all done?
                boolean allDone=finishedThisTest();

                if(allDone){
                    //next/finish
                    if (testIndex < testSession.TestResults.size() - 1) {
                        //todo save result
                        testIndex++;
                        loadTest();
                    } else {
                        //done
                        finish();
                    }
                }
            }
        }
        else {
            //one of the individual start/stop buttons
            int timingIndex = (int) view.getTag();
            if (testResult.Timings.get(timingIndex).ActualDuration <= 0) {
                //STOP
                testResult.Timings.get(timingIndex).ActualDuration = now.getTime() - testResult.StartTime.getTime();
                int completedCount = countIntervalsComplete();
                boolean allDone = completedCount==testResult.Timings.size();

                aq.id(incIds[timingIndex],R.id.button_start_stop).invisible();
                String strInstructions = allDone?"Results":String.format("Finished %d/%d",completedCount,testResult.Timings.size());
                if(allDone) {
                    boolean hasNext = testIndex < testSession.TestResults.size() - 1;
                    AppDatabaseHelper databaseHelper = new AppDatabaseHelper(IntervalSimultActivity.this);
                    long id = databaseHelper.insertTestResult(testResult);
                    Log.d(TAG, "inserted: " + id);
                    if (!hasNext) {
                        testSession.EndTime = now;
                        databaseHelper.insertUpdateTestSession(testSession);
                        String json = AppDatabaseHelper.getGson().toJson(testSession);
                        Log.d(TAG, json);
                        strInstructions=String.format("Results\nSession Score: %.1f%%",testSession.calculateSessionScore());
                    }


                    btnStartStopAll.setText(hasNext ? "Next" : "Done");
                    btnStartStopAll.setVisibility(View.VISIBLE);
                    for (int i = 0; i < incIds.length; i++) {

                        long duration0 = testResult.Timings.get(i).ActualDuration;
                        aq.id(incIds[i], R.id.text_duration).text(formatDuration(duration0));
                        double v = (duration0 - testResult.Timings.get(i).ExpectedDuration) / 1000d;

                        aq.id(incIds[i], R.id.lbl_actual_time).visible();

                        String strDelta = String.format("%s%.1f s", v > 0 ? "+" : "", v);

                        aq.id(incIds[i], R.id.text_delta).visible().text(strDelta);
                    }

                }

                aq.id(R.id.text_instructions).text(strInstructions);

            }
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        outState.putSerializable(IntentUtil.ARG_TEST_SESSION, testSession);
        outState.putInt("testIndex", testIndex);
        super.onSaveInstanceState(outState);
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
        btnStartStopAll.setText("Start");
        btnStartStopAll.setActivated(false);
        btnStartStopAll.setVisibility(View.VISIBLE);

        UIUtil.SpannableStringBuilder sb;

        aq.id(R.id.text_instructions).text("Hit start to begin both timers");

        for (int i = 0; i < incIds.length; i++) {
            sb = new UIUtil.SpannableStringBuilder();
            sb.append(String.format("%.0f", test.Timings.get(i).ExpectedDuration/1000d));
            sb.append('\n');
            sb.appendSpans("seconds", new RelativeSizeSpan(2/3f));
            aq.id(incIds[i],R.id.text_duration).text(sb);
            aq.id(incIds[i],R.id.lbl_actual_time).gone();
            aq.id(incIds[i],R.id.text_delta).gone();
            aq.id(incIds[i],R.id.button_start_stop).invisible();

        }

        ViewGroup tabContainer = (ViewGroup) findViewById(R.id.tabs_progress_container);
        float density = getResources().getDisplayMetrics().density;
        int densityDpi = getResources().getDisplayMetrics().densityDpi;
        tabContainer.removeAllViews();
        for(int i=0;i<testSession.TestResults.size();i++){
            View view = new View(this);
            view.setBackgroundColor(i>testIndex?Color.GRAY:Color.BLACK);
            int p = (int) (4*density+0.5f);
            LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.MATCH_PARENT,1);
            lp.setMargins(0,0,p,0);
            tabContainer.addView(view, lp);
        }
    }
}
