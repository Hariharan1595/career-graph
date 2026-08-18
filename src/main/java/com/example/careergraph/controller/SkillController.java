package com.example.careergraph.controller;

import com.example.careergraph.service.SkillService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public String createSkill(@RequestParam String name) {
        return skillService.createSkill(name);
    }
}