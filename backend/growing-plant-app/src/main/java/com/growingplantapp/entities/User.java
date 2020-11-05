package com.growingplantapp.entities;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    private String email;
    @NotEmpty
    private String name;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Device> devices;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SupportMessage> supportMessages;
    @OneToOne
    private LoginUser loginUser;

    public User() {
    }

    public LoginUser getLoginUser() {
        return loginUser;
    }

    public void setLoginUser(LoginUser loginUser) {
        this.loginUser = loginUser;
    }

    public List<SupportMessage> getSupportMessages() {
        return supportMessages;
    }

    public void setSupportMessages(List<SupportMessage> supportMessages) {
        this.supportMessages = supportMessages;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
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


}
