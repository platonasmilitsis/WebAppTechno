package com.hitit.models;


import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "item")
@NoArgsConstructor
public class Item {

    @Id
    @GenericGenerator(name = "UseExistingIdOtherwiseGenerateUsingIdentity",
        strategy = "com.hitit.generators.UseExistingIdOtherwiseGenerateUsingIdentity")
    @GeneratedValue(generator = "UseExistingIdOtherwiseGenerateUsingIdentity")
    @Column(name = "id", unique = true, nullable = false)
    private Long id;


    private String name;
    private Double first_bid;
    private Double buy_price;
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

    public Item(String img_path, String name, Double first_bid, Double buy_price, String location, String country, String latitude, String longitude, Users user, String description) {
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


