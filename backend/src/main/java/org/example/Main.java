package org.example;

import io.javalin.Javalin;
import org.example.Controller.MapsController;
import org.example.Controller.ReviewController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws IOException {
        Javalin app = Javalin.create().start(8080);
        app.addStaticFiles("/static");

        app.get("/", ReviewController::getReviewForPlace);
        MapsController mapsController = new MapsController();
        app.get("/test", mapsController::testMapCreation);

    app.get("/search", ctx -> {
        String companyName = ctx.queryParam("company");
        // Hämta recensionsinformation baserat på företagsnamnet
    
        // Exempel: Skapa en JSON-sträng och skicka tillbaka till frontend
        String reviewsJson = "{"strengths": [...], "flaws": [...], "strategy": [...] }";
        ctx.result(reviewsJson);
    });
    }
}

