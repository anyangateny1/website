package backend;
import java.io.IOException;
import java.io.PrintWriter;

Properties properties = new Properties();
properties.put("mail.smtp.host", "email-smtp.us-east-1.amazonaws.com");
properties.put("mail.smtp.port", "587");
properties.put("mail.smtp.auth", "true");
properties.put("mail.smtp.starttls.enable", "true"); // For TLS

Authenticator auth = new Authenticator() {
    public PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication("your-smtp-username", "your-smtp-password");
    }
};

Session session = Session.getInstance(properties, auth)

public class ContactForm {

    public static void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String message = request.getParameter("message");

        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Message: " + message);


        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body><h1>Form Submitted Successfully!</h1></body></html>");
    
    }


}