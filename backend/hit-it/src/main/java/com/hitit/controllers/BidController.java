package com.hitit.controllers;


import com.hitit.models.Bid;
import com.hitit.services.BidService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BidController {


    private final BidService bidService;


    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/bid")
    public List<Bid> getAllBid(){
        return bidService.getAllBid();
    }

    @GetMapping("/bidder/{id}/bid")
    public List<Bid> getAllByBidderId(@PathVariable Long id){
        return bidService.getAllByBidderId(id);
    }


    @GetMapping("/bid/{id}")
    public Optional<Bid> getBid(@PathVariable Long id){
        return bidService.getBid(id);
    }


    @PostMapping("/bidder/{bidder_id}/bid/{bids_id}")
    public Bid addBid(@PathVariable("bidder_id") Long id,
                      @PathVariable("bids_id") Long bids_id,
                      @RequestBody Bid newBid){
        return bidService.addBid(id,bids_id,newBid);
    }


    @PutMapping("/bidder/{bidder_id}/bid/{bids_id}")
    public Bid updateBid(@PathVariable("bidder_id") Long id,
                         @PathVariable("bids_id") Long bids_id,
                         @RequestBody Bid newBid){
        return bidService.addBid(id,bids_id,newBid);
    }


    @PutMapping("/bid/{id}")
    public Bid updateBid(@PathVariable("id") Long id,@RequestBody Bid newBid){
        return bidService.updateBid(id,newBid);
    }


    @DeleteMapping("bidder/{bidder_id}/bid/{bids_id}")
    public ResponseEntity<?> deleteBid(@PathVariable("bidder_id") Long id,
                                       @PathVariable("bids_id") Long bids_id){
        return bidService.deleteBid(id,bids_id);
    }

    @DeleteMapping("/bid/{id}")
    public ResponseEntity<?> deleteBid(@PathVariable("id") Long id){
        return bidService.deleteBid(id);
    }


}
