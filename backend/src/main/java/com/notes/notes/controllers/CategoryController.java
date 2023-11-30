package com.notes.notes.controllers;

import com.notes.notes.dao.CategoryDao;
import com.notes.notes.models.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {
    @Autowired
    private CategoryDao categoryDao;

    // Get all categories
    @RequestMapping(value = "api/categories", method = RequestMethod.GET)
    public List<Category> getNotes() {
        return categoryDao.getCategoryList();
    }

    // Create category
    @RequestMapping(value = "api/categories", method = RequestMethod.POST)
    public Category createCategory(@RequestBody Category cat){
        return categoryDao.createCategory(cat);
    }

    // Delete category
    @RequestMapping(value = "api/category/{id}", method = RequestMethod.DELETE)
    public void deleteCategory(@PathVariable Long id){
        categoryDao.deleteCategory(id);
    }
}
