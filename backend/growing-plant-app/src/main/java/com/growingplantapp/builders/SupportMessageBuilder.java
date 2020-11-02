package com.growingplantapp.builders;

import com.growingplantapp.entities.SupportMessage;
import com.growingplantapp.entities.User;

public final class SupportMessageBuilder {
    private Long id;
    private String message;
    private User user;

    private SupportMessageBuilder() {
    }

    public static SupportMessageBuilder aSupportMessage() {
        return new SupportMessageBuilder();
    }

    public SupportMessageBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public SupportMessageBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    public SupportMessageBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public SupportMessage build() {
        SupportMessage supportMessage = new SupportMessage();
        supportMessage.setId(id);
        supportMessage.setMessage(message);
        supportMessage.setUser(user);
        return supportMessage;
    }
}
