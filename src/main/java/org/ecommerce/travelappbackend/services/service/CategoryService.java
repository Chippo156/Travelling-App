package org.ecommerce.travelappbackend.services.service;

import org.ecommerce.travelappbackend.entity.Category;

import java.util.List;

public interface CategoryService {
     Category createCategory(Category categoryRequest);
     Category getCategory(Long id);
     List<Category> getAllCategories();
}
