import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbCheckExists {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-d7eomucvikkc73a3k0j0-a.oregon-postgres.render.com/cms_sif7";
        String user = "user";
        String pass = "wfKRuZeXq6mEOvBDLHVcPKLmNSd5SzoF";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT id, block, room_or_lab_name FROM infrastructure LIMIT 20");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt(1) + " | Block: " + rs.getString(2) + " | Room: " + rs.getString(3));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
