package com.hitit.services;

import com.hitit.models.Bidder;
import com.hitit.models.Reviews;
import com.hitit.models.ReviewsId;
import com.hitit.repository.BidderRepository;
import com.hitit.repository.ReviewsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewsService {

    private final ReviewsRepository reviewsRepository;
    private final BidderRepository bidderRepository;


    public ReviewsService(ReviewsRepository reviewsRepository, BidderRepository bidderRepository) {
        this.reviewsRepository = reviewsRepository;
        this.bidderRepository = bidderRepository;
    }

    public List<Reviews> getReviews() {
        return reviewsRepository.findAll();
    }

    public List<Reviews> getReviewsByUserId(Long id) {
        return reviewsRepository.findReviewsByUser_id(id);
    }

    public List<Reviews> getReviewsByBiddersId(Long id) {
        return reviewsRepository.findReviewsByBidder_id(id);

    }

    public Reviews addNewReview(Long user_id, Long bidder_id, Reviews reviews) {
        Optional<Reviews> review = reviewsRepository.findById(new ReviewsId(user_id, bidder_id));
        Reviews rev;
        if (review.isPresent()) {
            this.checkSet(reviews, review.get());
            rev = reviewsRepository.save(review.get());
            updateRatings(bidder_id);
        } else {
            reviews.setUser_id(user_id);
            reviews.setBidder_id(bidder_id);
            rev = reviewsRepository.save(reviews);
            updateRatings(bidder_id);
        }
        return rev;
    }

    private void updateRatings(Long bidder_id){
        List<Reviews> revList = this.getReviewsByBiddersId(bidder_id);
        float newRating = 0;
        int cnt = 0;
        for (Reviews ee : revList) {
            cnt++;
            newRating += ee.getRating();
        }
        Optional<Bidder> bidder = bidderRepository.findById(bidder_id);
        if (bidder.isPresent()) {
            bidder.get().setRating((newRating / cnt));
            bidderRepository.save(bidder.get());
        }

    }

    private void checkSet(Reviews reviews, Reviews reviews1) {
        if(reviews.getReview()!=null)
            reviews1.setReview(reviews.getReview());
        if(reviews.getRating()!=null)
            reviews1.setRating(reviews.getRating());

    }

    public ResponseEntity<?> deleteReviewsByUserId(Long user_id, Integer[] bidder_id) {
        for(Integer i : bidder_id){
            reviewsRepository.deleteById(new ReviewsId(user_id,i.longValue()));
            this.updateRatings(i.longValue());
        }

        return ResponseEntity.ok("OK");
    }

    public ResponseEntity<?> deleteReviewsByUserId(Long user_id) {
        List<Reviews> reviews = reviewsRepository.findReviewsByUser_id(user_id);
        for(Reviews rev: reviews){
            Long bidder_id = rev.getBidder_id();
            reviewsRepository.deleteById(new ReviewsId(user_id,bidder_id));
            this.updateRatings(bidder_id);
        }

        return ResponseEntity.ok("OK");


    }

    public void deleteReviewsToBidderId(Long bidder_id){
        reviewsRepository.deleteReviewsToBidderId(bidder_id);
    }

    public void updateRatings() {
        Long[] bidder_id = reviewsRepository.findAllBidderId();

        for(Long i : bidder_id){
            this.updateRatings(i);
        }
    }
}
