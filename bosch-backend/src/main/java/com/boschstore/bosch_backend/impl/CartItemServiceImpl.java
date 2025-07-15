package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.model.User;
import com.boschstore.bosch_backend.repository.CartItemRepository;
import com.boschstore.bosch_backend.repository.UserRepository;
import com.boschstore.bosch_backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository,
                               UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository =  userRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<CartItem> getAllCartItems() {
        User currentUser = getCurrentUser();
        return cartItemRepository.findByUser(currentUser);
    }

    @Override
    public String addCartItem(CartItem cartItem) {

        if(cartItem.getProduct() == null){
            throw new IllegalArgumentException("Product must not be null");
        }

        if(cartItem.getQuantity() < 1){
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }

        cartItem.setUser(getCurrentUser());
        cartItemRepository.save(cartItem);
        return "Item added to cart successfully";
    }

    @Override
    public String updateCartItem(Long id, int quantity) {

        CartItem existingItem =  cartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found."));

        User currentUser = getCurrentUser();
        if(!existingItem.getUser().getId().equals(currentUser.getId())){
            throw new RuntimeException("You are not authorized to update this cart item.");
        }

        if(quantity < 1){
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }

        existingItem.setQuantity(quantity);
        cartItemRepository.save(existingItem);

        return "Item quantity updated successfully";
    }

    @Override
    public String removeCartItem(Long cartItemId) {

        CartItem existingItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found."));

        User currentUser = getCurrentUser();
        if(!existingItem.getUser().getId().equals(currentUser.getId())){
            throw new RuntimeException("You are not authorized to remove this cart item.");
        }

        cartItemRepository.deleteById(cartItemId);
        return "Cart item removed successfully.";
    }
}
