package com.growingplantapp.controllers;

import com.growingplantapp.entities.Role;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
    Logger logger = LoggerFactory.getLogger(RoleController.class);

    @GetMapping
    public Role[] showRoles() {
        logger.debug("showRoles");
        return Role.values();
    }
}
