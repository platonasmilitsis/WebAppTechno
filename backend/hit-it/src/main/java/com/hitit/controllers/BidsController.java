package com.hitit.controllers;

import com.hitit.models.BidsBidList;
import com.hitit.services.BidsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BidsController {

    private final BidsService bidsService;

    public BidsController(BidsService bidsService) {
        this.bidsService = bidsService;
    }

    @GetMapping("/bids")
    public List<BidsBidList> getBids(){
        return bidsService.getBids();
    }

    @GetMapping("/bids")
    public List<BidsBidList> getBids(@RequestParam("id") Integer[] ids){
        return bidsService.getBids(ids);
    }

}
