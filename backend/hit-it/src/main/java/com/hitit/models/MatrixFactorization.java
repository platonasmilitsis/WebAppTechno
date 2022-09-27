package com.hitit.models;

import com.hitit.services.BidService;
import com.hitit.services.ItemService;
import com.hitit.services.UsersService;

import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
public class MatrixFactorization {

    private final BidService bidService;

    private Long[] matrix_user_id;
    private Long[] matrix_item_id;
    private int[][] matrix;
//    private HashMap <Long, HashMap<Long, Double>> matrix;
    private final UsersService usersService;
    private final ItemService itemService;



    private Boolean is_Init;
    private float[][] similarity_matrix_users;


    public MatrixFactorization(UsersService usersService, ItemService itemService, BidService bidService) {
        this.usersService = usersService;
        this.itemService = itemService;
        this.bidService = bidService;
        this.is_Init = false;
    }



    //user_item_m = matrix
    //X_user = similarity_item

    public void Init(){

        matrix_item_id = itemService.getItemsIds();
        matrix_user_id = usersService.getUsersIds();
        log.info("Initialising Recommendations {}", matrix_user_id.length);


        matrix = new int[matrix_user_id.length][matrix_item_id.length];



        for(int i=0; i<matrix_user_id.length; i++) {

            Long[] bid_items = bidService.getAllBids(matrix_user_id[i]);


            for (int j = 0; j < matrix_item_id.length; j++) {
                if (bid_items.length != 0) {
                    if (Arrays.asList(bid_items).contains(matrix_item_id[j]))
                        matrix[i][j] = 1;
                    else
                        matrix[i][j] = 0;
                } else
                    matrix[i][j] = 0;
            }
            //            matrix.put(u, user_has_bid);
            if (i % 1000 == 0)
                log.info("Initialised user {}", i);
        }

        log.info("Creating Similarity Matrix Recommendations {}", matrix_user_id.length);


        similarity_matrix_users = create_similarity_matrix(matrix);
        this.is_Init=true;

        log.info("Matrix Factorization Completed!!");

    }



    private float[][] create_similarity_matrix(int[][] matrix){

        float[][] similarity_matrix = new float[matrix_user_id.length][matrix_user_id.length];



        HashMap<Long, List<Long>> bidsNorm = bidService.createBidsNorm();
        log.info("Is it really {}?",bidsNorm.get(3L));

//        for(int i=0;i<matrix_user_id.length;i++){
//            for(int j=0;j<matrix_user_id.length;j++){
//                similarity_matrix[i][j]=-100.0F;
//            }
//        }
        for(int i=0; i<matrix_user_id.length;i++){
            for(int j=i; j<matrix_user_id.length; j++) {
                float similarity_value = cosineSimilarity(bidsNorm,i,j);
                similarity_matrix[i][j] = similarity_value;
                similarity_matrix[j][i] = similarity_value;
            }

            if (i % 1000 == 0)
                log.info("Similarity Matrix created for {} users", i);

        }
        return similarity_matrix;
    }




    private  float cosineSimilarity(HashMap<Long, List<Long>> bidsNorm, int index_a, int index_b) {


        float dotProduct = (float) 0.0F;

        if(bidsNorm.get(matrix_user_id[index_a]) == null)
            return 0.0F;
        if(bidsNorm.get(matrix_user_id[index_b]) == null)
            return 0.0F;


        for(Long i : bidsNorm.get(matrix_user_id[index_a])){
            if(bidsNorm.get(matrix_user_id[index_b]).contains(i))
                dotProduct++;
        }

        float normA = (float) bidsNorm.get(matrix_user_id[index_a]).size();
        float normB = (float) bidsNorm.get(matrix_user_id[index_b]).size();
        return (float) (dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)));
    }

    public boolean getInit() {
        return this.is_Init;
    }

    public float[] getUserSimilarities(Long user_id) {
        int index = 0;
        for(Long u : matrix_user_id) {
            if(Objects.equals(u, user_id))
                return similarity_matrix_users[index];
            index++;
        }
        return null;
    }

    public int[] getSummaryBid(int[] max_indexes) {
        int[] summary_array = new int[matrix_item_id.length];

        for(int j=0; j<matrix_item_id.length;j++){
            summary_array[j] = 0;
        }

        for(int i : max_indexes){
            for(int j=0; j<matrix_item_id.length;j++){
                summary_array[j] += matrix[i][j];
            }
        }

        return summary_array;

    }

    public int[] removeAlreadyBidItems(Long user_id, int[] bid_summary_item) {


        int index = 0;
        for(Long u: matrix_user_id){
            if(Objects.equals(u, user_id))
                break;
            index++;
        }


        int[] items = matrix[index];


        for(int i=0;i<items.length;i++) {
            if (items[i] == 1)
                bid_summary_item[i] = -1;
        }

        return bid_summary_item;
    }

    public Long[] getMaxItemsIds(int[] max_item_indexes) {
        Long[] matrix_items = new Long[max_item_indexes.length];

        int index = 0;
        for(int i: max_item_indexes){
            matrix_items[index] = matrix_item_id[i];
            index++;
        }

        return matrix_items;

    }
}
