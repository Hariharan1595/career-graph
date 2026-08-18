package com.example.careergraph.service;

import com.example.careergraph.repository.SkillRepository;
import org.springframework.stereotype.Service;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public String createSkill(String name) {
        return skillRepository.createSkill(name);
    }
}