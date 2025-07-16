package com.boschstore.bosch_backend.dto;

public record CartItemResponseDto(
        Long id,
        String productId,
        String productName,
        double productPrice,
        int quantity,
        double total) {
}
