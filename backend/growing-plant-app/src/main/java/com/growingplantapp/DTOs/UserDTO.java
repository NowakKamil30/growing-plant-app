package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String email;
    @JsonView(Views.Public.class)
    private String firstName;
    @JsonView(Views.Public.class)
    private String lastName;
    @JsonView(Views.Private.class)
    private LocalDateTime activeAccountData;
    @JsonView(Views.Public.class)
    private List<DeviceDTO> devices;
    @JsonView(Views.Private.class)
    private List<Long> supportMessagesId;
    @JsonView(Views.Private.class)
    private Long authId;

    public UserDTO() {

    }
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.devices = user
                .getDevices()
                .stream()
                .map(device -> new DeviceDTO(device))
                .collect(Collectors.toList());
        this.supportMessagesId = user
                .getSupportMessages()
                .stream()
                .map(SupportMessage::getId)
                .collect(Collectors.toList());
        this.authId = user.getLoginUser().getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.activeAccountData = user.getActiveAccountData();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDateTime getActiveAccountData() {
        return activeAccountData;
    }

    public void setActiveAccountData(LocalDateTime activeAccountData) {
        this.activeAccountData = activeAccountData;
    }

    public Long getAuthId() {
        return authId;
    }

    public void setAuthId(Long authId) {
        this.authId = authId;
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

    public List<DeviceDTO> getDevices() {
        return devices;
    }

    public void setDevices(List<DeviceDTO> devices) {
        this.devices = devices;
    }

    public List<Long> getSupportMessagesId() {
        return supportMessagesId;
    }

    public void setSupportMessagesId(List<Long> supportMessagesId) {
        this.supportMessagesId = supportMessagesId;
    }
}
