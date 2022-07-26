package com.hitit.exceptions;

public class ItemNotFoundException extends IllegalStateException {
    public ItemNotFoundException(){super("Item Not Found!");}
}
