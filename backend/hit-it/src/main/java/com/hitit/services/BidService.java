package com.hitit.services;


import com.hitit.exceptions.BidNotFoundException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.Bid;
import com.hitit.models.Bidder;
import com.hitit.repository.BidRepository;
import com.hitit.repository.BidderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BidService {

    private final BidRepository bidRepository;
    private final BidderRepository bidderRepository;

    public BidService(BidRepository bidRepository, BidderRepository bidderRepository) {
        this.bidRepository = bidRepository;
        this.bidderRepository = bidderRepository;
    }

    public List<Bid> getAllBid() {
        return bidRepository.findAll();
    }

    public Optional<Bid> getBid(Long id) {
        return bidRepository.findById(id);
    }

    public List<Bid> getAllByBidderId(Long id) {
        return bidRepository.findByBidderId(id);
    }

    public Bid addBid(Long id, Long bids_id, Bid newBid) {
        Optional<Bid> bid = bidRepository.findByBidsAndBidderId(id,bids_id);
        if(bid.isPresent()){
            this.checkSet(bid.get(),newBid);
            return bidRepository.save(bid.get());
        }
        else{
            newBid.setBids_id(bids_id);
            Optional<Bidder> bidder = bidderRepository.findById(id) ;
            if(bidder.isPresent())
                newBid.setBidder(bidder.get());
            else throw new UserNotFoundException();

            return bidRepository.save(newBid);
        }
    }

    private void checkSet(Bid bid, Bid newBid) {
        if(newBid.getAmount()!=null)
            bid.setAmount(newBid.getAmount());
        if(newBid.getTime()!=null)
            bid.setTime(newBid.getTime());
    }

    public ResponseEntity<?> deleteBid(Long id, Long bids_id) {
        bidRepository.deleteBid(id,bids_id);
        return ResponseEntity.ok("OK");
    }

    public ResponseEntity<?> deleteBid(Long id) {
        bidRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }

    public Bid updateBid(Long id, Bid newBid) {
        Optional<Bid> bid = bidRepository.findById(id);
        if(bid.isPresent()){
            this.checkSet(bid.get(),newBid);
            return bidRepository.save(bid.get());
        } else throw new BidNotFoundException();

    }
}
