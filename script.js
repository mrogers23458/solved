// gets all rows
const rows = document.querySelectorAll(".row");

// gets all buttons
const saveBtns = document.querySelectorAll(".saveBtn");

// gets all previous notes
const previousNotes = JSON.parse(localStorage.getItem("notes"));

// empty array to push notes into
const notes = [];

// logic for when save button is clicked takes in an element, and an id
function handleClick(note, noteId) {
  // value of the note element that is passed in from event listener
  const noteContent = note.value;

  // creates an object with properties id, and content, where id, is the passed in id, and content is the value of the text area
  const noteObj = {
    id: noteId,
    content: noteContent,
  };

  // uses array.find method to see if a previous note exists with the same id
  const previousNote = notes.find((note) => note?.id === noteObj.id);

  // if there isn't a previous note, push the note obj into the array
  if (!previousNote) {
    // pushes the noteObj into the the notes array
    notes.push(noteObj);
  }

  // if there is, uses array.splice to replace the old note with the new note
  if (previousNote) {
    // ids were set to start at one, however array is 0 index so we subtract 1 to match ids with array indexes
    const index = parseInt(previousNote.id) - 1;

    // replaces the old note with new note
    notes.splice(index, 1, noteObj);
  }
  localStorage.setItem("notes", JSON.stringify(notes));
}

// starts the app
function startApp() {
  // loops over all rows
  for (let i = 0; i < rows.length; i++) {
    // if there are previous notes, and a note exists at that index then push the previous note into the empty notes array
    // remember this runs when the app starts, not on click
    if (previousNotes && previousNotes[i]) {
      notes.push(previousNotes[i]);
    }

    // row by index
    const row = rows[i];
    // button by index
    const btn = saveBtns[i];

    // content area for each row
    const contentEl = row.children[1];

    // sets the text content of each row to the note that should be in that row based on i, which is mapped 1 to 1 with the id in this loop
    contentEl.textContent = notes[i].content;

    // adds a click listener, which calls handleClick function and passes in the current content element, as well as the rows id
    btn.addEventListener("click", () => handleClick(contentEl, row.id));
  }
}

startApp();
