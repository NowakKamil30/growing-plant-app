package com.growingplantapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserExistException extends RuntimeException {
    public UserExistException() {
        super("Exist user with that username");
    }

    public UserExistException(String message) {
        super("Exist user with that username " + message);
    }
}
