package com.example.careergraph.config;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CognoDbConfig {

    @Bean
    public Driver neo4jDriver(
            @Value("${COGNODB_URI}") String uri,
            @Value("${COGNODB_USERNAME}") String username,
            @Value("${COGNODB_PASSWORD}") String password
    ){
        return GraphDatabase.driver(
                uri,
                AuthTokens.basic(username, password)
        );

    }
}
