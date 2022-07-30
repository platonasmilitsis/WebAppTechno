package com.hitit.repository;

import com.hitit.models.Reviews;
import com.hitit.models.ReviewsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewsRepository extends JpaRepository<Reviews, ReviewsId> {

    @Query("select r from Reviews r where r.user_id = ?1")
    List<Reviews> findReviewsByUser_id(Long id);


    @Query("select r from Reviews r where r.bidder_id = ?1")
    List<Reviews> findReviewsByBidder_id(Long id);


    @Modifying
    @Query("delete from Reviews r where r.bidder_id=:bidder_id")
    void deleteReviewsToBidderId(Long bidder_id);
}
