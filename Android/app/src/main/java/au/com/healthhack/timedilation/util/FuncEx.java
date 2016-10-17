package au.com.healthhack.timedilation.util;

import static net.servicestack.func.Func.*;

import net.servicestack.func.Func;
import net.servicestack.func.Function;
import net.servicestack.func.Predicate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Collection;

/**
 * Created by Bramley on 11/08/2015.
 */
public class FuncEx {
    public interface Action<T>{
        void apply(T item);
    }
    public static <T> ArrayList<T> distinct(Iterable<T> xs, Comparator<? super T> equality) {
        ArrayList<T> distincts = new ArrayList<T>();
        for (T x : xs) {
            for(T ex : distincts){
                if(equality.compare(x, ex)==0)
                    break;
                distincts.add(x);
            }
        }
        return distincts;
    }

    public static <T, U> ArrayList<U> select(Iterable<T> xs, Function<T,U> selector){
       return map(xs, selector);
    }

    public static <T, U> ArrayList<U> selectMany(Iterable<T> xs, Function<T,Collection<U>> selector){

        ArrayList<U> result = new ArrayList<>();
        for(T x : xs){
            result.addAll(selector.apply(x));
        }
        return result;
        //return expand(map(xs, selector));
    }


    /**
     * Returns true if two possibly-null objects are equal.
     */
    public static boolean equal(Object a, Object b) {
        return a == b || (a != null && a.equals(b));
    }
    public static boolean equalGuid(String a, String b) {
        if(a==null||b==null)return a==b;
        return a.replace("-","").equalsIgnoreCase(b.replace("-",""));
    }

    public static int hashCode(Object o) {
        return (o == null) ? 0 : o.hashCode();
    }
    public static <T extends Comparable<? super T>> int compare(T aVal, T bVal){
        int compare;
        if (aVal == null && bVal == null)
            compare = 0;
        else if (aVal == null)
            compare = -1;
        else if (bVal == null)
            compare = 1;
        else
            compare = aVal.compareTo(bVal);
        return compare;
    }


}
