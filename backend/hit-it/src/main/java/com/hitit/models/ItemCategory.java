package com.hitit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "item_category")
@IdClass(ItemCategoryID.class)
public class ItemCategory{

    @Id
    @Column(name = "category_id",nullable = false)
    private Long category_id;

    @Id
    @Column(name = "item_id",nullable = false)
    private Long item_id;


}
