package com.hitit.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BidForLoadingData{

    String bidder_username;
    Long bids_id;
    Double amount;
    Date time;

}
