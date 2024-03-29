package com.hitit.controllers;


import com.hitit.models.Item;
import com.hitit.models.ItemCategory;
import com.hitit.services.ItemCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ItemCategoryController {

    private final ItemCategoryService itemCategoryService;

    public ItemCategoryController(ItemCategoryService itemCategoryService) {
        this.itemCategoryService = itemCategoryService;
    }


    @GetMapping("/categories/items")
    public List<ItemCategory> getItemCategories(){
        return itemCategoryService.getItemCategories();
    }

    @GetMapping("/categories/{id}/items")
    public List<Item> getItemBasedOnCategory(@PathVariable Long id){
        return itemCategoryService.getItemBasedOnCategory(id);
    }


    @PostMapping("/items/{id}")
    public List<ItemCategory> addCategoriesToItem(@RequestParam("category_id") Integer[] category_id, @PathVariable Long id){
        return itemCategoryService.addCategoriesToItem(category_id,id);
    }

    @PostMapping("/categories/{id}/q")
    public List<ItemCategory> addItemsToCategory(@RequestParam("item_id") Integer[] item_id, @PathVariable Long id) {
        return itemCategoryService.addItemsToCategory(item_id, id);
    }

    @DeleteMapping("/items/{id}/q")
    public ResponseEntity<?> deleteCategoriesFromItem(@RequestParam("category_id") Integer[] category_id, @PathVariable Long id){
        return itemCategoryService.deleteCategoriesFromItem(category_id,id);
    }

    @DeleteMapping("/categories/{id}/q")
    public ResponseEntity<?> deleteItemsFromCategory(@RequestParam("item_id") Integer[] item_id, @PathVariable Long id) {
        return itemCategoryService.deleteItemsFromCategory(item_id, id);
    }


}
