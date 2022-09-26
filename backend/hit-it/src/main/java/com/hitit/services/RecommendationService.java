package com.hitit.services;


import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.MatrixFactorization;
import com.hitit.models.Users;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class RecommendationService {

    private final MatrixFactorization matrixFactorization;
    private final UsersService usersService;

    public RecommendationService(UsersService usersService, ItemService itemService, BidService bidService) {
        this.matrixFactorization = new MatrixFactorization( usersService, itemService, bidService) ;
        this.usersService = usersService;
    }


    private static HashMap<Long, Double> ExtractNTopValues(HashMap<Long,Double> user_similarities, int similar_users){

        HashMap<Long, Double> user_top_n = new HashMap<>();

        for(int i=0; i<similar_users; i++){
            Pair p = ExtractTopValue(user_similarities);
            if(p!=null)
                user_top_n.put(p.key,p.values);
        }
        return user_top_n;

    }

    private static class Pair{
        public Long key;
        public Double values;

        public Pair(Long key, Double values){
            this.key = key;
            this.values = values;
        }


    }

    private static Pair ExtractTopValue(HashMap<Long, Double> user_similarities){

        Long max_key = 0L;

        if(user_similarities.isEmpty())
            return null;


        Double max_value = user_similarities.get(0L);
        for(Long user_id : user_similarities.keySet()){
            if(max_value < user_similarities.get(user_id)){
                max_value = user_similarities.get(user_id);
                max_key = user_id;
            }


        }

        user_similarities.remove(max_key);

        return new Pair(max_key,max_value);





    }




    public List<Long> ItemRecommender(String username) {

        int similar_users = 20;
        int recommend_items = 10;

        while(matrixFactorization.getInit()){ continue;}

        Optional<Users> optional_user = usersService.findUser(username);

        if(optional_user.isEmpty()) throw new UserNotFoundException();
        else{
            // Get user's id
            Long user_id = optional_user.get().getId();

            // Get vector of similar users and copy
            HashMap<Long, Double> user_similarities = new HashMap<> ( matrixFactorization.getUserSimilarities(user_id) ) ;

            // obtain the indices of the top k most similar users
            HashMap<Long, Double> n_user_similarities = ExtractNTopValues(user_similarities, similar_users);

            // Obtain summary of all items if bid or not
            HashMap<Long, Double> bid_summary_item = matrixFactorization.getSummaryBid(n_user_similarities);

            //Remove already bid_items
            bid_summary_item = matrixFactorization.removeAlreadyBidItems(user_id, bid_summary_item);

            HashMap<Long, Double> recommend_items_map = ExtractNTopValues(bid_summary_item, recommend_items);

            return new ArrayList<>(recommend_items_map.keySet());

        }

    }


    public void Init() {
        matrixFactorization.Init();
    }
}
