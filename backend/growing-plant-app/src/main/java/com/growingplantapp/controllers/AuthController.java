package com.growingplantapp.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.exceptions.BadJwtException;
import com.growingplantapp.exceptions.BadUsernameException;
import com.growingplantapp.models.LoginResponse;
import com.growingplantapp.services.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final LoginUserService loginUserService;

    @Autowired
    public AuthController(LoginUserService loginUserService) {
        this.loginUserService = loginUserService;
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(@RequestBody LoginUser user) {
        String sign = null;
        LoginUser loginUser;
        try {
            loginUser = loginUserService.loadUserByUsername(user.getUsername());
        } catch (BadUsernameException e) {
            throw new BadJwtException(e.getMessage());
        }

        if (loginUser != null && BCrypt.checkpw(user.getPassword(), loginUser.getPassword())) {
            sign = JWT.create()
                    .withClaim("name", loginUser.getUsername())
                    .withClaim("role", "ROLE_" + loginUser.getRole().toString())
                    .withClaim("validDate", LocalDateTime.now().plusDays(1).toEpochSecond(ZoneOffset.UTC))
                    .withClaim("createDate", LocalDateTime.now().toEpochSecond(ZoneOffset.UTC))
                    .sign(Algorithm.HMAC512("McQfTjWnZr4u7x!A%D*G-KaNdRgUkXp2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F"));
        } else {
            return ResponseEntity.noContent().build();
        }
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(sign);
        loginResponse.setRole(loginUser.getRole());
        loginResponse.setUserId(loginUser.getUser().getId());
        return ResponseEntity.ok(loginResponse);
    }
}
