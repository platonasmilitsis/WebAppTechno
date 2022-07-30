package com.hitit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "bids")
public class Bids {

    @Id
    @JoinColumn(name = "id",nullable = false)
    private  Long id;

}
