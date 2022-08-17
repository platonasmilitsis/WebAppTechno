package com.hitit.exceptions;

public class EmailAndUserInUseException extends IllegalStateException {
    public EmailAndUserInUseException(String email, String username) {
       super("$Email" + email + "and Username" + username + "already in Use");
    }
}
