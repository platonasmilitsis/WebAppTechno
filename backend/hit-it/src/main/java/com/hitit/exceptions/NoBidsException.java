package com.hitit.exceptions;

public class NoBidsException extends IllegalStateException {
    public NoBidsException(){super("No Bids have been created yet...");}
}
