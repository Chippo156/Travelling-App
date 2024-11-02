package org.ecommerce.travelappbackend.services.impl;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.repository.CategoryRepository;
import org.ecommerce.travelappbackend.services.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Category createCategory(Category categoryRequest) {
       try{
           Category category = new Category();
           category.setCategoryName(categoryRequest.getCategoryName());
           return categoryRepository.save(category);
       }
       catch (Exception e){
           throw new RuntimeException(e.getMessage());
       }
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Category not found"));
    }

    @Override
    public List<Category> getAllCategories() {
        try {
            return categoryRepository.findAll();
        }
        catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }

    }
}
