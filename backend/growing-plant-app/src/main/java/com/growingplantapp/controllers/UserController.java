package com.growingplantapp.controllers;

import com.growingplantapp.entities.User;
import com.growingplantapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
     private final UserService userService;

     @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
         return userService.getById(id)
                 .map(ResponseEntity::ok)
                 .orElse(ResponseEntity.noContent().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
         List<User> userList = userService.getAll();
         if (userList.size() == 0) {
             return ResponseEntity.noContent().build();
         }
         return ResponseEntity.ok(userList);
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
