package com.boschstore.bosch_backend.service;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductService {

    public Page<Product> getAllProducts(String searchTerm, Pageable pageable);
    public Product getProductById(String productId);
    public String addProduct(Product product);
}
