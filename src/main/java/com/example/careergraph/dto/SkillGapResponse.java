package com.example.careergraph.dto;

import java.util.List;

public record SkillGapResponse(
        String job,
        String company,
        List<String> currentSkills,
        List<String> requiredSkills,
        List<String> missingSkills
) {
}