package com.hitit.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Setter
public class ItemCategoryID implements Serializable {

    private Long category_id;

    private Long item_id;


}
