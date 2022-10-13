package com.hitit.services;

import com.hitit.exceptions.ItemNotFoundException;
import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.*;
import com.hitit.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.transaction.Transactional;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@Slf4j
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

    public Long[] getItemsIds() {return itemRepository.findAllItemsIds();}
    public List<Item> getItems() {return itemRepository.findAll();}

    public List<Item> getItems(Long id) { return itemRepository.findItemByUserId(id);}

    public Optional<Item> getItem(Long id) {return itemRepository.findById(id);}

    public Item addItem(Item newItem, Long id) {
        Optional< Users > user = usersRepository.findById(id);
        if(user.isPresent())
        {
            newItem.setUser(user.get());
            
            newItem.setItem_start_biding_sold(0L);
            Item myItem =  itemRepository.save(newItem);
            if(bidsService.isBidsPresent(myItem.getId()).isEmpty())
                bidsService.createBids(myItem.getId());
            return myItem;
        }
        else throw new UserNotFoundException();
    }

    public Item updateItem(Item newItem, Long id){
        return itemRepository.findById(id)
                .map(item -> {
                    this.checkSetName(item, newItem.getName());
                    this.checkSetDescription(item, newItem.getDescription());
                    this.checkSetFirstBid(item, newItem.getFirst_bid());
                    this.checkSetBuyPrice(item, newItem.getBuy_price());
                    this.checkSetLocation(item, newItem.getLocation());
                    this.checkSetCountry(item, newItem.getCountry());
                    this.checkSetLatitude(item, newItem.getLatitude());
                    this.checkSetLongitude(item, newItem.getLongitude());
                    this.checkSetImgPath(item, newItem.getImg_path());
                    return itemRepository.save(item);
                }).orElseThrow(ItemNotFoundException:: new);


    }


    public Item startBid(Long id){
        Optional<Item> item = itemRepository.findById(id);
        if(item.isPresent()){
            Item myItem = item.get();
            
            if(!bidsService.isBidsPresent(id).isPresent())
                bidsService.createBids(id);
            
            myItem.setItem_start_biding_sold(1L);
            
            return itemRepository.save(myItem) ;
        }

        return null;


    }

    private void checkSetDescription(Item item, String description) {
        if(description!=null) item.setDescription(description);
    }

    private void checkSetFirstBid(Item item, Double firstBid) {
        if(firstBid!=null) item.setFirst_bid(firstBid);
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

    private void checkSetBuyPrice(Item item, Double buy_price) {
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

    public Item endBid(Long id) {

        Optional<Item> item = itemRepository.findById(id);
        if(item.isPresent()){
            Item myItem = item.get();
            myItem.setItem_start_biding_sold(2L);
            return itemRepository.save(myItem) ;
        }

        return null;
    }

    public byte[] fullItemToXml(Long item_id) {
        FullItem fullItem = getFullItem(item_id);
        try {

            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

            // root elements
            Document doc = docBuilder.newDocument();
            Element rootElement = doc.createElement("Item");
            rootElement.setAttribute("ItemID",fullItem.getItem().getId().toString());
            doc.appendChild(rootElement);

            Element name = doc.createElement("Name");
            name.appendChild(doc.createTextNode(fullItem.getItem().getName()));
            rootElement.appendChild(name);


            List<Category> categories =  fullItem.getCategories();

            for(Category category : categories) {
                Element cat = doc.createElement("Category");
                cat.appendChild(doc.createTextNode(category.getCategory()));
                rootElement.appendChild(cat);
            }

            String currently = "$";
            double max=0.0;
            for(Bid b : fullItem.getBids().getBids()){
                if(b.getAmount()>max)
                    max = b.getAmount();
            }

            currently = currently + max;
            Element current = doc.createElement("Currently");
            current.appendChild(doc.createTextNode(currently));
            rootElement.appendChild(current);

            Element first_bid = doc.createElement("First_Bid");
            first_bid.appendChild(doc.createTextNode("$" + fullItem.getItem().getFirst_bid().toString()));
            rootElement.appendChild(first_bid);

            Element num_of_bids = doc.createElement("Number_of_Bids");
            if(fullItem.getBids()==null)
                num_of_bids.appendChild(doc.createTextNode("0"));
            num_of_bids.appendChild(doc.createTextNode(String.valueOf(fullItem.getBids().getBids().size())));
            rootElement.appendChild(num_of_bids);

            Element bids = doc.createElement("Bids");

            DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yy hh:mm:ss");

            if(fullItem.getBids()!=null){
                for(Bid b : fullItem.getBids().getBids()){
                    Element bid = doc.createElement("Bid");

                    Element bidder = doc.createElement("Bidder");
                    Bidder bidder1 = b.getBidder();
                    bidder.setAttribute("Rating", bidder1.getRating().toString());
                    bidder.setAttribute("UserID", bidder1.getId().toString());

                    Element location = doc.createElement("Location");
                    location.appendChild(doc.createTextNode(bidder1.getLocation()));
                    bidder.appendChild(location);


                    Element country = doc.createElement("Country");
                    country.appendChild(doc.createTextNode(bidder1.getCountry()));
                    bidder.appendChild(country);

                    bid.appendChild(bidder);

                    Element amount = doc.createElement("Amount");
                    amount.appendChild(doc.createTextNode("$" + b.getAmount()));
                    bid.appendChild(amount);

                    Element time = doc.createElement("Time");
                    String strDate = dateFormat.format(b.getTime());
                    time.appendChild(doc.createTextNode(strDate));
                    bid.appendChild(time);

                    bids.appendChild(bid);
                }
            }

            Element location = doc.createElement("Location");
            if(fullItem.getItem().getLatitude()!=null)
                location.setAttribute("Latitude", fullItem.getItem().getLatitude());

            if(fullItem.getItem().getLongitude()!=null)
                location.setAttribute("Longitude", fullItem.getItem().getLongitude());

            location.appendChild(doc.createTextNode(fullItem.getItem().getLocation()));
            rootElement.appendChild(location);

            Element country = doc.createElement("Country");
            country.appendChild(doc.createTextNode(fullItem.getItem().getCountry()));
            rootElement.appendChild(country);

            Element started = doc.createElement("Started");
            String strStart = dateFormat.format(fullItem.getItem().getStart_time());
            started.appendChild(doc.createTextNode(strStart));
            rootElement.appendChild(started);

            Element ends = doc.createElement("Ends");
            String strEnds = dateFormat.format(fullItem.getItem().getEnd_time());
            ends.appendChild(doc.createTextNode(strEnds));
            rootElement.appendChild(ends);

            Element seller = doc.createElement("Seller");
            seller.setAttribute("UserID", fullItem.getItem().getUser().getId().toString());
            rootElement.appendChild(seller);

            Element description = doc.createElement("Description");
            description.appendChild(doc.createTextNode(fullItem.getItem().getDescription()));
            rootElement.appendChild(description);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT,"yes");
            DOMSource source = new DOMSource(doc);




            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            StreamResult result = new StreamResult(bos);

            transformer.transform(source,result);

            return bos.toByteArray();

        } catch (ParserConfigurationException | TransformerException pce) {
            pce.printStackTrace();
        }
        return new byte[0];
    }

    public void saveAllItems(List<Item> itemList, HashMap<String, Users> map, List<String> seller_usernames) {


        for(int i=0;i<itemList.size();i++){
            itemList.get(i).setUser(map.get(seller_usernames.get(i)));
            if(i%1000==0)
                log.info("{} Items loaded...", i);
        }

        itemRepository.saveAll(itemList);

    }
}
