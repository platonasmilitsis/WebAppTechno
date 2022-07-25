//package com.hitit.models;
//
//import javax.persistence.Entity;
//import javax.persistence.*;
//// import com.hitit.models.Bid;
//
//@Entity
//public class Bids {
//    // Private variables
//
//    // Primary key
//    @Id
//    private @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
//
//    @ManyToOne
//    private Bid bid;
//
//    // Needs Item for @JoinColumn(name="item_id")
//
//
//    public Bids(Bid bid) {
//        this.bid = bid;
//    }
//
//    public Bids() {
//
//    }
//}
