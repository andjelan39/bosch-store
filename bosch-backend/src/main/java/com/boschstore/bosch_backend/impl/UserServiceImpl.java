package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.dto.UserDto;
import com.boschstore.bosch_backend.repository.UserRepository;
import com.boschstore.bosch_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        //TODO: Implement user creation logic
        return null;
    }
}
