package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.services.impl.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        try{
            return ResponseEntity.ok(categoryService.createCategory(category));
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
