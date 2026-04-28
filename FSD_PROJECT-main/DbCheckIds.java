import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbCheckIds {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-d7eomucvikkc73a3k0j0-a.oregon-postgres.render.com/cms_sif7";
        String user = "user";
        String pass = "wfKRuZeXq6mEOvBDLHVcPKLmNSd5SzoF";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT id FROM infrastructure ORDER BY id DESC LIMIT 5");
            System.out.println("Existing IDs:");
            while (rs.next()) {
                System.out.println(rs.getInt(1));
            }

            rs = stmt.executeQuery("SELECT nextval('infrastructure_id_seq')");
            if (rs.next()) {
                System.out.println("Next Sequence Value: " + rs.getInt(1));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
