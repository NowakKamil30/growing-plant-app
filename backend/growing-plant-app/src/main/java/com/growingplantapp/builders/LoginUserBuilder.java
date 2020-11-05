package com.growingplantapp.builders;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.Role;
import com.growingplantapp.entities.User;

public final class LoginUserBuilder {
    private Long id;
    private String username;
    private String password;
    private Role role = Role.USER;
    private User user;

    private LoginUserBuilder() {
    }

    public static LoginUserBuilder aLoginUser() {
        return new LoginUserBuilder();
    }

    public LoginUserBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public LoginUserBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public LoginUserBuilder withPassword(String password) {
        this.password = password;
        return this;
    }

    public LoginUserBuilder withRole(Role role) {
        this.role = role;
        return this;
    }

    public LoginUserBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public LoginUser build() {
        LoginUser loginUser = new LoginUser();
        loginUser.setId(id);
        loginUser.setUsername(username);
        loginUser.setPassword(password);
        loginUser.setRole(role);
        loginUser.setUser(user);
        return loginUser;
    }
}
