package com.growingplantapp.entities;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    private String email;
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    private LocalDateTime activeAccountData;
    private LocalDateTime createUserData = LocalDateTime.now();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Device> devices;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SupportMessage> supportMessages;
    @OneToOne
    private LoginUser loginUser;

    public User() {
    }

    public LocalDateTime getCreateUserData() {
        return createUserData;
    }

    public void setCreateUserData(LocalDateTime createUserData) {
        this.createUserData = createUserData;
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

    public LocalDateTime getActiveAccountData() {
        return activeAccountData;
    }

    public void setActiveAccountData(LocalDateTime activeAccountData) {
        this.activeAccountData = activeAccountData;
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
}
