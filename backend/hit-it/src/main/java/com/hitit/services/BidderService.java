package com.hitit.services;

import com.hitit.models.Bidder;
import com.hitit.repository.BidderRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BidderService {

    private final BidderRepository bidderRepository;

    public BidderService(BidderRepository bidderRepository) {
        this.bidderRepository = bidderRepository;
    }

    public List<Bidder> getAllBidders() {
        return bidderRepository.findAll();
    }

    public Optional<Bidder> getBidder(Long id) {
        return bidderRepository.findById(id);

    }

    public List<Bidder> getBidders(Integer[] id) {
        List<Bidder> list = new ArrayList<>();

        for(Integer i: id){
            Long idd = i.longValue();
            Optional<Bidder> bidder = bidderRepository.findById(idd);
            bidder.ifPresent(list::add);
        }
        return list;



    }

    public Bidder newBidder(@NotNull Bidder bidder, Long id) {
        bidder.setId(id);
        bidder.setRating(0.0F);
        if(bidderRepository.findById(id).isPresent()) return bidderRepository.findById(id).get();
        return bidderRepository.save(bidder);
    }
}
