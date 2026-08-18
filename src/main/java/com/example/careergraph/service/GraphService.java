package com.example.careergraph.service;

import com.example.careergraph.dto.GraphPathResponse;
import com.example.careergraph.repository.GraphRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GraphService {

    private final GraphRepository graphRepository;

    public GraphService(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    public List<GraphPathResponse> getUserGraph(String userName) {
        return graphRepository.getUserGraph(userName);
    }
}