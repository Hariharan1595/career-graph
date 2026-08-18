package com.example.careergraph.controller;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseController {

    private final Driver driver;

    public DatabaseController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping("/api/db/test")
    public String testDatabase() {

        try (Session session = driver.session()) {
            return session
                    .run("RETURN 1 AS result")
                    .single()
                    .get("result")
                    .asInt() == 1
                    ? "CognoDB connection successful"
                    : "Unexpected result";
        }
    }
}