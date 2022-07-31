package com.hitit.repository;

import com.hitit.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

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


}
