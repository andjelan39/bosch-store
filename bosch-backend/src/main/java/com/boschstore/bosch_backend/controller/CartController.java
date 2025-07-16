package com.boschstore.bosch_backend.controller;

import com.boschstore.bosch_backend.dto.CartItemDto;
import com.boschstore.bosch_backend.dto.CartItemResponseDto;
import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.service.CartItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartItemService cartItemService;

    public CartController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping()
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<CartItemResponseDto>> getAllCartItems() {
        return ResponseEntity.ok(cartItemService.getAllCartItems());
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> addCartItem(@RequestBody CartItemDto cartItemDto) {
        String message =  cartItemService.addCartItem(cartItemDto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @PutMapping("/item/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> updateCartItem(@PathVariable("id") Long id, @RequestBody Map<String, Integer> updatedQty) {
        int newQuantity = updatedQty.get("quantity");
        String message =  cartItemService.updateCartItem(id, newQuantity);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/item/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removeCartItem(@PathVariable("id") Long id) {
        String message = cartItemService.removeCartItem(id);
        return ResponseEntity.ok(message);
    }


}
