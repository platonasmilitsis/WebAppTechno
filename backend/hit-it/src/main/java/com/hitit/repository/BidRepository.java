package com.hitit.repository;

import com.hitit.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid,Long> {
    @Query("select b from Bid b where b.bidder.id =:id")
    List<Bid> findByBidderId(Long id);

    @Query("select  b from Bid b where b.bids_id=:id order by b.amount DESC")
    List<Bid> findByBidsId(Long id);

    @Query("select b from Bid b where b.bidder.id=:id and b.bids_id=:bids_id")
    Optional<Bid> findByBidsAndBidderId(Long id, Long bids_id);

    @Modifying
    @Query("delete from Bid b where b.bidder.id=:id and b.bids_id=:bids_id")
    void deleteBid(Long id, Long bids_id);

    @Modifying
    @Query("delete from Bid b where b.bidder.id=:id")
    void deleteBidsByBidderId(Long id);

    @Modifying
    @Query("delete from Bid b where b.bids_id=:id")
    void deleteBidsByBidsId(Long id);


    @Query ("select b from Bid b where b.bids_id=:bids_id and b.bidder.id=:bidder_id and b.amount=:bid_amount and b.time=:bid_time")
    Optional<Bid> findThisBid(Long bids_id, Long bidder_id, Double bid_amount, Date bid_time);


    @Query("select b from Bid b where b.bids_id=:bids_id and b.bidder.id=:bidder_id")
    List<Optional<Bid>> findBids(Long bids_id, Long bidder_id);


    @Query("select b.bids_id from Bid b where b.bidder.id=:u")
    Long[] getAllBids(Long u);


    @Query("select count( DISTINCT b1.bids_id) from Bid b1, Bid b2 where b1.bidder.id =:aLong and b2.bidder.id=:aLong1 and b1.bids_id = b2.bids_id")
    int dotProduct(Long aLong, Long aLong1);



    @Query("select count(DISTINCT b.bids_id) from Bid b where b.bidder.id=:aLong")
    int norm(Long aLong);


    @Query("select b.bidder.id, b.bids_id from Bid b group by b.bidder.id, b.bids_id")
    HashMap<Long,List<Long>> BidsNorm();


    @Query("select distinct b.bidder.id from Bid b")
    List<Long> getBidders();


    @Query("select distinct b.bids_id from Bid b where b.bidder.id=:id")
    List<Long> getBidsIds(Long id);
}
