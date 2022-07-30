package com.hitit.models;


import lombok.Setter;

import javax.persistence.IdClass;
import java.io.Serializable;

@Setter
public class ReviewsId implements Serializable {
    private Long user_id;
    private Long bidder_id;

    public ReviewsId(Long user_id, Long bidder_id) {
        this.user_id = user_id;
        this.bidder_id = bidder_id;
    }
}
