package com.notes.notes.dao;

import com.notes.notes.models.Category;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class CategoryDaoImp implements CategoryDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Get all categories
    @Override
    public List<Category> getCategoryList() {
        String query = "FROM Category";

        return entityManager.createQuery(query).getResultList();    }

    @Override
    public Category getOneCat(Long id) {
        String query = "FROM Category WHERE id = :id";

        return entityManager.createQuery(query, Category.class).setParameter("id", id).getSingleResult();
    }

    @Override
    public Category createCategory(Category cat) {
        entityManager.merge(cat);
        return getOneCat(cat.getId());
    }

    @Override
    public void deleteCategory(Long id) {
        Category cat = entityManager.find(Category.class, id);
        entityManager.remove(cat);
    }
}
