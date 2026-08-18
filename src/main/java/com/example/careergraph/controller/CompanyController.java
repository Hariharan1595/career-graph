package com.example.careergraph.controller;

import com.example.careergraph.service.CompanyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public String createCompany(@RequestParam String name) {
        return companyService.createCompany(name);
    }

    @PostMapping("/{companyName}/jobs/{jobName}")
    public String connectJobToCompany(
            @PathVariable String companyName,
            @PathVariable String jobName
    ) {
        companyService.connectJobToCompany(jobName, companyName);
        return "Job connected to company successfully";
    }
}