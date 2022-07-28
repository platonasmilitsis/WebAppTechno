package com.hitit.repository;


import com.hitit.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("select i from Category i where UPPER(i.category) LIKE upper(:categoryName) ")
    Optional<Category> findByCategory(String categoryName);

    @Modifying
    @Query("DELETE from Category i where UPPER(i.category) LIKE upper(:name)")
    void deleteByName(String name);
}
