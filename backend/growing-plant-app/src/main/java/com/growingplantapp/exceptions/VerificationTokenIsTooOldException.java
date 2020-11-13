package com.growingplantapp.exceptions;

public class VerificationTokenIsTooOldException extends Exception {
    public VerificationTokenIsTooOldException() {
        super("verification token is too old");
    }

    public VerificationTokenIsTooOldException(String message) {
        super("verification token is too old " + message);
    }
}
