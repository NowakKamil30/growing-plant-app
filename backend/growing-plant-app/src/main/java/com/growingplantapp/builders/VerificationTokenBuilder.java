package com.growingplantapp.builders;

import com.growingplantapp.entities.LoginUser;
import com.growingplantapp.entities.VerificationToken;

public final class VerificationTokenBuilder {
    private Long id;
    private String token;
    private LoginUser loginUser;

    private VerificationTokenBuilder() {
    }

    public static VerificationTokenBuilder aVerificationToken() {
        return new VerificationTokenBuilder();
    }

    public VerificationTokenBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public VerificationTokenBuilder withToken(String token) {
        this.token = token;
        return this;
    }

    public VerificationTokenBuilder withLoginUser(LoginUser loginUser) {
        this.loginUser = loginUser;
        return this;
    }

    public VerificationToken build() {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setId(id);
        verificationToken.setToken(token);
        verificationToken.setLoginUser(loginUser);
        return verificationToken;
    }
}
