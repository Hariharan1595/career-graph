package com.example.careergraph.repository;


import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class UserRepository {
    private final Driver driver;

    public UserRepository(Driver driver) {
        this.driver = driver;
    }

    public String createUser(String name) {

        String cypher = """
            MERGE (u:User {name: $name})
            RETURN u.name AS name
            """;

        try (Session session = driver.session()) {

            return session.run(
                            cypher,
                            java.util.Map.of("name", name)
                    )
                    .single()
                    .get("name")
                    .asString();
        }
    }

   public String findUserByName(String name){



        String cypher = """
                MATCH (u:User {name: $name})
                RETURN u.name AS name
                """;

        try(Session session = driver.session()) {
            return session.run(cypher, Map.of("name",name))
                    .single()
                    .get("name")
                    .asString();

        }
   }
}
