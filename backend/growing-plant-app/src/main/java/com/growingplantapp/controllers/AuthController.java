package com.growingplantapp.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.growingplantapp.aspects.SendActivityAccountEmail;
import com.growingplantapp.aspects.SendResetPasswordEmail;
import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.exceptions.*;
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
        LoginUser loginUserFromDatabase = loginUserService.findByUsername(loginUser.getUsername());
        if (loginUserFromDatabase != null && !loginUserFromDatabase.isEnabled()) {
            loginUserService.deleteById(loginUserFromDatabase.getId());
            loginUser.getUser().setLoginUser(loginUser);
            loginUserService.add(loginUser);
            return ResponseEntity.ok().build();
        }
        if (loginUserFromDatabase == null) {

            loginUser.getUser().setLoginUser(loginUser);
            loginUserService.add(loginUser);
            return ResponseEntity.ok().build();
        }
        throw new UserExistException();
    }

    @GetMapping("/verify-token")
    public ResponseEntity<Map<String, Boolean>> verifyAccount(@RequestParam String token) {
        try {
            loginUserService.verifyAccount(token);
        } catch (LoginUserDontExistException |
                VerificationTokenDontExistException |
                VerificationTokenIsTooOldException e) {
            throw new BadTokenException("", "isActive");
        }
        return ResponseEntity.ok(Map.of("isActive", true));
    }

    @PostMapping("/change-password")
    @SendResetPasswordEmail
    public ResponseEntity<Map<String, Boolean>> sendChangePasswordToken(@RequestBody Map<String, String> args) {
        if (args.get("email") != null) {
            if (loginUserService.findByEmail(args.get("email")) != null) {
                return ResponseEntity.ok(Map.of("isSendEmail", true));
            }
        }
      throw new BadBodyException("email", "isSendEmail");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Boolean>> changePassword(@RequestParam String token,
                                                               @RequestBody Map<String, String> args) {
        if (args.get("password") != null) {
            try {
                loginUserService.changePassword(token, args.get("password"));
            } catch (LoginUserDontExistException |
                    VerificationTokenDontExistException |
                    VerificationTokenIsTooOldException loginUserDontExistException) {
                throw new BadTokenException("", "isChange");
            }
            return ResponseEntity.ok(Map.of("isChange", true));
        }
        throw new BadBodyException("password", "isChange");
    }
}
