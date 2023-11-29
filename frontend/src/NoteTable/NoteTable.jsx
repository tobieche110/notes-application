import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";

export const NoteTable = () => {
    const [showUnarchived, setShowUnarchived] = useState(true);
    const [showArchived, setShowArchived] = useState(false);

    const handleToggleUnarchived = () => {
        setShowUnarchived((prev) => !prev);
        toggleNoteList();
    };

    const handleToggleArchived = () => {
        setShowArchived((prev) => !prev);
        toggleNoteList();
    };

    return (
        <>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        There aren't any notes here... Create
                                        one!
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

// When document opens, load notes
$(function () {
    loadNotes();
});

// Loads all notes to tbody
async function loadNotes() {
    const request = await fetch("http://localhost:8080/api/notes", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const notes = await request.json();

    // archived notes go to one class and unarchived ones to another
    let noteHtml;
    let tableHtml = "";
    for (let note of notes) {
        let deleteButton = (
            <button
                className="btn btn-danger"
                onClick={() => deleteNote(note.id)}
            >
                Delete
            </button>
        );
        let updateButton = (
            <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#updateModal"
                data-bs-content={note.note}
                data-bs-id={note.id}
            >
                Edit
            </button>
        );
        let archiveButton = (
            <button
                className="btn btn-secondary"
                onClick={() => archiveNote(note.id)}
            >
                Archive this note
            </button>
        );
        let unarchiveButton = (
            <button
                className="btn btn-secondary"
                onClick={() => archiveNote(note.id)}
            >
                Activate this note
            </button>
        );

        console.log(note);
        if (note.isArchived) {
            // Button says unarchive this note
            noteHtml = `
                <tr class="archived">
                    <td>${renderToString(note.id)}</td>
                    <td>${renderToString(note.note)}</td>
                    <td>
                    ${renderToString(deleteButton)}
                    ${renderToString(updateButton)} 
                    ${renderToString(unarchiveButton)}
                    </td>
                </tr>
                `;
        } else {
            // Button says archive this note
            noteHtml = `
                <tr class="unarchived">
                    <td>${renderToString(note.id)}</td>
                    <td>${renderToString(note.note)}</td>
                    <td>
                    ${renderToString(deleteButton)}
                    ${renderToString(updateButton)} 
                    ${renderToString(archiveButton)}
                    </td>
                </tr>
                `;
        }
        tableHtml += noteHtml;
    }

    // Add rows to tbody
    console.log(tableHtml);
    $("#notes tbody").html(tableHtml);
    $("#notes tbody tr").hide();
    $("#notes tbody tr.unarchived").show();
}

// Show archived Notes or unarchived notes depending on the checkboxes state
function toggleNoteList() {
    const showUnarchived = $("#showUnarchivedNotes").prop("checked");
    const showArchived = $("#showArchivedNotes").prop("checked");

    if (showUnarchived && showArchived) {
        // show all rows
        $("#notes tbody tr").show();
    } else if (showUnarchived) {
        // show only unarchived rows
        $("#notes tbody tr.archived").hide();
        $("#notes tbody tr.unarchived").show();
    } else if (showArchived) {
        // show only archived rows
        $("#notes tbody tr.unarchived").hide();
        $("#notes tbody tr.archived").show();
    } else {
        // hide all rows
        $("#notes tbody tr").hide();
    }
}
