package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.Device;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String email;
    @JsonView(Views.Public.class)
    private List<Long> devicesId;
    @JsonView(Views.Private.class)
    private List<Long> supportMessagesId;
    @JsonView(Views.Private.class)
    private Long authId;

    public UserDTO() {

    }
    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
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
        this.authId = user.getLoginUser().getId();
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
