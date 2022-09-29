package com.hitit.controllers;


import com.hitit.models.FullItem;
import com.hitit.models.Item;
import com.hitit.services.ItemService;
import com.hitit.services.RecommendationService;
import lombok.extern.slf4j.Slf4j;
import org.json.HTTP;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@Slf4j
public class ItemController {

    private final ItemService itemService;

    private final RecommendationService recommendationService;



    public ItemController(ItemService itemService, RecommendationService recommendationService) {
        this.itemService = itemService;
        this.recommendationService = recommendationService;
    }

    @GetMapping("/users/{id}/items")
    public List<Item> getItems(@PathVariable Long id){ return itemService.getItems(id);}

    @DeleteMapping("users/{id}/items")
    public ResponseEntity<?> deleteItems(@PathVariable Long id){
        return itemService.deleteItems(id);
    }

    @GetMapping("/items")
    public List<Item> getItems(){return itemService.getItems();}


    @GetMapping("/items/{id}/all")
    public FullItem getFullItem(@PathVariable Long id){
        return itemService.getFullItem(id);
    }

    @GetMapping("/items/all")
    public List<FullItem> getFullItemList(@RequestParam List<Long> items_ids){

        List<FullItem> fullItems = new ArrayList<>();

        for(Long item_id : items_ids){
            fullItems.add(itemService.getFullItem(item_id));
        }

        return fullItems;
    }



    @GetMapping("/download/{item_id}")
    public ResponseEntity<byte[]> downloadXmlItem(@PathVariable Long item_id){
        byte[] xml = itemService.fullItemToXml(item_id);
        log.info(item_id.toString());
        String name = "item_" + item_id + ".xml";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_XML_VALUE);
        httpHeaders.set(HttpHeaders.CONTENT_DISPOSITION,ContentDisposition.attachment()
                        .filename(name).build().toString());
        return ResponseEntity.ok().headers(httpHeaders).body(xml);



    }


    @GetMapping("items/recommendation/{id}")
    public List<FullItem> getRecommendations(@PathVariable Long id, @RequestBody @Nullable List<Long> visited){
        List<Long> items_ids = recommendationService.ItemRecommender(id,visited);
        List<FullItem> fullItems = new ArrayList<>();
        for(Long item_id : items_ids){
            fullItems.add(itemService.getFullItem(item_id));
        }
        return fullItems;
    }


    @GetMapping("/items/{id}")
    public Optional<Item> getItem(@PathVariable Long id){return itemService.getItem(id);}

    @PostMapping("/users/{id}/items")
    public Item newItem(@RequestBody Item newItem, @PathVariable Long id){return itemService.addItem(newItem,id);}

    @PutMapping("/items/{id}")
    public Item updateItem(@RequestBody Item updatedItem, @PathVariable Long id){
        return itemService.updateItem(updatedItem,id);
    }


    @PutMapping("/items/start/{id}")
    public Item startBid(@PathVariable Long id){
        return itemService.startBid(id);
    }


    @PutMapping("/items/end/{id}")
    public Item endBid(@PathVariable Long id){
        return itemService.endBid(id);
    }




    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id){
        return itemService.deleteItem(id);
    }

    }
