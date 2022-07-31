package com.hitit.controllers;


import com.hitit.models.Item;
import com.hitit.services.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ItemController {

    private final ItemService itemService;



    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/users/{id}/items")
    public List<Item> getItems(@PathVariable Long id){ return itemService.getItems(id);}

    @DeleteMapping("users/{id}/items")
    public ResponseEntity<?> deleteItems(@PathVariable Long id){
        return itemService.deleteItems(id);
    }

    @GetMapping("/items")
    public List<Item> getItems(){return itemService.getItems();}

    @GetMapping("/items/{id}")
    public Optional<Item> getItem(@PathVariable Long id){return itemService.getItem(id);}

    @PostMapping("/users/{id}/items")
    public Item newItem(@RequestBody Item newItem, @PathVariable Long id){return itemService.addItem(newItem,id);}

    @PutMapping("/items/{id}")
    public Item updateItem(@RequestBody Item updatedItem, @PathVariable Long id){
        return itemService.updateItem(updatedItem,id);
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id){
        return itemService.deleteItem(id);
    }

    }
