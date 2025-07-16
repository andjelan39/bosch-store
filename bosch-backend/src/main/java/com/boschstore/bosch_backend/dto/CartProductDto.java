package com.boschstore.bosch_backend.dto;

import java.util.List;

public record CartProductDto(
        String id,
        String name,
        Double price,
        List<String> images) {
}
