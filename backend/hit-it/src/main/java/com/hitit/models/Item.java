package com.hitit.models;


import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


@Entity
@Getter
@Setter
@Table(name = "item")
@NoArgsConstructor
public class Item {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private Long first_bid;
    private Long buy_price;
    private String location;
    private String country;
    private String latitude;
    private String longitude;

    private String img_path;
    private String description;



    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date start_time;

   
    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date end_time;


    private Long item_start_biding_sold;

    @ManyToOne(optional = false)
    @JoinColumn(name = "users_id", nullable = false)
    private Users user;

    public Item(String img_path, String name, Long first_bid, Long buy_price, String location, String country, String latitude, String longitude, Users user,String description) {
        this.name = name;
        this.first_bid = first_bid;
        this.buy_price = buy_price;
        this.location = location;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.user = user;
        this.img_path = img_path;
        this.description=description;
    }
}


