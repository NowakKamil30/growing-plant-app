package com.growingplantapp.bootstrap;


import com.growingplantapp.builders.DeviceBuilder;
import com.growingplantapp.builders.PlantBuilder;
import com.growingplantapp.builders.UserBuilder;
import com.growingplantapp.entities.*;
import com.growingplantapp.services.LoginUserService;
import com.growingplantapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserLoader implements CommandLineRunner {

    private final UserService userService;
    private final LoginUserService loginUserService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserLoader(UserService userService,
                      LoginUserService loginUserService,
                      PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.loginUserService = loginUserService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userService.getAll().size() == 0) {
            LoginUser loginUser = new LoginUser();
            loginUser.setUsername("test1234");
            loginUser.setPassword(passwordEncoder.encode("test1234"));
            loginUser.setRole(Role.ADMIN);
            User user = UserBuilder.anUser()
                    .withEmail("ka@com.com")
                    .withFirstName("test")
                    .withLastName("test surname")
                    .build();
            Device device = DeviceBuilder.aDevice()
                    .withName("name")
                    .withUser(user)
                    .build();
            Plant plant = PlantBuilder
                    .aPlant()
                    .withName("plant")
                    .withDevice(device)
                    .build();
            device.setPlants(List.of(plant));
            user.setDevices(List.of(device));
            loginUser.setUser(user);
            user.setLoginUser(loginUser);
            LoginUser loginUser1 = new LoginUser();
            loginUser1.setRole(Role.USER);
            loginUser1.setUsername("user");
            loginUser1.setPassword(passwordEncoder.encode("user"));
            User user1 = UserBuilder.anUser()
                    .withEmail("user@o2.pl")
                    .withFirstName("user")
                    .withLastName("last")
                    .build();
            loginUser1.setUser(user1);
            user1.setLoginUser(loginUser1);
            loginUserService.add(loginUser);
            loginUserService.add(loginUser1);
        }
    }
}
