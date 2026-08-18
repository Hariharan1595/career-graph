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
                  -[:HAS_SKILL]->(userSkill:Skill)

            WITH collect(DISTINCT userSkill.name) AS userSkills

            MATCH (j:Job)-[:REQUIRED_FOR]->(requiredSkill:Skill)

            WITH userSkills,
                 j,
                 collect(DISTINCT requiredSkill.name) AS requiredSkills

            MATCH (j)-[:OFFERED_BY]->(c:Company)

            WITH j,
                 c,
                 userSkills,
                 requiredSkills,
                 [skill IN requiredSkills
                  WHERE skill IN userSkills] AS matchedSkills

            RETURN j.name AS job,
                   c.name AS company,
                   matchedSkills,
                   requiredSkills
            """;

        try (Session session = driver.session()) {

            return session.run(
                    cypher,
                    Map.of("userName", userName)
            ).list(record -> {

                String job = record.get("job").asString();
                String company = record.get("company").asString();

                List<String> matchedSkills =
                        record.get("matchedSkills")
                                .asList(value -> value.asString());

                List<String> requiredSkills =
                        record.get("requiredSkills")
                                .asList(value -> value.asString());

                List<String> missingSkills = requiredSkills.stream()
                        .filter(skill -> !matchedSkills.contains(skill))
                        .toList();

                double matchPercentage = requiredSkills.isEmpty()
                        ? 0.0
                        : Math.round(
                        (matchedSkills.size() * 100.0 / requiredSkills.size()) * 100.0
                ) / 100.0;

                return new RecommendationResponse(
                        job,
                        company,
                        matchedSkills,
                        requiredSkills,
                        missingSkills,
                        matchPercentage
                );
            });
        }
    }
}