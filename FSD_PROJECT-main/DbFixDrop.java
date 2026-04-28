import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DbFixDrop {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-d7eomucvikkc73a3k0j0-a.oregon-postgres.render.com/cms_sif7";
        String user = "user";
        String pass = "wfKRuZeXq6mEOvBDLHVcPKLmNSd5SzoF";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            stmt.executeUpdate("ALTER TABLE infrastructure DROP CONSTRAINT IF EXISTS infrastructure_type_check");
            System.out.println("Constraint infrastructure_type_check dropped successfully!");
            
            // Also drop status constraint just in case it's outdated too
            stmt.executeUpdate("ALTER TABLE infrastructure DROP CONSTRAINT IF EXISTS infrastructure_status_check");
            System.out.println("Constraint infrastructure_status_check dropped successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
