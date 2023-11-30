import React, { useState, useEffect } from "react";
import { NoteTable } from "../NoteTable";
import { CreateNoteForm } from "../CreateNoteForm";
import { EditModal } from "../EditModal";
import { CreateCategoryForm } from "../CreateCategoryForm";

export const App = () => {
    const [notes, setNotes] = useState([]);
    const [category, setCategories] = useState([]);

    return (
        <>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Welcome to My Notes!</h1>
                <p className="mb-4">
                    In this application, you will be able to create, read,
                    modify and delete your notes!.
                </p>
                <p className="mb-4">
                    You can also sort them by category using the dropdown menu!
                </p>

                <CreateNoteForm notes={notes} setNotes={setNotes} />
                <CreateCategoryForm
                    category={category}
                    setCategories={setCategories}
                />
                <NoteTable notes={notes} setNotes={setNotes} />
                <EditModal notes={notes} setNotes={setNotes} />
            </div>
        </>
    );
};
