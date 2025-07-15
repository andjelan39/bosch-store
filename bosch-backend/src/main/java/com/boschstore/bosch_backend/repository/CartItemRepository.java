package com.boschstore.bosch_backend.repository;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
}
