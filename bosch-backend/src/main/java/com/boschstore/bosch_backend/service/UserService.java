package com.boschstore.bosch_backend.service;

import com.boschstore.bosch_backend.dto.UserDto;
import com.boschstore.bosch_backend.dto.UserLoginDto;

public interface UserService {
    public UserDto createUser(UserDto userDto);
    public String login(UserLoginDto userLoginDto);
}
