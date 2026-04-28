import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbFixCheck {
    public static void main(String[] args) {
        String url = "jdbc:postgresql://dpg-d7eomucvikkc73a3k0j0-a.oregon-postgres.render.com/cms_sif7";
        String user = "user";
        String pass = "wfKRuZeXq6mEOvBDLHVcPKLmNSd5SzoF";
        
        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {
            
            ResultSet rs = stmt.executeQuery("SELECT conname, pg_get_constraintdef(c.oid) FROM pg_constraint c JOIN pg_class t ON c.conrelid = t.oid WHERE t.relname = 'infrastructure'");
            while (rs.next()) {
                System.out.println(rs.getString(1) + " : " + rs.getString(2));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
