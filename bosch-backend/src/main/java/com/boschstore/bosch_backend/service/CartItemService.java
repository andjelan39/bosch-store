package com.boschstore.bosch_backend.service;

import com.boschstore.bosch_backend.model.CartItem;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CartItemService {

    public List<CartItem> getAllCartItems();
    public String addCartItem(CartItem cartItem);
    public String updateCartItem(Long id, int quantity);
    public String removeCartItem(Long cartItemId);

}
