package com.hitit.services;


import com.hitit.exceptions.UserNotFoundException;
import com.hitit.models.MatrixFactorization;
import com.hitit.models.Users;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
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
        log.info("0 Komple,{}", matrixFactorization.getInit());

        while(!matrixFactorization.getInit()){continue;}

        Optional<Users> optional_user = usersService.findUser(username);

        if(optional_user.isEmpty()) throw new UserNotFoundException();
        else{
            log.info("1 Komple,{}", matrixFactorization.getInit());

            // Get user's id
            Long user_id = optional_user.get().getId();
            
            // Get vector of similar users and copy
            float[] user_similarities = matrixFactorization.getUserSimilarities(user_id).clone();
            log.info("2 Komple");

            // obtain the indices of the top k most similar users
            int[] max_indexes = getMaxIndexes(user_similarities,similar_users);
            log.info("3 Komple");

            // Obtain summary of all items if bid or not
            int[] bid_summary_item = matrixFactorization.getSummaryBid(max_indexes);
            log.info("4 Komple");


            //Remove already bid_items
            bid_summary_item = matrixFactorization.removeAlreadyBidItems(user_id, bid_summary_item);
            log.info("5 Komple");


            int[] max_item_indexes = getMaxIndexes(bid_summary_item, recommend_items);
            log.info("6 Komple");

            return new ArrayList<>(List.of(matrixFactorization.getMaxItemsIds(max_item_indexes)));

        }

    }

    private int[] getMaxIndexes(float[] user_similarities, int similar_users) {

        int[] max_indexes = new int[similar_users];

        for (int i = 0; i < similar_users; i++) {
            int max_index = 0;
            double max_value = user_similarities[0];
            for (int j = 0; j < user_similarities.length; j++) {
                if (user_similarities[j] > max_value) {
                    max_value = user_similarities[j];
                    max_index = j;
                }
            }

            user_similarities[max_index] = -100;
            max_indexes[i] = max_index;

        }
        return max_indexes;

    }

        private int[] getMaxIndexes(int[] user_similarities, int similar_users) {

            int[] max_indexes = new int[similar_users];

            for(int i=0;i<similar_users;i++){
                int max_index = 0;
                double max_value = user_similarities[0];
                for(int j=0;j<user_similarities.length;j++) {
                    if(user_similarities[j]>max_value){
                        max_value = user_similarities[j];
                        max_index = j;
                    }
                }

                user_similarities[max_index] = -100;
                max_indexes[i] = max_index;

            }
            return max_indexes;


        }


    public void Init() {
        matrixFactorization.Init();
    }
}
