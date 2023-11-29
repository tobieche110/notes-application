package com.notes.notes.controllers;

import com.notes.notes.dao.NoteDao;
import com.notes.notes.models.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class NoteController{

    @Autowired
    private NoteDao noteDao;

    // Get all notes
    @RequestMapping(value = "api/notes", method = RequestMethod.GET)
    public List<Note> getNotes() {
        return noteDao.getNotes();
    }

    // Get a single note via ID
    @RequestMapping(value = "api/notes/{id}", method = RequestMethod.GET)
    public Note getOneNote(@PathVariable Long id){
        return noteDao.getOneNote(id);
    }

    // Create a note
    @RequestMapping(value = "api/notes", method = RequestMethod.POST)
    public void createNote(@RequestBody Note note){
        noteDao.create(note);
    }

    // Delete a note
    @RequestMapping(value = "api/notes/{id}", method = RequestMethod.DELETE)
    public void deleteNote(@PathVariable Long id){
        noteDao.delete(id);
    }

    // Update a note
    @RequestMapping(value = "api/notes", method = RequestMethod.PATCH)
    public void updateNote(@RequestBody Note note){
        noteDao.update(note);
    }

    // Archive a note
    @RequestMapping(value = "api/archive/{id}", method = RequestMethod.PATCH)
    public void archiveNote(@PathVariable Long id){
        noteDao.archive(id);
    }
}
