package com.growingplantapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class BadUsernameException extends RuntimeException {
    public BadUsernameException() {
        super("Bad login date");
    }

    public BadUsernameException(String message) {
        super("Bad login date " + message);
    }
}
