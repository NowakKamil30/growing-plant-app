package com.growingplantapp.DTOs;

import com.fasterxml.jackson.annotation.JsonView;
import com.growingplantapp.entities.SupportMessage;

public class SupportMessageDTO {
    @JsonView(Views.Public.class)
    private Long id;
    @JsonView(Views.Public.class)
    private String message;
    @JsonView(Views.Private.class)
    private Long userId;

    public SupportMessageDTO()
    {

    }
    public SupportMessageDTO(SupportMessage supportMessage)
    {
        this.id = supportMessage.getId();
        this.message = supportMessage.getMessage();
        this.userId = supportMessage.getUser().getId();
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
