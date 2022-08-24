package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "messages")
public class Messages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "seller_id",nullable = false)
    private Long seller_id;

    @JoinColumn(name = "buyer_id",nullable = false)
    private Long buyer_id;


}
