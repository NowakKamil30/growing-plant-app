package com.growingplantapp.exceptions;

public class BadUsernameException extends RuntimeException {
    public BadUsernameException() {
        super("Bad login date");
    }

    public BadUsernameException(String message) {
        super("Bad login date " + message);
    }
}
