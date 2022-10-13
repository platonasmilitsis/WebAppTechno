package com.hitit.services;

import com.hitit.models.Category;
import com.hitit.models.Item;
import com.hitit.models.ItemCategory;
import com.hitit.models.ItemCategoryID;
import com.hitit.repository.ItemCategoryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemCategoryService {

    private final ItemCategoryRepository itemCategoryRepository;
    private final CategoryService categoryService;


    public ItemCategoryService(ItemCategoryRepository itemCategoryRepository, CategoryService categoryService) {
        this.itemCategoryRepository = itemCategoryRepository;
        this.categoryService = categoryService;
    }


    public List<ItemCategory> getItemCategories() {
        return itemCategoryRepository.findAll();
    }

    public List<Item> getItemBasedOnCategory(Long id) {
        return itemCategoryRepository.findAllItemsByCategoryId(id);
    }


    public List<ItemCategory> addCategoriesToItem(Integer @NotNull [] category_id, Long id) {

        List<ItemCategory> temp = new ArrayList<>();


        for(Integer cat_id: category_id){
            ItemCategory newItemCategory = new ItemCategory();
            newItemCategory.setItem_id(id);
            newItemCategory.setCategory_id(cat_id.longValue());
            temp.add(itemCategoryRepository.save(newItemCategory));
        }

        return temp;
    }

    public List<ItemCategory> addItemsToCategory(Integer @NotNull [] item_id, Long id) {

        List<ItemCategory> temp = new ArrayList<>();


        for(Integer it_id: item_id){
            ItemCategory newItemCategory = new ItemCategory();
            newItemCategory.setItem_id(it_id.longValue());
            newItemCategory.setCategory_id(id);
            temp.add(itemCategoryRepository.save(newItemCategory));
        }

        return temp;
    }


    public ResponseEntity<?> deleteCategoriesFromItem(Integer @NotNull [] category_id, Long id) {
        for(Integer cat_id: category_id){
            ItemCategoryID ic_id = new ItemCategoryID();
            ic_id.setCategory_id(cat_id.longValue());
            ic_id.setItem_id(id);
            itemCategoryRepository.deleteById(ic_id);
        }
        return ResponseEntity.ok("OK");

    }

    public ResponseEntity<?> deleteItemsFromCategory(Integer @NotNull [] item_id, Long id) {
        for(Integer it_id: item_id){
            ItemCategoryID ic_id = new ItemCategoryID();
            ic_id.setCategory_id(id);
            ic_id.setItem_id(it_id.longValue());
            itemCategoryRepository.deleteById(ic_id);
        }
        return ResponseEntity.ok("OK");

    }

    public List<Category> getCategoriesBasedOnItem(Long id) {

        List<Long> ids = itemCategoryRepository.getCategoriesBasedOnItem(id);
        List<Category> categories = new ArrayList<>();

        for(Long myid: ids)
        {
            Optional<Category> category = categoryService.getCategory(myid);
            category.ifPresent(categories::add);
        }

        return categories;


    }

    public void saveAllItemCategories(HashMap<Long, List<String>> itemCategoriesMap, HashMap<String, Long> map_cat) {

        List<ItemCategory> itemCategoryList = new ArrayList<>();
        for (Long key : itemCategoriesMap.keySet()) {
            for(String category : itemCategoriesMap.get(key)){
                ItemCategory ic = new ItemCategory();
                ic.setCategory_id(map_cat.get(category));
                ic.setItem_id(key);
                itemCategoryList.add(ic);
            }

        }

        itemCategoryRepository.saveAll(itemCategoryList);
    }
}
