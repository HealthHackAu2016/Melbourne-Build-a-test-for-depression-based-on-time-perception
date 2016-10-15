package au.com.healthhack.timedilation;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import java.util.UUID;

import au.com.healthhack.timedilation.activity.IntervalHistoryActivity;
import au.com.healthhack.timedilation.activity.IntervalInstructionsActivity;
import au.com.healthhack.timedilation.dal.AppConfig;
import au.com.healthhack.timedilation.dal.api.ApiConstants;
import au.com.healthhack.timedilation.util.IntentUtil;
import au.com.healthhack.timedilation.util.StringUtils;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        SharedPreferences sp = getSharedPreferences(AppConfig.PREFS_FILE_USERPREFS,0);
        if(StringUtils.isNullOrEmpty(sp.getString(AppConfig.PREF_KEY_AUTH_ID,null))){
            String authId = UUID.randomUUID().toString();
            sp.edit().putString(AppConfig.PREF_KEY_AUTH_ID, authId).apply();
        }
    }

    public void onStartTestClicked(View view) {
        Intent intent = new Intent(this, IntervalInstructionsActivity.class);
        intent.putExtra(IntentUtil.ARG_TEST_NAME, (String)view.getTag());
        startActivity(intent);
    }

    public void onHistoryClicked(View view) {
        Intent intent = new Intent(this, IntervalHistoryActivity.class);
        startActivity(intent);
    }
}
