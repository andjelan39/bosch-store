package com.boschstore.bosch_backend.controller;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.service.CartItemService;
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
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public String addCartItem(@RequestBody CartItem cartItem) {
        return cartItemService.addCartItem(cartItem);
    }

    @PutMapping("/item/{id}")
    @PreAuthorize("hasRole('USER')")
    public String updateCartItem(@PathVariable("id") Long id, @RequestBody Map<String, Integer> updatedQty) {
        int newQuantity = updatedQty.get("quantity");
        return cartItemService.updateCartItem(id, newQuantity);
    }

    @DeleteMapping("/item/{id}")
    @PreAuthorize("hasRole('USER')")
    public String removeCartItem(@PathVariable("id") Long id) {
        return cartItemService.removeCartItem(id);
    }


}
