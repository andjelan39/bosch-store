package com.boschstore.bosch_backend.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    String generateToken(String username);
    String getUsernameFromToken(String token);
    boolean validateToken(String token, UserDetails userDetails);
}
