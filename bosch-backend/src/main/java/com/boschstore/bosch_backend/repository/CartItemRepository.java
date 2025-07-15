package com.boschstore.bosch_backend.repository;

import com.boschstore.bosch_backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
