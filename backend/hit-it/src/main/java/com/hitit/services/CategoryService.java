package com.hitit.services;

import com.hitit.models.Category;
import com.hitit.repository.CategoryRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategory(Long id) {
        return categoryRepository.findById(id);
    }

    public Optional<Category> findByName(String name) { return categoryRepository.findByCategory(name);}
    public Category addCategory(@NotNull Category newCategory) {
        Optional<Category> cat = categoryRepository.findByCategory(newCategory.getCategory());
        return cat.orElseGet(() -> categoryRepository.save(newCategory));
    }

    public Category addCategory(String name) {
        Optional<Category> cat = categoryRepository.findByCategory(name);
        return cat.orElseGet(() -> categoryRepository.save(new Category(name)));
    }

    public ResponseEntity<?> deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }

    public ResponseEntity<?> deleteCategory(String name) {
        categoryRepository.deleteByName(name);
        return ResponseEntity.ok("OK");
    }

    public Optional<Category> findCategory(String category_name) {
        return categoryRepository.findByCategory(category_name);
    }

    public HashMap<String,Long> saveAllCategories(List<String> allCategories) {
        List<Category> categories = new ArrayList<>();
        for(String category: allCategories){
            if(findCategory(category).isEmpty())
                categories.add(new Category(category));
        }

        List<Category> cat = categoryRepository.saveAll(categories);

        HashMap<String, Long> ret = new HashMap<>();

        for(Category c : cat){
            ret.put(c.getCategory(), c.getId());
        }

        return  ret;


    }

    public Integer[] getCategoriesIds(List<String> strings) {

        Integer[] array = new Integer[strings.size()];

        int index = 0;
        for(String category : strings){
            Optional<Category> cat = categoryRepository.findByCategory(category);
            if(cat.isPresent()) {
                array[index] = Math.toIntExact(cat.get().getId());
                index++;
            }
        }

        return array;
    }
}
