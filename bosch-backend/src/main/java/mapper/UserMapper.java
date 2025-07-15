package mapper;

import com.boschstore.bosch_backend.dto.UserDto;
import com.boschstore.bosch_backend.model.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        return new UserDto(user.getUsername(), user.getPassword(), user.getRole());
    }

    public static User toEntity(UserDto userDto) {
        return new User(userDto.username(), userDto.password(), userDto.role());
    }

}
