package com.example.careergraph.repository;

import com.example.careergraph.dto.RecommendationResponse;
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

    public List<RecommendationResponse> getRecommendations(String userName) {

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
                    .list(record -> new RecommendationResponse(
                            record.get("job").asString(),
                            record.get("company").asString(),
                            record.get("matchedSkills").asList(value -> value.asString())
                    ));
        }
    }
}