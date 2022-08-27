package com.hitit.services;

import com.hitit.exceptions.ItemNotFoundException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.BidsBidList;
import com.hitit.models.FullItem;
import com.hitit.models.Item;
import com.hitit.models.Users;
import com.hitit.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;


    private final BidsService bidsService;
    private final ItemCategoryService itemCategoryService;
    private final UsersRepository usersRepository;


    public ItemService(ItemRepository itemRepository, BidsService bidsService, ItemCategoryService itemCategoryService, UsersRepository usersRepository) {
        this.itemRepository = itemRepository;
        this.bidsService = bidsService;
        this.itemCategoryService = itemCategoryService;

        this.usersRepository = usersRepository;
    }


    public List<Item> getItems() {return itemRepository.findAll();}

    public List<Item> getItems(Long id) { return itemRepository.findItemByUserId(id);}

    public Optional<Item> getItem(Long id) {return itemRepository.findById(id);}

    public Item addItem(Item newItem, Long id) {
        Optional< Users > user = usersRepository.findById(id);
        if(user.isPresent())
        {
            newItem.setUser(user.get());
            return itemRepository.save(newItem);
        }
        else throw new UserNotFoundException();
    }

    public Item updateItem(Item newItem, Long id){
        return itemRepository.findById(id)
                .map(item -> {
                    this.checkSetName(item, newItem.getName());
                    this.checkSetBuyPrice(item, newItem.getBuy_price());
                    this.checkSetLocation(item, newItem.getLocation());
                    this.checkSetCountry(item, newItem.getCountry());
                    this.checkSetLatitude(item, newItem.getLatitude());
                    this.checkSetLongitude(item, newItem.getLongitude());
                    this.checkSetImgPath(item, newItem.getImg_path());
                    return itemRepository.save(item);
                }).orElseThrow(ItemNotFoundException:: new);


    }

    private void checkSetImgPath(Item item, String img_path) {
        if(img_path!=null) item.setImg_path(img_path);
    }

    private void checkSetLongitude(Item item, String longitude) {
        if(longitude!=null) item.setLongitude(longitude);
    }

    private void checkSetLatitude(Item item, String latitude) {
        if(latitude!=null) item.setLatitude(latitude);
    }

    private void checkSetCountry(Item item, String country) {
        if(country!=null) item.setCountry(country);
    }

    private void checkSetLocation(Item item, String location) {
        if(location!=null) item.setLocation(location);
    }

    private void checkSetBuyPrice(Item item, Long buy_price) {
        if(buy_price!=null) item.setBuy_price(buy_price);
    }

    private void checkSetName(Item item, String name) {
        if(name!=null) item.setName(name);
    }

    public ResponseEntity<?> deleteItem(Long id) {

        itemRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }
    public ResponseEntity<?> deleteItems(Long id) {





        itemRepository.deleteByUserId(id);
        return ResponseEntity.ok("OK");
    }

//
//    public void deleteItemsByUser(Long user_id) {
//
//        List<Item> list = itemRepository.findItemByUserId(user_id);
//
//        for(Item item : list){
//
//            itemRepository.deleteById(item.getId());
//        }
//
//    }

    public FullItem getFullItem(Long id) {

        Optional<Item> item = itemRepository.findById(id);
        FullItem fullItem = new FullItem();
        BidsBidList bidsBidList = new BidsBidList();


        if(item.isPresent()){
            Item item1 = item.get();

            bidsBidList.setBids_id(item1.getId());
            bidsBidList.setBids(bidsService.getBidListByBidsId(item1.getId()));

            fullItem.setItem(item1);
            fullItem.setCategories(itemCategoryService.getCategoriesBasedOnItem(item1.getId()));
            fullItem.setBids(bidsBidList);


        }
        return fullItem;

    }
}
