package com.growingplantapp.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.DTOs.UserDTO;
import com.growingplantapp.DTOs.Views;
import com.growingplantapp.entities.User;
import com.growingplantapp.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);
     private final UserService userService;

     @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @JsonView(Views.Public.class)
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
         logger.debug("getUser");
         return userService.getById(id)
                 .map(UserDTO::new)
                 .map(ResponseEntity::ok)
                 .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping
    @JsonView(Views.Public.class)
    public ResponseEntity<List<UserDTO>> getAllUser() {
         List<User> userList = userService.getAll();
         if (userList.size() == 0) {
             return ResponseEntity.noContent().build();
         }
         return ResponseEntity.ok(userList.stream()
                 .map(UserDTO::new)
                 .collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<Void> postUser(@RequestBody User user) {
        userService.add(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
         userService.deleteById(id);
         return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> patch(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
         userService.patch(id, updates);
         return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id, @RequestBody User user) {
         userService.update(id, user);
         return ResponseEntity.ok().build();
    }

}
