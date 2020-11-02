package com.growingplantapp.bootstrap;


import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.Plant;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.User;
import com.growingplantapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserLoader implements CommandLineRunner {

    private final UserService userService;

    @Autowired
    public UserLoader(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
//        if (userService.getAll().size() == 0) {
//            User user = UserBuilder.anUser()
//                    .withEmail("ka@com.com")
//                    .withName("test")
//                    .withRole(Role.USER)
//                    .withIsActive(true)
//                    .build();
//            Device device = DeviceBuilder.aDevice()
//                    .withName("name")
//                    .withUser(user)
//                    .build();
//            Plant plant = PlantBuilder
//                    .aPlant()
//                    .withName("plant")
//                    .withDevice(device)
//                    .build();
           //device.setPlant(List.of(plant));
            //user.setDevices(List.of(device));

            //userService.add(user);
       // }
    }
}
