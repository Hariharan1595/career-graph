package com.example.careergraph.repository;

import com.example.careergraph.dto.SkillGapResponse;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SkillGapRepository {

    private final Driver driver;

    public SkillGapRepository(Driver driver) {
        this.driver = driver;
    }

    public SkillGapResponse getSkillGap(
            String userName,
            String jobName
    ) {

        String cypher = """
                MATCH (u:User {name: $userName})
                      -[:HAS_SKILL]->(current:Skill)

                WITH u, collect(DISTINCT current.name) AS currentSkills

                MATCH (j:Job {name: $jobName})
                      -[:REQUIRED_FOR]->(required:Skill)

                WITH u,
                     currentSkills,
                     j,
                     collect(DISTINCT required.name) AS requiredSkills

                MATCH (j)-[:OFFERED_BY]->(c:Company)

                RETURN currentSkills,
                       requiredSkills,
                       c.name AS company,
                       j.name AS job
                """;

        try (Session session = driver.session()) {

            var record = session.run(
                    cypher,
                    Map.of(
                            "userName", userName,
                            "jobName", jobName
                    )
            ).single();

            List<String> currentSkills =
                    record.get("currentSkills")
                            .asList(value -> value.asString());

            List<String> requiredSkills =
                    record.get("requiredSkills")
                            .asList(value -> value.asString());

            List<String> missingSkills = requiredSkills.stream()
                    .filter(skill -> !currentSkills.contains(skill))
                    .toList();

            return new SkillGapResponse(
                    record.get("job").asString(),
                    record.get("company").asString(),
                    currentSkills,
                    requiredSkills,
                    missingSkills
            );
        }
    }
}