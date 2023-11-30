package com.notes.notes.dao;

import com.notes.notes.models.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> getCategoryList();
    Category getOneCat(Long id);
    Category createCategory(Category cat);
    void deleteCategory(Long id);
}
