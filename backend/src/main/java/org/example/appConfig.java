import io.javalin.Javalin;

public class AppConfig {
    public static Javalin configureApp() {
        Javalin app = Javalin.create();
        // Lägg till konfiguration här om det behövs

        return app;
    }
}