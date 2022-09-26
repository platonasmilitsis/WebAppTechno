package com.hitit.services;


import com.hitit.models.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
@Getter
@Setter
public class DatasetLoad {


    private RecommendationService recommendationService;
    private ItemService itemService;
    private UsersService usersService;
    private BidsService bidsService;
    private BidService bidService;
    private BidderService bidderService;
    private CategoryService categoryService;
    private ItemCategoryService itemCategoryService;

    public DatasetLoad(ItemService itemService, UsersService usersService,
                       BidsService bidsService, BidService bidService,
                       CategoryService categoryService, ItemCategoryService itemCategoryService, BidderService bidderService,
                       RecommendationService recommendationService) {
        this.itemService = itemService;
        this.usersService = usersService;
        this.bidsService = bidsService;
        this.bidService = bidService;
        this.categoryService = categoryService;
        this.itemCategoryService = itemCategoryService;
        this.bidderService = bidderService;
        this.recommendationService = recommendationService;

    }

    @EventListener(ApplicationReadyEvent.class)
    public void Init() throws IOException {
        File file = new File("./src/main/resources/data/ebay-data");


        // Instantiate the Factory
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

        Files.walkFileTree(file.toPath(), new SimpleFileVisitor<>() {

            private void createUserOrNothing(String username){
                if(usersService.findUser(username).isEmpty()){

                    Users new_user = new Users();
                    new_user.setDummyUser(username);

                    usersService.addUsers(new_user);
                }
            }

            private Long createBidderOrNothing(String bidder_username, Long bidder_rating, String bidder_location, String bidder_country){
                Optional<Bidder> my_bidder = bidderService.findBidder(bidder_username);
                if (my_bidder.isEmpty()) {
                    Bidder bidder = new Bidder();
                    Users bidder_user = usersService.getUser(bidder_username);
                    bidder.setId(bidder_user.getId());
                    bidder.setRating(bidder_rating);
                    bidder.setCountry(bidder_country);
                    bidder.setLocation(bidder_location);
                    bidder.setUsername(bidder_username);

                    bidderService.newBidder(bidder);


                    return bidder_user.getId();
                }

                return my_bidder.get().getId();
            }

            private void createItemOrNothing(String username, String item_id, String item_name, Double item_first_bid,
                                             String item_location, String item_country,
                                             String item_string_started, String item_string_ended,
                                             String item_description)
                    throws ParseException {

                Long id = Long.valueOf(item_id);

                if(itemService.getItem(id).isEmpty()){

                    SimpleDateFormat format1 = new SimpleDateFormat("MMM-dd-yy HH:mm");
                    Date item_start = format1.parse(item_string_started);
                    Date item_end = format1.parse(item_string_ended);

                    Users user = usersService.getUser(username);
                    Item item = new Item();

                    item.setName(item_name);
                    item.setFirst_bid(item_first_bid);
                    item.setLocation(item_location);
                    item.setCountry(item_country);
                    item.setStart_time(item_start);
                    item.setEnd_time(item_end);
                    item.setId(Long.valueOf(item_id));
                    item.setDescription(item_description);
                    item.setBuy_price(1000D);


                    itemService.addItem(item, user.getId());
                }


            }


            private void createBidOrNothing(Long bids_id, Long bidder_id, Double bid_amount, String bid_time) throws ParseException {
                SimpleDateFormat format1 = new SimpleDateFormat("MMM-dd-yy HH:mm");
                Date bid_date = format1.parse(bid_time);

                Optional<Bid> bid =  bidService.findBid(bids_id, bidder_id, bid_amount, bid_date);
                if(bid.isEmpty()){
                    Bid bid1 = new Bid();
                    bid1.setAmount(bid_amount);
                    bid1.setTime(bid_date);
                    bidService.addBid(bidder_id, bids_id, bid1);
                }

            }
            private Integer createCategoryOrNothing(String category_name, Long item_id) {
                Optional<Category> category  = categoryService.findCategory(category_name);
                Category new_category = category.isEmpty() ? categoryService.addCategory(category_name) : category.get();
                return new_category.getId().intValue();




            }


            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {



                if(file.toString().endsWith(".xml")) {
                    log.info("Loading {}...",file.toString());

                    try {
                        // parse XML file
                        DocumentBuilder db = dbf.newDocumentBuilder();
                        Document doc = db.parse(file.toFile());

                        doc.getDocumentElement().normalize();

                        // get <Items>
                        NodeList list = doc.getElementsByTagName("Item");

                        for (int temp = 0; temp < list.getLength(); temp++) {
                            Node node = list.item(temp);

                            if (node.getNodeType() == Node.ELEMENT_NODE) {
                                Element element = (Element) node;

                                String item_id = element.getAttribute("ItemID");
                                String item_name = element.getElementsByTagName("Name").item(0).getTextContent();
                                String item_string_first_bid = element.getElementsByTagName("First_Bid").item(0).getTextContent();
                                item_string_first_bid = item_string_first_bid.replace("$", "");
                                item_string_first_bid = item_string_first_bid.replace(",","");
                                Double item_first_bid = Double.valueOf(item_string_first_bid);
                                String item_location = element.getElementsByTagName("Location").item(0).getTextContent();
                                String item_country = element.getElementsByTagName("Country").item(0).getTextContent();
                                String item_string_started = element.getElementsByTagName("Started").item(0).getTextContent();
                                String item_string_ended = element.getElementsByTagName("Ends").item(0).getTextContent();
                                String item_description = element.getElementsByTagName("Description").item(0).getTextContent();

                                Element item_seller = (Element) element.getElementsByTagName("Seller").item(0);

                                String seller_username = item_seller.getAttribute("UserID");

                                createUserOrNothing(seller_username);
                                createItemOrNothing(seller_username,item_id, item_name,
                                        item_first_bid, item_location, item_country, item_string_started,
                                        item_string_ended, item_description );


                                NodeList bids = element.getElementsByTagName("Bid");
                                for(int temp1 = 0; temp1 < bids.getLength(); temp1++){
                                    Node node1 = bids.item(temp1);
                                    if(node1.getNodeType() == Node.ELEMENT_NODE){
                                        Element bid = (Element) node1;


                                        //Create User and Bidder

                                        Element bidder = (Element) bid.getElementsByTagName("Bidder").item(0);
                                        Long bidder_rating = Long.valueOf(bidder.getAttribute("Rating"));
                                        String bidder_username = bidder.getAttribute("UserID");


                                        String bidder_location = bidder.getElementsByTagName("Location").getLength() == 0 ?
                                            "Location" : bidder.getElementsByTagName("Location").item(0).getTextContent();

                                        String bidder_country = bidder.getElementsByTagName("Country").getLength() == 0 ?
                                            "Country" : bidder.getElementsByTagName("Country").item(0).getTextContent();

                                        createUserOrNothing(bidder_username);
                                        Long bidder_id = createBidderOrNothing(bidder_username, bidder_rating, bidder_location, bidder_country);

                                        //Create Bid
                                        Long bids_id = Long.valueOf(item_id);

                                        String bid_time = bid.getElementsByTagName("Time").item(0).getTextContent();
                                        String string_bid_amount = bid.getElementsByTagName("Amount").item(0).getTextContent();
                                        string_bid_amount = string_bid_amount.replace("$", "");
                                        string_bid_amount = string_bid_amount.replace(",","");
                                        Double bid_amount = Double.valueOf(string_bid_amount);

                                        createBidOrNothing(bids_id,bidder_id,bid_amount,bid_time);


                                    }
                                }


                                NodeList categories = element.getElementsByTagName("Category");
                                Integer[] categories_id = new Integer[categories.getLength()];
                                for(int temp2 = 0; temp2 < categories.getLength(); temp2++) {
                                    Node node2 = categories.item(temp2);
                                    if(node2.getNodeType() == Node.ELEMENT_NODE) {
                                        Element category = (Element) node2;
                                        //Create category
                                        String category_name = category.getTextContent();
                                        categories_id[temp2] = createCategoryOrNothing(category_name, Long.valueOf(item_id));
                                    }
                                }
                                if (categories_id.length != 0) {
                                    itemCategoryService.addCategoriesToItem(categories_id, Long.valueOf(item_id));
                                }

                            }


                        }
                        log.info("Loaded {}...",file);



                    }
                    catch (ParseException | ParserConfigurationException | SAXException | IOException e) {
                        e.printStackTrace();
                    }

                }
                // do your thing here
                return FileVisitResult.CONTINUE;
            }



        });


        log.info("Loading files ended");
        recommendationService.Init();

    }




}
