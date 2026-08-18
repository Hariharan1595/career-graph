package com.example.careergraph.controller;

import com.example.careergraph.service.JobService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public String createJob(@RequestParam String name) {
        return jobService.createJob(name);
    }

    @PostMapping("/{jobName}/skills/{skillName}")
    public String addRequiredSkill(
            @PathVariable String jobName,
            @PathVariable String skillName
    ) {
        jobService.addRequiredSkill(jobName, skillName);
        return "Skill requirement added successfully";
    }
}