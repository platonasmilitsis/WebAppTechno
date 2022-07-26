package com.hitit.exceptions;

public class UserNotFoundException extends IllegalStateException {
    public UserNotFoundException(){super("Users doesn't exists");}

}
