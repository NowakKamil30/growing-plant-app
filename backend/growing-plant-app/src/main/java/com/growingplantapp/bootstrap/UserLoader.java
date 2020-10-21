package com.growingplantapp.bootstrap;

import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.User;
import com.growingplantapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserLoader implements CommandLineRunner {

    private final UserService userService;

    @Autowired
    public UserLoader(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userService.getAll().size() == 0) {
            userService.add(User.builder()
                    .email("ka@com.com")
                    .isActive(true)
                    .name("test")
                    .role(Role.USER)
                    .build());
        }
    }
}
