package com.example.careergraph.service;

import com.example.careergraph.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public String createCompany(String name) {
        return companyRepository.createCompany(name);
    }

    public void connectJobToCompany(String jobName, String companyName) {
        companyRepository.connectJobToCompany(jobName, companyName);
    }
}