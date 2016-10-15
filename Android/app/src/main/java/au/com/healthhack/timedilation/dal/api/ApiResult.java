package au.com.healthhack.timedilation.dal.api;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class ApiResult implements Serializable{
    /// <summary>
    /// 0 for success
    /// </summary>
    public int ErrorNo;
    public String Message;
    /// <summary>
    /// id of created record, if necessary
    /// </summary>
    public long Identity;
}
