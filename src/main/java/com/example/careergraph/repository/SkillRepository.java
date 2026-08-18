package com.example.careergraph.repository;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class SkillRepository {

    private final Driver driver;

    public SkillRepository(Driver driver) {
        this.driver = driver;
    }

    public String createSkill(String name) {

        String cypher = """
                MERGE (s:Skill {name: $name})
                RETURN s.name AS name
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
}