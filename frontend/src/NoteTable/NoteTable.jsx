import React, { useState, useEffect } from "react";

export const NoteTable = ({
    notes,
    setNotes,
    category,
    originalNotes,
    setOriginalNotes,
}) => {
    const [showUnarchived, setShowUnarchived] = useState(true);
    const [showArchived, setShowArchived] = useState(false);

    // Activated Checkbox
    const handleToggleUnarchived = () => {
        setShowUnarchived((prev) => !prev);
    };

    // Archived Checkbox
    const handleToggleArchived = () => {
        setShowArchived((prev) => !prev);
    };

    // Filter between notes
    const filterNotes = () => {
        let selectedCat = document.getElementById("txtNoteCategory").value;
        // If selected cat is different to  NCS, then filter, else, bring original notes
        if (selectedCat !== "No Category Selected") {
            // Filter Notes based on Cat
            const updatedElements = originalNotes.filter(
                (note) => note.category === selectedCat
            );
            setNotes(updatedElements);
        } else {
            setNotes(originalNotes);
        }
    };

    // Listens to showArchived and showUnarchived checkboxes
    useEffect(() => {
        const unarchivedRows = document.querySelectorAll(
            "#notes tbody tr.unarchived"
        );
        const archivedRows = document.querySelectorAll(
            "#notes tbody tr.archived"
        );

        if (showUnarchived && showArchived) {
            // show all rows
            unarchivedRows.forEach((row) => (row.style.display = "table-row"));
            archivedRows.forEach((row) => (row.style.display = "table-row"));
        } else if (showUnarchived) {
            // show only unarchived rows
            archivedRows.forEach((row) => (row.style.display = "none"));
            unarchivedRows.forEach((row) => (row.style.display = "table-row"));
        } else if (showArchived) {
            // show only archived rows
            unarchivedRows.forEach((row) => (row.style.display = "none"));
            archivedRows.forEach((row) => (row.style.display = "table-row"));
        } else {
            // hide all rows
            unarchivedRows.forEach((row) => (row.style.display = "none"));
            archivedRows.forEach((row) => (row.style.display = "none"));
        }
    }, [showArchived, showUnarchived, notes]);

    // Get all notes from API

    const fetchNotes = async () => {
        const request = await fetch("http://localhost:8080/api/notes", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const notesData = await request.json();
        setNotes(notesData);
        setOriginalNotes(notesData);
        setShowUnarchived(true); // Set showUnarchived to true after fetching notes
    };

    // What happens when the page loads for the first
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Notes</h6>
            </div>
            <div className="card-body">
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="showUnarchivedNotes"
                        onChange={handleToggleUnarchived}
                        checked={showUnarchived}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="showUnarchivedNotes"
                    >
                        Active Notes
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="showArchivedNotes"
                        onChange={handleToggleArchived}
                        checked={showArchived}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="showArchivedNotes"
                    >
                        Archived Notes
                    </label>
                </div>
                <div className="form-group mt-3">
                    <select
                        className="custom-select custom-select-lg mb-3"
                        id="txtNoteCategory"
                        onChange={filterNotes}
                    >
                        <option defaultValue={"No Category"}>
                            No Category Selected
                        </option>
                        {category.map((cats) => (
                            <CategoryRowSelect key={cats.category} cat={cats} />
                        ))}
                    </select>
                </div>
                <div className="table-responsive">
                    <table
                        className="table table-bordered"
                        id="notes"
                        width="100%"
                        cellSpacing="0"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Note</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.length === 0 ? (
                                <tr>
                                    <td>
                                        There aren't any notes here... Create
                                        one!
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ) : (
                                notes.map((note) => (
                                    <NoteRow
                                        key={note.id}
                                        note={note}
                                        notes={notes}
                                        setNotes={setNotes}
                                        setOriginalNotes={setOriginalNotes}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const CategoryRowSelect = ({ cat }) => (
    <option value={`${cat.category}`}>{cat.category}</option>
);

const NoteRow = ({ note, notes, setNotes, setOriginalNotes }) => {
    // Create Method is in Create Note Form component

    // Delete Method
    const deleteNote = async (id) => {
        const request = await fetch("http://localhost:8080/api/notes/" + id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        // Delete note from list
        const updatedElements = notes.filter((note) => note.id !== id);

        // Update list
        setNotes(updatedElements);
        setOriginalNotes(notes);

        alert("Removed successfully");
    };

    // Archive note method
    const archiveNote = async (id) => {
        const request = await fetch("http://localhost:8080/api/archive/" + id, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        // Updates notes list
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id
                    ? { ...note, isArchived: !note.isArchived }
                    : note
            )
        );

        setOriginalNotes(notes);
    };

    // Update note logic is in Edit Modal component

    return (
        <tr
            className={`${note.isArchived ? "archived" : "unarchived"} ${
                note.category
            }-category`}
            id={`tableNoteId-${note.id}`}
        >
            <td>{note.id}</td>
            <td>{note.note}</td>
            <td>{note.category}</td>
            <td>
                <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteNote(note.id)}
                >
                    Delete
                </button>{" "}
                <button
                    className="btn btn-primary mr-2"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    data-bs-content={note.note}
                    data-bs-id={note.id}
                >
                    Edit
                </button>{" "}
                <button
                    className="btn btn-secondary"
                    onClick={() => archiveNote(note.id)}
                >
                    {note.isArchived
                        ? "Activate this note"
                        : "Archive this note"}
                </button>
            </td>
        </tr>
    );
};
