package com.growingplantapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class BadJwtException extends RuntimeException {
    public BadJwtException() {
    }

    public BadJwtException(String message) {
        super(message);
    }
}
