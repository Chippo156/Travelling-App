package org.ecommerce.travelappbackend.controller;

import lombok.RequiredArgsConstructor;
import org.ecommerce.travelappbackend.entity.Category;
import org.ecommerce.travelappbackend.dtos.response.ApiResponse;
import org.ecommerce.travelappbackend.services.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    public ApiResponse<Category> createCategory(@RequestBody Category category){
        try{
            return new ApiResponse<>(200,"success",categoryService.createCategory(category));
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
    @GetMapping
    public ApiResponse<List<Category>> getCategories(){
        try{
            return new ApiResponse<>(200,"success",categoryService.getAllCategories());
        }catch (Exception ex){
            return new ApiResponse<>(400,ex.getMessage(),null);
        }
    }
}
