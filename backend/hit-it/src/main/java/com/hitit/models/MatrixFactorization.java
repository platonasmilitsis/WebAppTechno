package com.hitit.models;

import com.hitit.services.BidService;
import com.hitit.services.ItemService;
import com.hitit.services.UsersService;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

public class MatrixFactorization {

    private final BidService bidService;
    private HashMap <Long, HashMap<Long, Double>> matrix;
    private final UsersService usersService;
    private final ItemService itemService;


    private Boolean is_Init;
    private HashMap<Long, HashMap<Long, Double>> similarity_matrix_users;

    private HashMap<Long, HashMap<Long, Double>> similarity_matrix_items;


    public MatrixFactorization(UsersService usersService, ItemService itemService, BidService bidService) {
        this.usersService = usersService;
        this.itemService = itemService;
        this.bidService = bidService;
        this.is_Init = false;
    }



    //user_item_m = matrix
    //X_user = similarity_item

    public void Init(){

        matrix = new HashMap<>();


        List<Item> items = itemService.getItems();
        List<Users> users = usersService.getUsers();
        for(Users u : users){
            HashMap<Long, Double> user_has_bid = new HashMap<>();
            for(Item i : items){
                user_has_bid.put(i.getId(),
                    bidService.findBid(i.getId(), u.getId()).isEmpty() ? 0.0 : 1.0 );
            }
            matrix.put(u.getId(),user_has_bid);
        }


        similarity_matrix_users = create_similarity_matrix(matrix);
        HashMap<Long, HashMap<Long, Double>> item_matrix = flip(matrix);
        similarity_matrix_items = create_similarity_matrix(item_matrix);

        this.is_Init=true;

    }



    private static HashMap<Long, HashMap<Long, Double>> create_similarity_matrix(HashMap<Long, HashMap<Long, Double>> matrix){

        HashMap<Long, HashMap<Long, Double>> similarity_matrix = new HashMap<>();

        for(Long user_id : matrix.keySet() ){

            Collection<Double> collection_A = matrix.get(user_id).values();

            Double[] Double_vector_A = collection_A.toArray(new Double[collection_A.size()]);
            double[] vector_a = new double[Double_vector_A.length];
            Arrays.setAll(vector_a,i -> Double_vector_A[i]);

            HashMap<Long, Double> temp_similarity_matrix = new HashMap<>();
            for(Long user_id2 : matrix.keySet()){

                Collection<Double> collection_B = matrix.get(user_id2).values();

                Double[] Double_vector_B = collection_B.toArray(new Double[collection_B.size()]);
                double[] vector_b = new double[Double_vector_B.length];
                Arrays.setAll(vector_b,i -> Double_vector_B[i]);

                double similarity_value = cosineSimilarity(vector_a,vector_b);
                temp_similarity_matrix.put(user_id2, similarity_value);
            }

            similarity_matrix.put(user_id,temp_similarity_matrix);
        }

        return similarity_matrix;
    }
    private static HashMap <Long, HashMap<Long, Double>> flip(HashMap<Long, HashMap<Long, Double>> map){
        HashMap <Long, HashMap<Long, Double>> result = new HashMap<>();
        for (Long key : map.keySet()){
            for (Long key2 : map.get(key).keySet()){
                if (!result.containsKey(key2)){
                    result.put(key2, new HashMap<Long, Double>());
                }

                result.get(key2).put(key, map.get(key).get(key2));
            }
        }


        return result;
    }


    private static double cosineSimilarity(double[] vectorA, double[] vectorB) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    public boolean getInit() {
        return this.is_Init;
    }

    public HashMap<Long, Double> getUserSimilarities(Long user_id) {
        return similarity_matrix_users.get(user_id);
    }

    public HashMap<Long, Double> getSummaryBid(HashMap<Long, Double> n_user_similarities) {
        HashMap<Long, Double> mean_map = new HashMap<>();

        for(Long user_id : n_user_similarities.keySet()){
            for(Long item_id : matrix.get(user_id).keySet())
                if(mean_map.containsKey(item_id)){
                    Double increase = mean_map.get(item_id);
                    increase = increase + matrix.get(user_id).get(item_id);
                    mean_map.put(item_id, increase);
                }
                else{
                    mean_map.put(item_id,matrix.get(user_id).get(item_id));
                }

        }

        return mean_map;

    }

    public HashMap<Long, Double> removeAlreadyBidItems(Long user_id, HashMap<Long, Double> bid_summary_item) {
        HashMap<Long, Double> items = matrix.get(user_id);
        for(Long item : items.keySet()){
            if(items.get(item).equals(1.0))
                bid_summary_item.remove(item);
        }

        return bid_summary_item;
    }
}
