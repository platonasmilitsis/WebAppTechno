package com.hitit.services;


import com.hitit.exceptions.BidNotFoundException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.Bid;
import com.hitit.models.BidForLoadingData;
import com.hitit.models.Bidder;
import com.hitit.repository.BidRepository;
import com.hitit.repository.BidderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Slf4j
@Transactional
public class BidService {

    private final BidRepository bidRepository;
    private final BidderRepository bidderRepository;

    public BidService(BidRepository bidRepository, BidderRepository bidderRepository) {
        this.bidRepository = bidRepository;
        this.bidderRepository = bidderRepository;
    }

    public  Optional<Bid> findBid(Long bids_id, Long bidder_id, Double bid_amount, Date bid_time) {
        return bidRepository.findThisBid(bids_id, bidder_id, bid_amount, bid_time);
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
        
        newBid.setBids_id(bids_id);
        Optional<Bidder> bidder = bidderRepository.findById(id) ;
        if(bidder.isPresent())
            newBid.setBidder(bidder.get());
        else throw new UserNotFoundException();

        return bidRepository.save(newBid);
    
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

    public Long[] getAllBids(Long u) {

        return bidRepository.getAllBids(u);
    }



    public int norm(Long aLong) {

        return bidRepository.norm(aLong);
    }

    public HashMap<Long, List<Long>> createBidsNorm() {


        List<Long> bidders_id = bidRepository.getBidders();

        HashMap<Long, List<Long>> map =  new HashMap<>();
        for(Long  bidder_id : bidders_id){
            List<Long> bids_id = bidRepository.getBidsIds(bidder_id);
            map.put(bidder_id, bids_id);
        }
        log.info("It's alive");
        return map;
    }

    public int getNumbOfBids(Long id) {
        return bidRepository.findByBidderId(id).size();

    }

    public List<Long> getMostFamousItems() {
        List<Long> return_this = new ArrayList<>();
        List<Long> temp = bidRepository.getMostFamousItems();
        int cnt = 0;
        for(Long i: temp){
            if(!(cnt<10))
                break;
            return_this.add(i);
            cnt++;
        }
        return return_this;
    }

    public void saveAllBid(List<BidForLoadingData> bidList, HashMap<String, Bidder> map_bidders) {
        List<Bid> bids = new ArrayList<>();
        for(BidForLoadingData bidForLoadingDat : bidList){
            Bid bid = new Bid();
            bid.setTime(bidForLoadingDat.getTime());
            bid.setAmount(bidForLoadingDat.getAmount());
            bid.setBids_id(bidForLoadingDat.getBids_id());

            bid.setBidder(map_bidders.get(bidForLoadingDat.getBidder_username()));

            bids.add(bid);

        }

        bidRepository.saveAll(bids);

    }
}
