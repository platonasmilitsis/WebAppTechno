package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@NoArgsConstructor
@Setter
@Getter
public class FullItem {

    Item item;

    BidsBidList bids;

    List<Category> categories;


}
