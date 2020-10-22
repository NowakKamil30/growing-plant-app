package com.growingplantapp.controllers;

import com.growingplantapp.entities.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/role")
public class RoleController {

    @GetMapping
    public Role[] showRoles() {
        return Role.values();
    }
}
