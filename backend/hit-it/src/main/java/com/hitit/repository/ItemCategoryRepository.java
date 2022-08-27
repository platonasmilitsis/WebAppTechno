package com.hitit.repository;

import com.hitit.models.Item;
import com.hitit.models.ItemCategory;
import com.hitit.models.ItemCategoryID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, ItemCategoryID> {

    @Query("select i from ItemCategory ic, Item i where ic.category_id = ?1 and ic.item_id = i.id ")
    List<Item> findAllItemsByCategoryId(Long id);


//
//    @Modifying
//    @Query("delete from ItemCategory ic where ic.category_id=?1")
//    void deleteByCategoryId(Long id);
//
//    @Modifying
//    @Query("delete from ItemCategory ic where ic.item_id=:id")
//    void deleteByItemId(Long id);
//
//
//    @Query("select ic from ItemCategory ic where ic.item_id=?1")
//    List<ItemCategory> findByItemId(Long id);


    @Query("select ic.category_id from ItemCategory ic where ic.item_id=:id")
    List<Long> getCategoriesBasedOnItem(Long id);
}
