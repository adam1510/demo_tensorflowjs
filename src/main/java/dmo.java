import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;

public class dmo {
    public static void main(String[] args) throws Exception{
        JSONArray ja = new JSONArray();
        Map m = new LinkedHashMap(2);

        for (int i = 0; i < 1000; i++) {
            m = new LinkedHashMap(2);
            if(i<=200) {
                m.put("size", "S");
                m.put("height", getSize("S"));
            }
            else if(i>200 && i<= 400) {
                m.put("size", "M");
                m.put("height", getSize("M"));
            }
            else if(i>400 && i<= 600) {
                m.put("size", "L");
                m.put("height", getSize("L"));
            }
            else if(i>400 && i<= 600) {
                m.put("size", "L");
                m.put("height", getSize("L"));
            }
            else if(i>600 && i<= 800) {
                m.put("size", "XL");
                m.put("height", getSize("XL"));
            }
            else {
                m.put("size", "XXL");
                m.put("height", getSize("XXL"));
            }
            ja.add(m);
        }
        PrintWriter pw = new PrintWriter("JSONExample.json");
        pw.write(ja.toJSONString());

        pw.flush();
        pw.close();
    }
    private static int  getSize(String s){
        Random randomGenerator = new Random();
        if("S".equals(s)){
            return randomGenerator.nextInt(50)+1460;
        }
        if("M".equals(s)){
            return randomGenerator.nextInt(50)+1520;
        }
        if("L".equals(s)){
            return randomGenerator.nextInt(50)+1650;
        }
        if("XL".equals(s)){
            return randomGenerator.nextInt(50)+1750;
        }
        if("XXL".equals(s)){
            return randomGenerator.nextInt(50)+1850;
        }
        return 1;
    }
}
