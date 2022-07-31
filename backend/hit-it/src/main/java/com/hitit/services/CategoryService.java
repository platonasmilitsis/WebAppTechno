package com.hitit.services;

import com.hitit.models.Category;
import com.hitit.repository.CategoryRepository;
import com.hitit.repository.ItemCategoryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ItemCategoryRepository itemCategoryRepository;

    public CategoryService(CategoryRepository categoryRepository, ItemCategoryRepository itemCategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.itemCategoryRepository = itemCategoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategory(Long id) {
        return categoryRepository.findById(id);
    }

    public Category addCategory(@NotNull Category newCategory) {
        Optional<Category> cat = categoryRepository.findByCategory(newCategory.getCategory());
        return cat.orElseGet(() -> categoryRepository.save(newCategory));
    }

    public Category addCategory(String name) {
        Optional<Category> cat = categoryRepository.findByCategory(name);
        return cat.orElseGet(() -> categoryRepository.save(new Category(name)));
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        itemCategoryRepository.deleteByCategoryId(id);
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }

    public ResponseEntity<?> deleteCategory(String name) {
        Optional<Category> cat = categoryRepository.findByCategory(name);
        if(cat.isPresent()){
            Long id = cat.get().getId();
            itemCategoryRepository.deleteByCategoryId(id);
        }
        categoryRepository.deleteByName(name);
        return ResponseEntity.ok("OK");
    }
}