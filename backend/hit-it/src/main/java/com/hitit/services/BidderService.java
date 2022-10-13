package com.hitit.services;

import com.hitit.models.Bidder;
import com.hitit.models.Users;
import com.hitit.repository.BidderRepository;
import com.hitit.repository.UsersRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BidderService {

    private final BidderRepository bidderRepository;
    private final UsersRepository usersRepository;
    public BidderService(BidderRepository bidderRepository, UsersRepository usersRepository) {
        this.bidderRepository = bidderRepository;
        this.usersRepository = usersRepository;
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

    public Bidder rateBidder(Long id){
        Optional<Bidder> bidder = bidderRepository.findById(id);
        if(bidder.isPresent()){
            Bidder tmp = bidder.get();
            tmp.setRating(tmp.getRating()+10);
            return bidderRepository.save(tmp);
        }
        return null;
    }


    public Optional<Bidder> findBidder(String username){
        return bidderRepository.findByUsername(username);
    }


    public Bidder newBidder(Bidder bidder, Long id) {
        bidder.setId(id);
        bidder.setRating(0L);
        if(bidderRepository.findById(id).isPresent()) return bidderRepository.findById(id).get();
        return bidderRepository.save(bidder);
    }


    public Bidder newBidder(Bidder bidder) {
        return bidderRepository.save(bidder);
    }

    public HashMap<String, Bidder> saveAllBidder(List<Bidder> bidderList, HashMap<String, Users> map) {

        HashMap<String, Bidder> ret = new HashMap<>();
        for(Bidder b : bidderList){
            b.setId(map.get(b.getUsername()).getId());
            ret.put(b.getUsername(),b);
        }
        bidderRepository.saveAll(bidderList);
        return ret;
    }
}
