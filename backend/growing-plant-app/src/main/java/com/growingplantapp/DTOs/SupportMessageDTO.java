package com.growingplantapp.DTOs;

import com.growingplantapp.entities.User;


public class SupportMessageDTO {
    private Long id;
    private String message;
    private User user;

    public SupportMessageDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
