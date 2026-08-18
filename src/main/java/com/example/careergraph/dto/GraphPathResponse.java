package com.example.careergraph.dto;

public record GraphPathResponse(
        String user,
        String skill,
        String job,
        String company
) {
}