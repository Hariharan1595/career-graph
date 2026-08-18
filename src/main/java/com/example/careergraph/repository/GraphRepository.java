package com.example.careergraph.repository;

import com.example.careergraph.dto.GraphPathResponse;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class GraphRepository {

    private final Driver driver;

    public GraphRepository(Driver driver) {
        this.driver = driver;
    }

    public List<GraphPathResponse> getUserGraph(String userName) {

        String cypher = """
                MATCH (u:User {name: $userName})
                      -[:HAS_SKILL]->(s:Skill)
                      <-[:REQUIRED_FOR]-(j:Job)
                      -[:OFFERED_BY]->(c:Company)

                RETURN u.name AS user,
                       s.name AS skill,
                       j.name AS job,
                       c.name AS company
                """;

        try (Session session = driver.session()) {
            return session.run(
                    cypher,
                    Map.of("userName", userName)
            ).list(record -> new GraphPathResponse(
                    record.get("user").asString(),
                    record.get("skill").asString(),
                    record.get("job").asString(),
                    record.get("company").asString()
            ));
        }
    }
}