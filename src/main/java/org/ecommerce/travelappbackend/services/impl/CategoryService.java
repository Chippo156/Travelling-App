package org.ecommerce.travelappbackend.services.impl;

import org.ecommerce.travelappbackend.entity.Category;

import java.util.List;

public interface CategoryService {
    public Category createCategory(Category categoryRequest);
    public Category getCategory(int id);
    public List<Category> getAllCategories();
}
