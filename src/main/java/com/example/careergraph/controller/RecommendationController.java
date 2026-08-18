package com.example.careergraph.controller;

import com.example.careergraph.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{userName}")
    public List<Map<String, Object>> getRecommendations(
            @PathVariable String userName
    ) {
        return recommendationService.getRecommendations(userName);
    }
}