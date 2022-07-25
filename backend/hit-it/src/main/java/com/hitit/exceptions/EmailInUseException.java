package com.hitit.exceptions;

public class EmailInUseException  extends IllegalStateException{

    public EmailInUseException(String email){super("Email " + email + " already in use");}
}
