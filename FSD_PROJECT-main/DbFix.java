import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbFix {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-d7eomucvikkc73a3k0j0-a.oregon-postgres.render.com/cms_sif7";
        String user = "user";
        String pass = "wfKRuZeXq6mEOvBDLHVcPKLmNSd5SzoF";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT pg_get_constraintdef(c.oid) FROM pg_constraint c JOIN pg_class t ON c.conrelid = t.oid WHERE t.relname = 'infrastructure' AND c.conname = 'infrastructure_type_check'");
            if (rs.next()) {
                System.out.println("Constraint definition: " + rs.getString(1));
            } else {
                System.out.println("Constraint not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
