package com.hitit.controllers;


import com.hitit.models.Category;
import com.hitit.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return categoryService.getCategories();
    }

    @GetMapping("/categories/{id}")
    public Optional<Category> getCategory(@PathVariable Long id ){
        return categoryService.getCategory(id);
    }

    @PostMapping("/categories")
    public Category newCategory(@RequestBody Category newCategory){
        return categoryService.addCategory(newCategory);
    }

    @PostMapping("/categories/{name}")
    public Category newCategory(@PathVariable String name){
        return categoryService.addCategory(name);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        return categoryService.deleteCategory(id);
    }

    @DeleteMapping("/categories/name={name}")
    public ResponseEntity<?> deleteCategory(@PathVariable String name){
        return categoryService.deleteCategory(name);
    }
}
