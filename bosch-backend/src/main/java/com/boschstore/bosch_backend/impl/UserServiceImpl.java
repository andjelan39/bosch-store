package com.boschstore.bosch_backend.impl;

import com.boschstore.bosch_backend.dto.UserDto;
import com.boschstore.bosch_backend.model.User;
import com.boschstore.bosch_backend.repository.UserRepository;
import com.boschstore.bosch_backend.service.JWTService;
import com.boschstore.bosch_backend.service.UserService;
import mapper.UserMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return UserMapper.toDto(user);
    }

    @Override
    public String login(UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDto.username(), userDto.password()
                )
        );
        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(userDto.username());
        }
        return "Failed";
    }
}
