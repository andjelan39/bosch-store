package com.boschstore.bosch_backend.repository;

import com.boschstore.bosch_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, String> {
    public Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

}
