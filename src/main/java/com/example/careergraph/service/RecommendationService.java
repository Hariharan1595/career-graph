package com.example.careergraph.service;

import com.example.careergraph.dto.RecommendationResponse;
import com.example.careergraph.exception.ResourceNotFoundException;
import com.example.careergraph.repository.RecommendationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;

    public RecommendationService(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    public List<RecommendationResponse> getRecommendations(String userName) {

        List<RecommendationResponse> recommendations =
                recommendationRepository.getRecommendations(userName);

        if (recommendations.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No job recommendations found for user: " + userName
            );
        }

        return recommendations;
    }
}