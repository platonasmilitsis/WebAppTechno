package com.hitit.controllers;


import com.hitit.models.Reviews;
import com.hitit.services.ReviewsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewsController {

    private final ReviewsService reviewsService;

    public ReviewsController(ReviewsService reviewsService) {
        this.reviewsService = reviewsService;
    }

    @GetMapping("/reviews")
    public List<Reviews> getReviews() {
        return reviewsService.getReviews();
    }

    @GetMapping("/reviews/users/{id}")
    public List<Reviews> getReviewsByUsersId(@PathVariable Long id) {
        return reviewsService.getReviewsByUserId(id);
    }

    @GetMapping("/reviews/bidders/{id}")
    public List<Reviews> getReviewsByBiddersId(@PathVariable Long id) {
        return reviewsService.getReviewsByBiddersId(id);
    }

    @PostMapping("/reviews/{user_id}/{bidder_id}")
    public Reviews addNewReview(@PathVariable("user_id") Long user_id,
                                @PathVariable("bidder_id") Long bidder_id, @RequestBody Reviews reviews) {
        return reviewsService.addNewReview(user_id, bidder_id, reviews);
    }


    @PutMapping("/reviews/{user_id}/{bidder_id}")
    public Reviews updateReview(@PathVariable("user_id") Long user_id,
                                @PathVariable("bidder_id") Long bidder_id, @RequestBody Reviews reviews) {
        return reviewsService.addNewReview(user_id, bidder_id, reviews);
    }

    @DeleteMapping("/reviews/{user_id}/q")
    public ResponseEntity<?> deleteReviewsbyUserId(@PathVariable("user_id") Long user_id, @RequestParam("bidder_id") Integer[] bidder_id) {
        return reviewsService.deleteReviewsByUserId(user_id, bidder_id);
    }


    @DeleteMapping("/reviews/{user_id}")
    public ResponseEntity<?> deleteReviewsbyUserId(@PathVariable("user_id") Long user_id) {
        return reviewsService.deleteReviewsByUserId(user_id);
    }

}
