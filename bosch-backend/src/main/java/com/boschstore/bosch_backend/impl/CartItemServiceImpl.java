package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.repository.CartItemRepository;
import com.boschstore.bosch_backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    @Override
    public String addCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
        return "Item added to cart successfully";
    }

    @Override
    public String updateCartItem(Long id, int quantity) {
        CartItem existingItem =  cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found."));

        if(quantity < 1){
            removeCartItem(id);
            return "Item removed from  cart because quantity was less than 1.";
        }

        existingItem.setQuantity(quantity);
        cartItemRepository.save(existingItem);

        return "Item quantity updated successfully";
    }

    @Override
    public String removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
        return "Cart item removed successfully.";
    }
}
