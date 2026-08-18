package com.example.careergraph.repository;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class JobRepository {

    private final Driver driver;

    public JobRepository(Driver driver) {
        this.driver = driver;
    }

    public String createJob(String name) {

        String cypher = """
                MERGE (j:Job {name: $name})
                RETURN j.name AS name
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

    public void addRequiredSkill(String jobName, String skillName) {

        String cypher = """
                MATCH (j:Job {name: $jobName})
                MATCH (s:Skill {name: $skillName})
                MERGE (j)-[:REQUIRED_FOR]->(s)
                """;

        try (Session session = driver.session()) {
            session.run(
                    cypher,
                    Map.of(
                            "jobName", jobName,
                            "skillName", skillName
                    )
            );
        }
    }
}