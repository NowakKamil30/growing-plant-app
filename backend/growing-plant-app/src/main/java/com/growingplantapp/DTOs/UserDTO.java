package com.growingplantapp.DTOs;

import com.growingplantapp.entities.Role;

import java.util.List;

public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private Role role;
    private boolean isActive;
    private List<Long> devicesId;

    public UserDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<Long> getDevicesId() {
        return devicesId;
    }

    public void setDevicesId(List<Long> devicesId) {
        this.devicesId = devicesId;
    }
}
