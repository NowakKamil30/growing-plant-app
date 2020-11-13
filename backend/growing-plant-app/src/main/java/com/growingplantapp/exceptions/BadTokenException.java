package com.growingplantapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadTokenException extends RuntimeException implements ExceptionMapWithFalseValue{
    private String mapArgName = "default";

    public BadTokenException() {
        super("bad token");
    }

    public BadTokenException(String message) {
        super("bad token " + message);
    }

    public BadTokenException(String message, String mapArgName) {
        super("bad token " + message);
        this.mapArgName = mapArgName;
    }

    public String getMapArgName() {
        return mapArgName;
    }

    public void setMapArgName(String mapArgName) {
        this.mapArgName = mapArgName;
    }
}
