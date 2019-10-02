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
                m.put("weight", getWeight("S"));

            }
            else if(i>200 && i<= 400) {
                m.put("size", "M");
                m.put("height", getSize("M"));
                m.put("weight", getWeight("M"));
            }
            else if(i>400 && i<= 600) {
                m.put("size", "L");
                m.put("height", getSize("L"));
                m.put("weight", getWeight("L"));
            }
            else if(i>600 && i<= 800) {
                m.put("size", "XL");
                m.put("height", getSize("XL"));
                m.put("weight", getWeight("XL"));
            }
            else {
                m.put("size", "XXL");
                m.put("height", getSize("XXL"));
                m.put("weight", getWeight("XXL"));
            }
            ja.add(m);
        }
        PrintWriter pw = new PrintWriter("JSONExample.json");
        pw.write(ja.toJSONString());

        pw.flush();
        pw.close();
    }
    private static int getWeight (String s){
        Random randomGenerator = new Random();
        if("S".equals(s)){
            return randomGenerator.nextInt(10)+42;
        }
        if("M".equals(s)){
            return randomGenerator.nextInt(10)+52;
        }
        if("L".equals(s)){
            return randomGenerator.nextInt(10)+62;
        }
        if("XL".equals(s)){
            return randomGenerator.nextInt(10)+72;
        }
        if("XXL".equals(s)){
            return randomGenerator.nextInt(10)+82;
        }
        return 1;
    }

    private static int  getSize(String s){
        Random randomGenerator = new Random();
        if("S".equals(s)){
            return randomGenerator.nextInt(100)+1450;
        }
        if("M".equals(s)){
            return randomGenerator.nextInt(100)+1550;
        }
        if("L".equals(s)){
            return randomGenerator.nextInt(100)+1650;
        }
        if("XL".equals(s)){
            return randomGenerator.nextInt(100)+1750;
        }
        if("XXL".equals(s)){
            return randomGenerator.nextInt(100)+1850;
        }
        return 1;
    }
}
