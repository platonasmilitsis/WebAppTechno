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

@Service
@Transactional
public class BidsService {

    private final BidsRepository bidsRepository;
    private final BidRepository bidRepository;

    public BidsService(BidsRepository bidsRepository, BidRepository bidRepository) {
        this.bidsRepository = bidsRepository;
        this.bidRepository = bidRepository;
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
}
