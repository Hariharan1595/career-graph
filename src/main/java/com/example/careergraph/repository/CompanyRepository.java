package com.example.careergraph.repository;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class CompanyRepository {

    private final Driver driver;

    public CompanyRepository(Driver driver) {
        this.driver = driver;
    }

    public String createCompany(String name) {

        String cypher = """
                MERGE (c:Company {name: $name})
                RETURN c.name AS name
                """;

        try (Session session = driver.session()) {
            return session.run(
                            cypher,
                            Map.of("name", name)
                    )
                    .single()
                    .get("name")
                    .asString();
        }
    }

    public void connectJobToCompany(String jobName, String companyName) {

        String cypher = """
                MATCH (j:Job {name: $jobName})
                MATCH (c:Company {name: $companyName})
                MERGE (j)-[:OFFERED_BY]->(c)
                """;

        try (Session session = driver.session()) {
            session.run(
                    cypher,
                    Map.of(
                            "jobName", jobName,
                            "companyName", companyName
                    )
            );
        }
    }
}