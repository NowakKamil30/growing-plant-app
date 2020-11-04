package com.growingplantapp.DTOs;

import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String email;
    private Role role;
    private boolean isActive;
    private List<Long> devicesId;
    private List<Long> supportMessagesId;

    public UserDTO() {

    }
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.isActive = user.isActive();
        this.devicesId = user
                .getDevices()
                .stream()
                .map(Device::getId)
                .collect(Collectors.toList());
        this.supportMessagesId = user
                .getSupportMessages()
                .stream()
                .map(SupportMessage::getId)
                .collect(Collectors.toList());
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

    public List<Long> getSupportMessagesId() {
        return supportMessagesId;
    }

    public void setSupportMessagesId(List<Long> supportMessagesId) {
        this.supportMessagesId = supportMessagesId;
    }
}
