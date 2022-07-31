package com.hitit.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bid")
@Getter
@Setter
@NoArgsConstructor
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JsonFormat(pattern = "yyyy-MM-dd' 'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;
    private Long amount;

    @JoinColumn(name = "bids_id",nullable = false)
    private Long bids_id;

    @JoinColumn(name = "bidder_id",nullable = false)
    @ManyToOne(optional = false)
    private Bidder bidder;
}
