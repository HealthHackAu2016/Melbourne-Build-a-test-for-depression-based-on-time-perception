package au.com.healthhack.timedilation.dal;

import java.io.Serializable;
import java.util.ArrayList;

import au.com.healthhack.timedilation.dal.api.TestResult;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class TestSession implements Serializable {
    public String SessionId;
    public ArrayList<TestResult> TestResults;
}
