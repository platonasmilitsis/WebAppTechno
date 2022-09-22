package com.hitit.services;

import com.hitit.exceptions.NoBidsException;
import com.hitit.models.Bid;
import com.hitit.models.Bids;
import com.hitit.models.BidsBidList;
import com.hitit.repository.BidRepository;
import com.hitit.repository.BidsRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@Transactional
public class BidsService {

    private final BidsRepository bidsRepository;
    private final BidRepository bidRepository;

    public BidsService(BidsRepository bidsRepository, BidRepository bidRepository) {
        this.bidsRepository = bidsRepository;
        this.bidRepository = bidRepository;
    }



    public Bids createBids(Long Id) {
        Bids bids = new Bids();
        bids.setId(Id);

        return bidsRepository.save(bids);
    }
    public List<BidsBidList> getBids() {


        List<BidsBidList> list = new ArrayList<>();
        List<Bids> bids = bidsRepository.findAll();

        for(Bids bids1 : bids){
            List<Bid> bid = bidRepository.findByBidsId(bids1.getId());
            BidsBidList bidsBidList = new BidsBidList();
            bidsBidList.setBids_id(bids1.getId());
            bidsBidList.setBids(bid);
            list.add(bidsBidList);
        }
        if(list.isEmpty()) throw new NoBidsException();
        return list;


    }

    public List<BidsBidList> getBids(Integer[] ids) {

        List<BidsBidList> list = new ArrayList<>();

        for(Integer id : ids){
            List<Bid> bid = bidRepository.findByBidsId(id.longValue());
            BidsBidList bidsBidList = new BidsBidList();
            bidsBidList.setBids_id(id.longValue());
            bidsBidList.setBids(bid);
            list.add(bidsBidList);
        }
        if(list.isEmpty()) throw new NoBidsException();
        return list;


    }


    public Optional<Bids> isBidsPresent(Long id){
        Optional<Bids> opt = bidsRepository.findById(id);

        return opt;            
    }

    public List<Bid> getBidListByBidsId(Long id){
        return bidRepository.findByBidsId(id);
    }
}
