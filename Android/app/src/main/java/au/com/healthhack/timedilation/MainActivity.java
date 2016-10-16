package au.com.healthhack.timedilation;

import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import au.com.healthhack.timedilation.activity.IntervalHistoryActivity;
import au.com.healthhack.timedilation.activity.IntervalInstructionsActivity;
import au.com.healthhack.timedilation.adapter.CellRecyclerAdapter;
import au.com.healthhack.timedilation.adapter.CellViewHolder;
import au.com.healthhack.timedilation.dal.AppConfig;
import au.com.healthhack.timedilation.dal.AppDatabaseHelper;
import au.com.healthhack.timedilation.dal.api.ApiConstants;
import au.com.healthhack.timedilation.util.IntentUtil;
import au.com.healthhack.timedilation.util.StringUtils;

/**
 * Level list screen
 */
public class MainActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;

    private String mAuthId;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_recyclerview);
        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerview);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        SharedPreferences sp = getSharedPreferences(AppConfig.PREFS_FILE_USERPREFS,0);
        mAuthId = sp.getString(AppConfig.PREF_KEY_AUTH_ID,null);
        if(StringUtils.isNullOrEmpty(mAuthId)){
            mAuthId = UUID.randomUUID().toString();
            sp.edit().putString(AppConfig.PREF_KEY_AUTH_ID, mAuthId).apply();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if(mRecyclerView.getAdapter()!=null)
            ((LevelAdapter)mRecyclerView.getAdapter()).updateData();
        else
            mRecyclerView.setAdapter(new LevelAdapter());
    }


    public void onHistoryClicked(View view) {
        Intent intent = new Intent(this, IntervalHistoryActivity.class);
        startActivity(intent);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case R.id.menu_history:
                onHistoryClicked(null);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private class LevelItem{
        String testName;
        String text1, text2;
        boolean isLocked;
        int completedSessions;
    }
    private class LevelAdapter extends CellRecyclerAdapter<CellViewHolder, LevelItem>{
        ArrayList<LevelItem> aItems;
        LevelAdapter(){
            updateData();
        }
        void updateData(){
            aItems = new ArrayList<>();

            SQLiteDatabase db = new AppDatabaseHelper(MainActivity.this).getReadableDatabase();
            String query = "select count(1) from "+AppDatabaseHelper.TBL_TEST_SESSION
                    +" where AuthId = ? AND TestName = ? AND EndTime>0 AND SessionScore>0";


            LevelItem level = new LevelItem();
            level.testName=ApiConstants.TEST_BASIC;
            level.text1="Level 1";
            level.text2="Open Intervals";
            level.isLocked=false;
            Cursor c = db.rawQuery(query, new String[]{mAuthId, level.testName});
            if(c.moveToFirst()){
                level.completedSessions=c.getInt(0);
            }
            c.close();
            aItems.add(level);

            level = new LevelItem();
            level.testName=ApiConstants.TEST_SIMULTANEOUS_INTERVALS;
            level.text1="Level 2";
            level.text2="Simultaneous Intervals";
            level.isLocked=aItems.get(aItems.size()-1).completedSessions==0; //locked if previous level incomplete
            c = db.rawQuery(query, new String[]{mAuthId, level.testName});
            if(c.moveToFirst()){
                level.completedSessions=c.getInt(0);
            }
            c.close();
            aItems.add(level);

            level = new LevelItem();
            level.testName=ApiConstants.TEST_DISTRACTOR;
            level.text1="Level 3";
            level.text2="Intervals with distractions";
            level.isLocked=aItems.get(aItems.size()-1).completedSessions==0; //locked if previous level incomplete
            c = db.rawQuery(query, new String[]{mAuthId, level.testName});
            if(c.moveToFirst()){
                level.completedSessions=c.getInt(0);
            }
            c.close();
            aItems.add(level);

            db.close();
            notifyDataSetChanged();
        }
        @Override
        public List<LevelItem> getItems() {
            return aItems;
        }

        @Override
        public CellViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            CellViewHolder vh = new CellViewHolder(parent, R.layout.cell_level_item);
            vh.itemView.setTag(vh);
            vh.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    CellViewHolder vh = (CellViewHolder) view.getTag();
                    LevelItem item = getItem(vh.getAdapterPosition());
                    if(item.isLocked){
                        Toast.makeText(MainActivity.this, "Level locked. Complete the previous level first", Toast.LENGTH_SHORT).show();
                    }

                        Intent intent = new Intent(MainActivity.this, IntervalInstructionsActivity.class);
                        intent.putExtra(IntentUtil.ARG_TEST_NAME, item.testName);
                        startActivity(intent);

                }
            });
            return vh;
        }

        @Override
        public void onBindViewHolder(CellViewHolder vh, int position) {
            LevelItem item = getItem(position);
            vh.aq().id(R.id.text1).text(item.text1);
            vh.aq().id(R.id.text2).text(item.text2);
            vh.aq().id(R.id.ic_chink).image(item.isLocked?R.drawable.ic_lock_outline_black_24dp:R.drawable.ic_navigate_next_black_24dp);
            vh.aq().id(R.id.lbl_new).visibility(item.completedSessions==0&&!item.isLocked?View.VISIBLE:View.GONE);
        }
    }
}
