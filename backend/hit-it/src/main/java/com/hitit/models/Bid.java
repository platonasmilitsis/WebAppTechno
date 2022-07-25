//package com.hitit.models;
//
//import java.sql.Time;
//import javax.persistence.*;
//import java.util.Collection;
//// import java.util.Objects;
//
//@Entity
//public class Bid {
//    // Private variables
//
//    // Primary key
//    @Id
//    private @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
//    // Time variable
////    @Temporal(TemporalType.TIME)
//    @Column(nullable = false)
//    private  Time time;
//
//    // Money used to bid
//    @Column(nullable = false)
//    private int amount;
//
//    // Id of the bid
//    @OneToMany(mappedBy = "bids")
//    @Column(nullable = false)
//    private Collection <Bids> bids_id;
//
//
//    // Public methods
//
//    // Default Constructor
//    public Bid(){};
//
//    // Constructor
//    public Bid(Time time,int amount){
//        this.time=time;
//        this.amount=amount;
//    }
//
//    // Accessing the Id
//    public Long get_id(){return this.id;}
//    // Mutating the Id
//    public void set_id(Long id){this.id=id;}
//
//    // Accessing the Time
//    public Time get_time(){return this.time;}
//    // Mutating the Time
//    public void set_time(Time time){this.time=time;}
//
//    // Accessing the amount of the Bid
//    public int get_amount(){return this.amount;}
//    // Mutating the amount of the Bid
//    public void set_amount(int amount){this.amount=amount;}
//
//    @Override
//    public int hashCode(){return java.util.Objects.hashCode(this.id);}
//    @Override
//    public boolean equals(Object object){
//        if(this==object){
//            return true;
//        }
//        if(object==null){
//            return false;
//        }
//        if(object instanceof Bid){
//            if(((Bid)object).get_id().equals(get_id())){
//                return true;
//            }
//        }
//        return false;
//    }
//}
