package au.com.healthhack.timedilation;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import au.com.healthhack.timedilation.activity.IntervalInstructionsActivity;
import au.com.healthhack.timedilation.dal.api.ApiConstants;
import au.com.healthhack.timedilation.util.IntentUtil;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onBasicClicked(View view) {
        Intent intent = new Intent(this, IntervalInstructionsActivity.class);
        intent.putExtra(IntentUtil.ARG_TEST_NAME, ApiConstants.TEST_BASIC);
        startActivity(intent);
    }
}
