package com.hitit.repository;

import com.hitit.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {


    @Query("select i from Item i where i.user = ?1")
    List<Item> findItemByUserId(Long user_id);

    @Modifying
    @Query("delete from Item i where i.user = ?1")
    void deleteByUserId(Long id);
}
