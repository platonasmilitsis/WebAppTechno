package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Setter
@Getter
@Table(name = "reviews")
@NoArgsConstructor
@IdClass(ReviewsId.class)
public class Reviews {
    @Id
    private Long user_id;
    @Id
    private Long bidder_id;

    private String review;
    private Float rating;
}
