package au.com.healthhack.timedilation.activity;

import android.database.Cursor;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.ViewGroup;

import java.util.Date;

import au.com.healthhack.timedilation.R;
import au.com.healthhack.timedilation.adapter.CellViewHolder;
import au.com.healthhack.timedilation.adapter.CursorRecyclerAdapter;
import au.com.healthhack.timedilation.dal.AppConfig;
import au.com.healthhack.timedilation.dal.AppDatabaseHelper;
import au.com.healthhack.timedilation.util.StringUtils;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class IntervalHistoryActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_recyclerview);
        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerview);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    @Override
    protected void onResume() {
        super.onResume();
        AppDatabaseHelper db = new AppDatabaseHelper(this);
        String authId = getSharedPreferences(AppConfig.PREFS_FILE_USERPREFS,0).getString(AppConfig.PREF_KEY_AUTH_ID,null);
        Cursor c = db.getReadableDatabase().rawQuery("SELECT SessionId, TestName, StartTime, SessionScore FROM "
                +AppDatabaseHelper.TBL_TEST_SESSION+" WHERE AuthId = ? ORDER BY StartTime DESC",new String[]{authId});
        if(mRecyclerView.getAdapter()!=null){
            ((HistoryAdapter)mRecyclerView.getAdapter()).changeCursor(c);

        }
        else{
            mRecyclerView.setAdapter(new HistoryAdapter(c));
        }
    }

    private class HistoryAdapter extends CursorRecyclerAdapter<CellViewHolder>{

        public HistoryAdapter(Cursor c) {
            super(c);
        }

        @Override
        protected String getRowIDColumnName() {
            return "SessionId";
        }
        @Override
        public CellViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            return new CellViewHolder(parent, R.layout.cell_simple_2_line);
        }

        @Override
        public void onBindViewHolder(CellViewHolder vh, Cursor cursor) {
            vh.itemView.setTag(cursor.getPosition());
            String heading = StringUtils.formatDate(new Date(cursor.getLong(cursor.getColumnIndex("StartTime"))),StringUtils.DATE_AND_TIME_STANDARD);
            heading+=": "+ cursor.getString(cursor.getColumnIndex("TestName"));
            double sessionScore = cursor.getDouble(cursor.getColumnIndex("SessionScore"));
            String subText = sessionScore!=0?String.format("Score: %.1f%%", sessionScore*100):"incomplete";
            vh.aq().id(R.id.text1).text(heading);
            vh.aq().id(R.id.text2).text(subText);
        }

    }

}
