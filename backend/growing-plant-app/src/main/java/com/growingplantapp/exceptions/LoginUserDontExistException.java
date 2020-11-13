package com.growingplantapp.exceptions;

public class LoginUserDontExistException extends Exception {
    public LoginUserDontExistException() {
        super("loginUser don't exist");
    }

    public LoginUserDontExistException(String message) {
        super("loginUser don't exist " + message);
    }
}
