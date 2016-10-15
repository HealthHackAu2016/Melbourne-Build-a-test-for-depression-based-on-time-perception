package au.com.healthhack.timedilation.util;

import android.os.Build;
import android.text.Spannable;

/**
 * Created by bramleyt on 15/10/2016.
 */

public class UIUtil {
    public static  float density;
    public static int densityDpi;

    public static class SpannableStringBuilder extends android.text.SpannableStringBuilder{
        public SpannableStringBuilder(){

        }
        public SpannableStringBuilder(CharSequence text){
            super(text);
        }
        public SpannableStringBuilder append(CharSequence text) {
            if(!StringUtils.isNullOrEmpty(text)) {
                int length = length();
                replace(length, length, text, 0, text.length());
            }
            return this;
        }
        /**
         * Appends the character sequence {@code text} and spans {@code what} over the appended part.
         * See {@link android.text.Spanned} for an explanation of what the flags mean.
         * @param text the character sequence to append.
         * @param what the object(s) to be spanned over the appended text.

         * @return this {@code SpannableStringBuilder}.
         */
        public SpannableStringBuilder appendSpans(CharSequence text, Object... what) {
            int start = length();
            append(text);
            for(Object obj : what) {
                setSpan(obj, start, length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
            }
            return this;
        }
        public SpannableStringBuilder append(CharSequence text, Object what, int flags) {
            if(Build.VERSION.SDK_INT>=21){
                super.append(text,what,flags);
            }
            else {
                int start = length();
                append(text);
                setSpan(what, start, length(), flags);
            }
            return this;
        }
    }
}
