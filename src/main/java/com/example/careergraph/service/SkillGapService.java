package com.example.careergraph.service;

import com.example.careergraph.dto.SkillGapResponse;
import com.example.careergraph.repository.SkillGapRepository;
import org.springframework.stereotype.Service;

@Service
public class SkillGapService {

    private final SkillGapRepository skillGapRepository;

    public SkillGapService(SkillGapRepository skillGapRepository) {
        this.skillGapRepository = skillGapRepository;
    }

    public SkillGapResponse getSkillGap(
            String userName,
            String jobName
    ) {
        return skillGapRepository.getSkillGap(userName, jobName);
    }
}