package com.growingplantapp.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.growingplantapp.aspects.EmailAspect;
import com.growingplantapp.aspects.SendActivityAccountEmail;
import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.exceptions.BadJwtException;
import com.growingplantapp.exceptions.BadUsernameException;
import com.growingplantapp.exceptions.UserExistException;
import com.growingplantapp.models.LoginResponse;
import com.growingplantapp.services.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Map;

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
        loginResponse.setRole(loginUser.getRole());
        loginResponse.setToken(sign);
        loginResponse.setUserId(loginUser.getId());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    @SendActivityAccountEmail
    public ResponseEntity<Void> register(@RequestBody LoginUser loginUser) {
        if (!loginUserService.isExistAccountSoft(loginUser.getUsername())) {
            loginUser.getUser().setLoginUser(loginUser);
            loginUserService.add(loginUser);
            return ResponseEntity.ok().build();
        }
        throw new UserExistException();
    }

    @GetMapping("/verify-token")
    public ResponseEntity<Map<String, Boolean>> verifyAccount(@RequestParam String token) {
        loginUserService.verifyAccount(token);
        return ResponseEntity.ok(Map.of("isActive", true));
    }
}
