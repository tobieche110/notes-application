package com.notes.notes.dao;

import com.notes.notes.models.Note;

import java.util.List;

public interface NoteDao {

    List<Note> getNotes(); // Get all notes
    Note getOneNote(Long id); // Get the specified note
    void delete(Long id); // Delete a note
    void create(Note note); // Create a note
    void update(Note note); // Update a note

    void archive(Long id); // Archive a note
}
