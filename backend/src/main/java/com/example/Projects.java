package com.example;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.Headers;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.logging.Logger;

public class Projects implements HttpHandler {
    private static final Logger logger = Logger.getLogger(Projects.class.getName());

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {

            String response = getProjects();
            Headers headers = exchange.getResponseHeaders();

            headers.add("Access-Control-Allow-Origin", "*");
            headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization");
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);

            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } else {
            exchange.sendResponseHeaders(405, -1);
        }
    }

    private String getProjects() {
        String response = "";
        Connection conn = null;
        Statement stmt = null;
        try {
            // Fetch the database URL from an environment variable
            String dbUrl = "jdbc:postgresql://c9mq4861d16jlm.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d1v6cl9732arnf?user=udjfli8ii5ebtk&password=p8df26df53c42fb7d2ed8d9f539afca05f18c268558a1cfc1bb827107c8b5333f";
            
            if (dbUrl == null || dbUrl.isEmpty()) {
                throw new IllegalArgumentException("Database URL is not set in environment variables.");
            }

            Class.forName("org.postgresql.Driver");

            conn = DriverManager.getConnection(dbUrl);
            stmt = conn.createStatement();
            String sql = "SELECT id, project_name, project_date, description, img_url, tags FROM projects";
            ResultSet rs = stmt.executeQuery(sql);

            JSONArray projectsArray = new JSONArray();
            while (rs.next()) {
                JSONObject project = new JSONObject();
                project.put("id", rs.getInt("id"));
                project.put("project_name", rs.getString("project_name"));
                project.put("project_date", rs.getString("project_date"));
                project.put("description", rs.getString("description"));
                project.put("img_url", rs.getString("img_url"));
                project.put("tags", rs.getString("tags"));
                projectsArray.put(project);
            }
            rs.close();
            stmt.close();
            conn.close();

            response = projectsArray.toString();
        } catch (Exception e) {
            logger.severe("Error retrieving projects: " + e.getMessage());
            response = "{\"error\":\"An error occurred\"}";
        } finally {
            if (stmt != null) try { stmt.close(); } catch (Exception e) { }
            if (conn != null) try { conn.close(); } catch (Exception e) { }
        }
        return response;
    }
}
