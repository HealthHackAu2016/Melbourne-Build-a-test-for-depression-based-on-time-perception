package au.com.healthhack.timedilation.dal;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.servicestack.client.JsonSerializers;

import java.util.ArrayList;
import java.util.Date;

import au.com.healthhack.timedilation.dal.api.TestResult;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class AppDatabaseHelper extends SQLiteOpenHelper {
    private static final int DB_VERSION = 5;
    public static final String TAG = "TimedilationDB";
    public static final String TBL_TEST_RESULT = "TestResult";
    public static final String TBL_TEST_SESSION = "TestSession";
    private static final String createTestResultTable = "create table " + TBL_TEST_RESULT + " " +
            "(_id integer primary key autoincrement, " +
            "AuthId varchar, " +
            "SessionId varchar, " +
            "TestName varchar, " +
            "StartTime integer, " +
            "Score double, " + //derived column, allows us to query ORDER BY SCORE
            "Json varchar);";
    private static final String createTestSessionTable = "create table " + TBL_TEST_SESSION + " " +
            "(SessionId varchar primary key, " +
            "AuthId varchar, " +
            "TestName varchar, " +
            "SessionNotes varchar, " +
            "StartTime integer, " +
            "EndTime integer, "+
            "SessionScore double);"; //derived column


    public AppDatabaseHelper(Context context) {
        super(context, "timedilationDB", null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        Log.d(TAG, "onCreate db");
        sqLiteDatabase.execSQL(createTestSessionTable);
        sqLiteDatabase.execSQL(createTestResultTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int oldVersion, int newVersion) {
        Log.d(TAG, "onUpgrade db to "+newVersion);
        sqLiteDatabase.execSQL("drop table if exists " + TBL_TEST_SESSION);
        sqLiteDatabase.execSQL("drop table if exists " + TBL_TEST_RESULT);
        onCreate(sqLiteDatabase);
    }

    public static Gson getGson() {
        return new GsonBuilder()
                .registerTypeAdapter(Date.class, JsonSerializers.getDateSerializer())
                .registerTypeAdapter(Date.class, JsonSerializers.getDateDeserializer())
                .create();
    }

    public long insertTestResult(TestResult testResult) {
        SQLiteDatabase db = getWritableDatabase();
        long id = db.insert(TBL_TEST_RESULT, null, testResultToContentValues(testResult));
        db.close();
        return id;
    }
    public long insertUpdateTestSession(TestSession testSession) {
        long ok=-1;
        //exists?
        TestSession existing = getTestSessionBySessionId(testSession.SessionId, false);
        SQLiteDatabase db = getWritableDatabase();

        if(existing !=null){
            //update
            db.update(TBL_TEST_SESSION, testSessionToContentValues(testSession), "SessionId=?", new String[]{testSession.SessionId});
            ok=0;
        }
        else{
            //insert
            ok = db.insert(TBL_TEST_SESSION, null, testSessionToContentValues(testSession));
        }
        db.close();
        return ok;
    }
    public TestSession getTestSessionBySessionId(String sessionId, boolean includeTestResults){
        TestSession session=null;
        SQLiteDatabase db = getReadableDatabase();
        Cursor c = db.rawQuery("select * from "+TBL_TEST_SESSION+" where SessionId=?", new String[]{sessionId});
        if(c.moveToFirst()){
             session= readTestSessionFromCursor(c);
            c.close();
            if(includeTestResults){
                session.TestResults=new ArrayList<>();
                c = db.rawQuery("select * from "+TBL_TEST_RESULT+" where SessionId=? order by StartTime ASC",new String[]{sessionId});
                while (c.moveToNext()){
                    session.TestResults.add(readTestResultFromCursor(c));
                }
                c.close();
            }

        }
        db.close();
        return session;
    }

    private ContentValues testResultToContentValues(TestResult testResult) {
        ContentValues cv = new ContentValues();
        cv.put("AuthId", testResult.AuthId);
        cv.put("SessionId", testResult.SessionId);
        cv.put("TestName", testResult.TestName);
        cv.put("StartTime", testResult.StartTime == null ? 0 : testResult.StartTime.getTime());
        cv.put("Score", testResult.calculateScore());
        cv.put("Json", getGson().toJson(testResult));
        return cv;
    }

    private TestResult readTestResultFromCursor(Cursor c) {
        String json = c.getString(c.getColumnIndexOrThrow("Json"));
        TestResult result = getGson().fromJson(json, TestResult.class);
        return result;
    }

    private ContentValues testSessionToContentValues(TestSession testSession) {
        ContentValues cv = new ContentValues();
        cv.put("SessionId", testSession.SessionId);
        cv.put("AuthId", testSession.AuthId);
        cv.put("TestName", testSession.TestName);
        cv.put("SessionNotes", testSession.SessionNotes);
        cv.put("StartTime", testSession.StartTime == null ? 0 : testSession.StartTime.getTime());
        cv.put("EndTime", testSession.EndTime == null ? 0 : testSession.EndTime.getTime());
        cv.put("SessionScore", testSession.calculateSessionScore());
        return cv;

    }
    private TestSession readTestSessionFromCursor(Cursor c) {
        TestSession result = new TestSession();
        result.SessionId = c.getString(c.getColumnIndexOrThrow("SessionId"));
        result.AuthId = c.getString(c.getColumnIndexOrThrow("AuthId"));
        result.TestName = c.getString(c.getColumnIndexOrThrow("TestName"));
        result.SessionNotes = c.getString(c.getColumnIndexOrThrow("SessionNotes"));
        result.StartTime = new Date(c.getLong(c.getColumnIndexOrThrow("StartTime")));
        result.EndTime = new Date(c.getLong(c.getColumnIndexOrThrow("EndTime")));

        return result;
    }
}