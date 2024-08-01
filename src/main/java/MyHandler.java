import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MyHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {
            String response = getProjects();
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } else {
            exchange.sendResponseHeaders(405, -1); // Method Not Allowed
        }
    }

    private String getProjects() {
        String response = "";
        Connection conn = null;
        Statement stmt = null;
        try {
            // Load the SQLite JDBC driver
            Class.forName("org.sqlite.JDBC");

            // Connect to the SQLite database
            String dbPath = "src/main/resources/website.db"; // Ensure correct path to your DB file
            conn = DriverManager.getConnection("jdbc:sqlite:" + dbPath);
            stmt = conn.createStatement();
            String sql = "SELECT id, project_name, project_date, desc, img_url, tags FROM projects";
            ResultSet rs = stmt.executeQuery(sql);

            // Create a JSON array to hold the project data
            JSONArray projectsArray = new JSONArray();
            while (rs.next()) {
                JSONObject project = new JSONObject();
                project.put("id", rs.getInt("id"));
                project.put("project_name", rs.getString("project_name"));
                project.put("project_date", rs.getString("project_date"));
                project.put("desc", rs.getString("desc"));
                project.put("img_url", rs.getString("img_url"));
                project.put("tags", rs.getString("tags"));
                projectsArray.put(project);
            }
            rs.close();
            stmt.close();
            conn.close();

            // Convert the JSON array to a string
            response = projectsArray.toString();
        } catch (Exception e) {
            e.printStackTrace();
            response = "{\"error\":\"An error occurred\"}";
        } finally {
            if (stmt != null) try { stmt.close(); } catch (Exception e) { }
            if (conn != null) try { conn.close(); } catch (Exception e) { }
        }
        return response;
    }
}
