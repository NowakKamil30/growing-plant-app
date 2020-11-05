package com.growingplantapp.builders;

import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

import java.time.LocalDateTime;
import java.util.List;

public final class UserBuilder {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime activeAccountData;
    private List<Device> devices;
    private List<SupportMessage> supportMessages;

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

    public UserBuilder withFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public UserBuilder withLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public UserBuilder withActiveAccountData(LocalDateTime activeAccountData) {
        this.activeAccountData = activeAccountData;
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
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setActiveAccountData(activeAccountData);
        user.setDevices(devices);
        user.setSupportMessages(supportMessages);
        return user;
    }
}
