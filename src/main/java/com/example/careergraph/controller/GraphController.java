package com.example.careergraph.controller;

import com.example.careergraph.dto.GraphPathResponse;
import com.example.careergraph.service.GraphService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/graph")
public class GraphController {

    private final GraphService graphService;

    public GraphController(GraphService graphService) {
        this.graphService = graphService;
    }

    @GetMapping("/user/{userName}")
    public List<GraphPathResponse> getUserGraph(
            @PathVariable String userName
    ) {
        return graphService.getUserGraph(userName);
    }
}