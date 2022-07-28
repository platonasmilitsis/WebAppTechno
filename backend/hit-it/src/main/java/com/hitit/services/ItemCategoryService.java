package com.hitit.services;

import com.hitit.models.Item;
import com.hitit.models.ItemCategory;
import com.hitit.models.ItemCategoryID;
import com.hitit.repository.ItemCategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;


    public ItemCategoryService(ItemCategoryRepository itemCategoryRepository) {
        this.itemCategoryRepository = itemCategoryRepository;
    }


    public List<ItemCategory> getItemCategories() {
        return itemCategoryRepository.findAll();
    }

    public List<Item> getItemBasedOnCategory(Long id) {
        return itemCategoryRepository.findAllItemsByCategoryId(id);
    }


    public List<ItemCategory> addCategoriesToItem(Integer[] category_id, Long id) {

        List<ItemCategory> temp = new ArrayList<>();


        for(Integer cat_id: category_id){
            ItemCategory newItemCategory = new ItemCategory();
            newItemCategory.setItem_id(id);
            newItemCategory.setCategory_id(cat_id.longValue());
            temp.add(itemCategoryRepository.save(newItemCategory));
        }

        return temp;
    }

    public List<ItemCategory> addItemsToCategory(Integer[] item_id, Long id) {

        List<ItemCategory> temp = new ArrayList<>();


        for(Integer it_id: item_id){
            ItemCategory newItemCategory = new ItemCategory();
            newItemCategory.setItem_id(it_id.longValue());
            newItemCategory.setCategory_id(id);
            temp.add(itemCategoryRepository.save(newItemCategory));
        }

        return temp;
    }


    public ResponseEntity<?> deleteCategoriesFromItem(Integer[] category_id, Long id) {
        for(Integer cat_id: category_id){
            ItemCategoryID ic_id = new ItemCategoryID();
            ic_id.setCategory_id(cat_id.longValue());
            ic_id.setItem_id(id);
            itemCategoryRepository.deleteById(ic_id);
        }
        return ResponseEntity.ok("OK");

    }

    public ResponseEntity<?> deleteItemsFromCategory(Integer[] item_id, Long id) {
        for(Integer it_id: item_id){
            ItemCategoryID ic_id = new ItemCategoryID();
            ic_id.setCategory_id(id);
            ic_id.setItem_id(it_id.longValue());
            itemCategoryRepository.deleteById(ic_id);
        }
        return ResponseEntity.ok("OK");

    }
}
