package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class BidsBidList {


    private Long bids_id;
    private List<Bid> bids;

}
