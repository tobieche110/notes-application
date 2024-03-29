import React, { useState, useEffect } from "react";

export const CreateNoteForm = ({ notes, setNotes, category, setOriginalNotes}) => {
    // Create Note method
    const createNote = async (event) => {
        event.preventDefault(); // this line is to not refresh the page by default
        let data = {};
        data.note = document.getElementById("txtNote").value;
        data.category = document.getElementById("txtCategory").value;
        data.isArchived = false;

        const request = await fetch("http://localhost:8080/api/notes", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // waits for server response
        const responseData = await request.json();

        // Update notes list
        setNotes((prevNotes) => [...prevNotes, responseData]);
        setOriginalNotes(notes);

        alert("Created successfully");
    };

    return (
        <>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">
                                    Add a Note
                                </h6>
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <form id="createNote">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">
                                        Enter your Note
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="txtNote"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="form-group mt-3">
                                    <select
                                        className="custom-select custom-select-lg mb-3"
                                        id="txtCategory"
                                    >
                                        <option defaultValue={"No Category"}>
                                            No Category
                                        </option>
                                        {category.map((cats) => (
                                            <CategoryRowSelect
                                                key={cats.category}
                                                cat={cats}
                                            />
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={createNote}
                                    >
                                        Create Note!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CategoryRowSelect = ({ cat }) => (
    <option value={`${cat.category}`}>{cat.category}</option>
);
