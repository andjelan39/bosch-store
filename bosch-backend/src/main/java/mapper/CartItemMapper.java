package mapper;

import com.boschstore.bosch_backend.dto.CartItemDto;
import com.boschstore.bosch_backend.dto.CartItemResponseDto;
import com.boschstore.bosch_backend.model.CartItem;
import com.boschstore.bosch_backend.model.Product;

public class CartItemMapper {

    public static CartItem toEntity(CartItemDto  cartItemDto, Product product) {
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItemDto.quantity());
        return cartItem;
    }

    public static CartItemResponseDto toDto(CartItem cartItem) {
        return new CartItemResponseDto(
                cartItem.getId(),
                cartItem.getProduct().getId(),
                cartItem.getProduct().getName(),
                cartItem.getProduct().getPrice(),
                cartItem.getQuantity(),
                cartItem.getProduct().getPrice() * cartItem.getQuantity()
        );
    }

}
