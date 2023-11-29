package com.notes.notes.dao;

import com.notes.notes.models.Note;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class NoteDaoImp implements NoteDao{

    @PersistenceContext
    private EntityManager entityManager;

    // Get all notes
    @Override
    @Transactional
    public List<Note> getNotes() {
        String query = "FROM Note";

        return entityManager.createQuery(query).getResultList();
    }

    // Get a single note via ID
    @Override
    public Note getOneNote(Long id) {
        String query = "FROM Note WHERE id = :id";

        return entityManager.createQuery(query, Note.class).setParameter("id", id).getSingleResult();
    }

    // Delete a note
    @Override
    public void delete(Long id) {
        Note note = entityManager.find(Note.class, id);
        entityManager.remove(note);
    }

    @Override
    public void create(Note note) {
        entityManager.merge(note);
    }

    @Override
    public void update(Note note) {
        Note existingNote = entityManager.find(Note.class, note.getId());

        if (existingNote != null) {
            existingNote.setNote(note.getNote());
            entityManager.flush();
        }
    }

    @Override
    public void archive(Long id) {
        Note noteToArchive = entityManager.find(Note.class, id);

        noteToArchive.setIsArchived(!noteToArchive.getIsArchived());
    }
}
