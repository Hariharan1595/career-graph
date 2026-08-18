package com.example.careergraph.controller;

import com.example.careergraph.service.SeedDataService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seed")
public class SeedController {

    private final SeedDataService seedDataService;

    public SeedController(SeedDataService seedDataService) {
        this.seedDataService = seedDataService;
    }

    @PostMapping
    public String seed() {
        seedDataService.seed();
        return "Seed data loaded successfully";
    }
}