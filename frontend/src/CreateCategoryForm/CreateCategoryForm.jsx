import React, { useState, useEffect } from "react";

export const CreateCategoryForm = ({ category, setCategories }) => {
    // Get all categories from API
    const fetchNotes = async () => {
        const request = await fetch("http://localhost:8080/api/categories", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        const categoryData = await request.json();
        setCategories(categoryData);
    };

    // What happens when the page loads for the first
    useEffect(() => {
        fetchNotes();
    }, []);

    // Create Category method
    const createCategory = async (event) => {
        event.preventDefault(); // this line is to not refresh the page by default
        let data = {};
        data.category = document.getElementById("txtCat").value;

        const request = await fetch("http://localhost:8080/api/categories", {
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
        setCategories((prevCat) => [...prevCat, responseData]);

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
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">
                                    Add or Delete Categories
                                </h6>
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <form id="createNote">
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">
                                        Enter the Category
                                    </label>
                                    <input
                                        className="form-control"
                                        id="txtCat"
                                        rows="3"
                                    ></input>
                                </div>

                                <div className="form-group mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={createCategory}
                                    >
                                        Create Category!
                                    </button>{" "}
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Delete categories
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Delete Categories
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {category.map((cats) => (
                                <CategoryRow
                                    key={cats.id}
                                    cat={cats}
                                    category={category}
                                    setCategories={setCategories}
                                />
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const CategoryRow = ({ cat, category, setCategories }) => {
    // Delete Method
    const deleteCategory = async (id) => {
        const request = await fetch(
            "http://localhost:8080/api/category/" + id,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        // Delete cat from list
        const updatedElements = category.filter((cat) => cat.id !== id);

        // Update list
        setCategories(updatedElements);
    };

    return (
        <p>
            {cat.category}{" "}
            <button
                className="btn btn-danger mr-2"
                onClick={() => deleteCategory(cat.id)}
            >
                Delete Category
            </button>
        </p>
    );
};
