package com.example.careergraph.controller;

import com.example.careergraph.dto.SkillGapResponse;
import com.example.careergraph.service.SkillGapService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skill-gap")
public class SkillGapController {

    private final SkillGapService skillGapService;

    public SkillGapController(SkillGapService skillGapService) {
        this.skillGapService = skillGapService;
    }

    @GetMapping
    public SkillGapResponse getSkillGap(
            @RequestParam String userName,
            @RequestParam String jobName
    ) {
        return skillGapService.getSkillGap(userName, jobName);
    }
}