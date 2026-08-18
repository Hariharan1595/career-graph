package com.example.careergraph.dto;

import java.util.List;

public record RecommendationResponse(
        String job,
        String company,
        List<String> matchedSkills
) {
}