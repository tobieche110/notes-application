import React, { useState, useEffect } from "react";

export const EditModal = ({ notes, setNotes }) => {
    const [currentModalId, setCurrentModalId] = useState(0);

    // Modal opening
    useEffect(() => {
        const updateModal = document.getElementById("updateModal");

        const showModalHandler = function (event) {
            var button = event.relatedTarget;
            var recipient = button.getAttribute("data-bs-content");
            var modalBodyInput = updateModal.querySelector(".modal-msg-txt");
            setCurrentModalId(button.getAttribute("data-bs-id"));
            modalBodyInput.value = recipient;
        };

        updateModal.addEventListener("show.bs.modal", showModalHandler);

        return () => {
            updateModal.removeEventListener("show.bs.modal", showModalHandler);
        };
    }, []);

    // Update Note
    const updateNote = async () => {
        let data = {};
        data.id = currentModalId;
        data.note = document.getElementById("message-text").value;

        const request = await fetch("http://localhost:8080/api/notes", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        setNotes((prevNotes) =>
            prevNotes.map((current) =>
                current.id === currentModalId
                    ? { ...current, note: data.note }
                    : current
            )
        );

        console.log(notes);
        alert("Edited successfully");
    };

    return (
        <div
            className="modal fade"
            id="updateModal"
            tabIndex="-1"
            aria-labelledby="updateModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalLabel">
                            Edit Note
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                >
                                    Note content:
                                </label>
                                <textarea
                                    className="form-control modal-msg-txt"
                                    id="message-text"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={updateNote}
                        >
                            Edit!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
