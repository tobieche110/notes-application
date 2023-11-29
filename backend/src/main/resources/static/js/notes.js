// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadNotes();
    //$('#notes').DataTable();
});

async function loadNotes(){
    const request = await fetch('api/notes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const notes = await request.json();

    // archived notes go to one class and unarchived ones to another
    let tableHtml = '';
    for (let note of notes){
        let deleteButton = '<a href="#" class="btn btn-danger" onclick="deleteNote('+note.id+')">Delete</a>'
        let updateButton = '<a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" data-bs-content="'+note.note+'" data-bs-id="'+note.id+'">Edit</a>'
        let archiveButton = '<a href="#" class="btn btn-secondary" onclick="archiveNote('+note.id+')">Archive this note</a>'
        let unarchiveButton = '<a href="#" class="btn btn-secondary" onclick="archiveNote('+note.id+')">Activate this note</a>'
        console.log(note);
        if (note.isArchived){
            // Button says unarchive this note
            noteHtml = '<tr class="archived"><td>'+note.id+'</td><td>'+note.note+'</td><td>'+deleteButton+' '+updateButton+' '+unarchiveButton+'</td></tr>';
        } else {
            // Button says archive this note
            noteHtml = '<tr class="unarchived"><td>'+note.id+'</td><td>'+note.note+'</td><td>'+deleteButton+' '+updateButton+' '+archiveButton+'</td></tr>';
        }
        tableHtml += noteHtml;
    }

    // Add rows to tbody
    $('#notes tbody').html(tableHtml);
    $('#notes tbody tr').hide();
    $('#notes tbody tr.unarchived').show();

}

// Show archived Notes or unarchived notes depending on the checkboxes state
function toggleNoteList() {
    const showUnarchived = $('#showUnarchivedNotes').prop('checked');
    const showArchived = $('#showArchivedNotes').prop('checked');

    if (showUnarchived && showArchived) {
        // show all rows
        $('#notes tbody tr').show();
    } else if (showUnarchived) {
        // show only unarchived rows
        $('#notes tbody tr.archived').hide();
        $('#notes tbody tr.unarchived').show();
    } else if (showArchived) {
        // show only archived rows
        $('#notes tbody tr.unarchived').hide();
        $('#notes tbody tr.archived').show();
    } else {
        // hide all rows
        $('#notes tbody tr').hide();
    }
}

// Archive Note or unarchive note
async function archiveNote(id){
    const request = await fetch("api/archive/"+ id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    location.reload();
}

// Create Note
async function createNote(){
    let data = {};
    data.note = document.getElementById("txtNote").value;
    data.category = document.getElementById("txtCategory").value;
    data.isArchived = false;

    const request = await fetch("api/notes", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    location.reload();
}

// Update Note
// Modal logic
let currentModalId = 0;
var updateModal = document.getElementById('updateModal')
updateModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  var button = event.relatedTarget
  // Extract info from data-bs-* attributes
  var recipient = button.getAttribute('data-bs-content')
  var modalBodyInput = updateModal.querySelector('.modal-msg-txt')
  currentModalId = button.getAttribute('data-bs-id')

  modalBodyInput.value = recipient
})

async function updateNote(){
    let data = {};
    data.id = currentModalId;
    data.note = document.getElementById("message-text").value;
    
    console.log(data.note);
    const request = await fetch("api/notes", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    location.reload();
}

// Delete Note
async function deleteNote(id){
    const request = await fetch("api/notes/"+ id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    location.reload();
}