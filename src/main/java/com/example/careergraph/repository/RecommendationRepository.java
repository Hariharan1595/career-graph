package com.example.careergraph.repository;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RecommendationRepository {

    private final Driver driver;

    public RecommendationRepository(Driver driver) {
        this.driver = driver;
    }

    public List<Map<String, Object>> getRecommendations(String userName) {

        String cypher = """
                MATCH (u:User {name: $userName})
                      -[:HAS_SKILL]->(s:Skill)
                      <-[:REQUIRED_FOR]-(j:Job)
                      -[:OFFERED_BY]->(c:Company)
                RETURN j.name AS job,
                       c.name AS company,
                       collect(s.name) AS matchedSkills
                """;

        try (Session session = driver.session()) {

            return session.run(
                            cypher,
                            Map.of("userName", userName)
                    )
                    .list(record -> Map.of(
                            "job", record.get("job").asString(),
                            "company", record.get("company").asString(),
                            "matchedSkills", record.get("matchedSkills").asList()
                    ));
        }
    }
}