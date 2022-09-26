package com.hitit.repository;

import com.hitit.models.Bidder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface BidderRepository extends JpaRepository<Bidder,Long> {
    @Query("select b from Bidder b where b.username=:username")
    Optional<Bidder> findByUsername(String username);
}
