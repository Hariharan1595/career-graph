package com.example.careergraph.controller;

import com.example.careergraph.dto.RecommendationResponse;
import com.example.careergraph.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{userName}")
    public List<RecommendationResponse> getRecommendations(
            @PathVariable String userName
    ) {
        return recommendationService.getRecommendations(userName);
    }
}