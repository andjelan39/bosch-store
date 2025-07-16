package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.dto.CartItemDto;
import com.boschstore.bosch_backend.dto.CartItemResponseDto;
import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.model.Product;
import com.boschstore.bosch_backend.model.User;
import com.boschstore.bosch_backend.repository.CartItemRepository;
import com.boschstore.bosch_backend.repository.ProductRepository;
import com.boschstore.bosch_backend.repository.UserRepository;
import com.boschstore.bosch_backend.service.CartItemService;
import mapper.CartItemMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository,
                               UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository =  userRepository;
        this.productRepository = productRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<CartItemResponseDto> getAllCartItems() {
        User currentUser = getCurrentUser();
        return cartItemRepository.findByUser(currentUser).stream()
                .map(CartItemMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public String addCartItem(CartItemDto cartItemDto) {

        Product product = productRepository.findById(cartItemDto.productId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if(cartItemDto.quantity() < 1){
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }

        User currentUser = getCurrentUser();

        //checking if item already exists in user's cart
        Optional<CartItem> existingItemOpt = cartItemRepository.findByUserAndProduct(currentUser, product);
        if(existingItemOpt.isPresent()){
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + cartItemDto.quantity());
            cartItemRepository.save(existingItem);
        }else{
            CartItem cartItem = CartItemMapper.toEntity(cartItemDto, product);
            cartItem.setUser(getCurrentUser());
            cartItemRepository.save(cartItem);
        }

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
