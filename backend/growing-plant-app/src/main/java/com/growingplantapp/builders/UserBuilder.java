package com.growingplantapp.builders;

import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

import java.util.List;

public final class UserBuilder {
    private Long id;
    private String email;
    private String name;
    private Role role;
    private List<Device> devices;
    private List<SupportMessage> supportMessages;
    private boolean isActive;

    private UserBuilder() {
    }

    public static UserBuilder anUser() {
        return new UserBuilder();
    }

    public UserBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public UserBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public UserBuilder withRole(Role role) {
        this.role = role;
        return this;
    }

    public UserBuilder withIsActive(boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public UserBuilder withDevices(List<Device> devices) {
        this.devices = devices;
        return this;
    }

    public UserBuilder withSupportMessages(List<SupportMessage> supportMessages) {
        this.supportMessages = supportMessages;
        return this;
    }

    public User build() {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setName(name);
        user.setRole(role);
        user.setActive(true);
        user.setDevices(devices);
        user.setSupportMessages(supportMessages);
        return user;
    }
}
