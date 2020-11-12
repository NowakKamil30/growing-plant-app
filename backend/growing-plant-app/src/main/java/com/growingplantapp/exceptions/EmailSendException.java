package com.growingplantapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.SERVICE_UNAVAILABLE)
public class EmailSendException extends RuntimeException {
    public EmailSendException() {
        super("email send Exception");
    }

    public EmailSendException(String message) {
        super("email send Exception " + message);
    }
}
