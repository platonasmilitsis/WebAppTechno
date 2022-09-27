package com.hitit.repository;

import com.hitit.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {


    @Query("select i from Item i where i.user.id =:user_id")
    List<Item> findItemByUserId(Long user_id);

    @Query("select i.id from Item i where i.user.id=:user_id")
    Long[] findItemsIdByUserId(Long user_id);

    @Modifying
    @Query("delete from Item i where i.user.id =:id")
    void deleteByUserId(Long id);


    @Query("select i.id from Item i")
    Long[] findAllItemsIds();
}
