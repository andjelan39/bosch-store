package com.boschstore.bosch_backend.controller;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.service.CartItemService;
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
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @PostMapping
    public String addCartItem(@RequestBody CartItem cartItem) {
        return cartItemService.addCartItem(cartItem);
    }

    @PutMapping("/item/{id}")
    public String updateCartItem(@PathVariable("id") Long id, @RequestBody Map<String, Integer> updatedQty) {
        int newQuantity = updatedQty.get("quantity");
        return cartItemService.updateCartItem(id, newQuantity);
    }

    @DeleteMapping("/item/{id}")
    public String removeCartItem(@PathVariable("id") Long id) {
        return cartItemService.removeCartItem(id);
    }


}
