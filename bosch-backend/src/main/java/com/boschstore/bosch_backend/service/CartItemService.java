package com.boschstore.bosch_backend.service;

import com.boschstore.bosch_backend.dto.CartItemDto;
import com.boschstore.bosch_backend.dto.CartItemResponseDto;
import com.boschstore.bosch_backend.model.CartItem;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface CartItemService {

    public List<CartItemResponseDto> getAllCartItems();
    public String addCartItem(CartItemDto cartItemDto);
    public String updateCartItem(Long id, int quantity);
    public String removeCartItem(Long cartItemId);

}
