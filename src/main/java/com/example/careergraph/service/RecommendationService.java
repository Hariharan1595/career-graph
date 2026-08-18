package com.example.careergraph.service;

import com.example.careergraph.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public List<Map<String, Object>> getRecommendations(String userName) {
        return recommendationRepository.getRecommendations(userName);
    }
}