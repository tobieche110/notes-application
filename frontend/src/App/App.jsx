import React, { useState, useEffect } from "react";
import { NoteTable } from "../NoteTable";
import { CreateNoteForm } from "../CreateNoteForm";
import { EditModal } from "../EditModal";

export const App = () => {
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

                <CreateNoteForm />
                <NoteTable />
                <EditModal />
            </div>
        </>
    );
};
