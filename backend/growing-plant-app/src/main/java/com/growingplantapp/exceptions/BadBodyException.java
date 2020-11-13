package com.growingplantapp.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class BadBodyException extends RuntimeException implements ExceptionMapWithFalseValue {
    private String mapArgName = "default";
    public BadBodyException() {
        super("bad body");
    }

    public BadBodyException(String message) {
        super("bad body " + message);
    }

    public BadBodyException(String message, String mapArgName) {
        super("bad body " + message);
        this.mapArgName = mapArgName;
    }

    public String getMapArgName() {
        return mapArgName;
    }

    public void setMapArgName(String mapArgName) {
        mapArgName = mapArgName;
    }
}
