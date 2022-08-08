package com.hitit.controllers;


import com.hitit.models.Bidder;
import com.hitit.services.BidderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class BidderController {

    private final BidderService bidderService;

    public BidderController(BidderService bidderService) {
        this.bidderService = bidderService;
    }

    @GetMapping("/bidders")
    public List<Bidder> getAllBidders(){
        return bidderService.getAllBidders();
    }

    @GetMapping("/bidders/{id}")
    public Optional<Bidder> getBidder(@PathVariable Long id){
        return bidderService.getBidder(id);
    }

    @GetMapping("/bidders/q")
    public List<Bidder> getBidder(@RequestParam("id") Integer[] id){
        return bidderService.getBidders(id);
    }

    @PostMapping("/bidders/{id}")
    public Bidder newBidder(@RequestBody Bidder bidder, @PathVariable Long id){
        return bidderService.newBidder(bidder,id);
    }




}
