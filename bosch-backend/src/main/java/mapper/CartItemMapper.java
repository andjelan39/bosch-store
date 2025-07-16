package mapper;

import com.boschstore.bosch_backend.dto.CartItemDto;
import com.boschstore.bosch_backend.dto.CartItemResponseDto;
import com.boschstore.bosch_backend.dto.CartProductDto;
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
        Product product = cartItem.getProduct();

        CartProductDto cartProductDto = new CartProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getImages()
        );

        return new CartItemResponseDto(
                cartItem.getId(),
                cartProductDto,
                cartItem.getQuantity()
        );
    }

}
