package com.growingplantapp.exceptions;

public class VerificationTokenDontExistException extends Exception {
    public VerificationTokenDontExistException() {
        super("verification token dont exist");
    }

    public VerificationTokenDontExistException(String message) {
        super("verification token dont exist " + message);
    }
}
