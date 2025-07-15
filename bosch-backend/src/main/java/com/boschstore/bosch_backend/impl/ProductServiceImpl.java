package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.model.Product;
import com.boschstore.bosch_backend.repository.ProductRepository;
import com.boschstore.bosch_backend.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private  final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> getAllProducts(String searchTerm, Pageable pageable) {
        if(searchTerm == null || searchTerm.isEmpty()){
            return productRepository.findAll(pageable);
        }else{
            return productRepository.findByNameContainingIgnoreCase(searchTerm, pageable);
        }
    }

    @Override
    public Product getProductById(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found."));
    }
}
