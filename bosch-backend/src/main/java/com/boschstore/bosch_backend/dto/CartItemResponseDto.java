package com.boschstore.bosch_backend.dto;

public record CartItemResponseDto(
        Long id,
        CartProductDto cartProductDto,
        int quantity) {
}
