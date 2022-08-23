package com.hitit.repository;

import com.hitit.models.Messages;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
    @Query("select m from Messages m where m.seller_id = :user_id or m.buyer_id = :user_id  ")
    List<Messages> findAllByUserId(Long user_id);

    @Modifying
    @Query("delete from Messages m where m.id = :id")
    void deleteById(@NotNull Long id);
}
