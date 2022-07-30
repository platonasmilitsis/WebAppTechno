package com.hitit.exceptions;

public class BidNotFoundException extends IllegalStateException {

    public BidNotFoundException(){super("Bid wasn't found!");}

}
