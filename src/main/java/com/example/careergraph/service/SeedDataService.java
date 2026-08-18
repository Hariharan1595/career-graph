package com.example.careergraph.service;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Service;

@Service
public class SeedDataService {

    private final Driver driver;

    public SeedDataService(Driver driver) {
        this.driver = driver;
    }

    public void seed() {

        String cypher = """
                MERGE (hari:User {name: 'hari'})
                MERGE (java:Skill {name: 'java'})
                MERGE (spring:Skill {name: 'spring boot'})
                MERGE (mysql:Skill {name: 'mysql'})

                MERGE (javaDev:Job {name: 'java developer'})
                MERGE (backendDev:Job {name: 'backend developer'})

                MERGE (abc:Company {name: 'ABC Tech'})
                MERGE (xyz:Company {name: 'XYZ Solutions'})

                MERGE (hari)-[:HAS_SKILL]->(java)
                MERGE (hari)-[:HAS_SKILL]->(spring)
                MERGE (hari)-[:HAS_SKILL]->(mysql)

                MERGE (javaDev)-[:REQUIRED_FOR]->(java)
                MERGE (javaDev)-[:REQUIRED_FOR]->(spring)

                MERGE (backendDev)-[:REQUIRED_FOR]->(java)
                MERGE (backendDev)-[:REQUIRED_FOR]->(mysql)

                MERGE (javaDev)-[:OFFERED_BY]->(abc)
                MERGE (backendDev)-[:OFFERED_BY]->(xyz)
                """;

        try (Session session = driver.session()) {
            session.run(cypher).consume();
        }
    }
}