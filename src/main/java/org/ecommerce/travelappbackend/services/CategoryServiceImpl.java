package org.ecommerce.travelappbackend.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.repository.CategoryRepository;
import org.ecommerce.travelappbackend.services.impl.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Category createCategory(Category categoryRequest) {
        Category category = new Category();
        category.setCategoryName(categoryRequest.getCategoryName());
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategory(int id) {
        return null;
    }

    @Override
    public List<Category> getAllCategories() {
        return null;
    }
}
