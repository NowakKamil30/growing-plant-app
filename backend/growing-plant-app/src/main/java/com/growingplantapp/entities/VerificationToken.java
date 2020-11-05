package com.growingplantapp.entities;

import javax.persistence.*;


@Entity
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    @OneToOne
    private LoginUser loginUser;

    public VerificationToken() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LoginUser getLoginUser() {
        return loginUser;
    }

    public void setLoginUser(LoginUser loginUser) {
        this.loginUser = loginUser;
    }
}
