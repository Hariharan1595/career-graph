package com.example.careergraph.service;

import com.example.careergraph.repository.JobRepository;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public String createJob(String name) {
        return jobRepository.createJob(name);
    }

    public void addRequiredSkill(String jobName, String skillName) {
        jobRepository.addRequiredSkill(jobName, skillName);
    }
}