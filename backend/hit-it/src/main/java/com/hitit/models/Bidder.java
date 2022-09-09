package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "bidder")
public class Bidder {

    @Id
    private Long id;



    private String username;

    private String location;
    private String country;
    private Long rating;

}
