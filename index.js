function setToStorage(notes) {
  localStorage.clear();
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getFromStorage() {
  let jsonNotes = localStorage.getItem("notes");
  let notes = JSON.parse(jsonNotes);
  if (notes) {
    return notes;
  } else {
    return [];
  }
}

const addNote = (message) => {
  let notes = getFromStorage();
  const currentDate = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleString("en-IN", options);
  const newNote = {
    id: Date.now().toString(),
    message: message,
    date: formattedDate,
    isEditable: true,
  };

  notes = [...notes, newNote];
  setToStorage(notes);
  renderUI();
};

const editNote = (id, newMessage) => {
  let notes = getFromStorage();
  const currentDate = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleString("en-IN", options);
  notes.forEach((note) => {
    if (note.id === id) {
      note.message = newMessage;
      note.date = formattedDate;
      note.isEditable = !note.isEditable;
    }
  });
  setToStorage(notes);
};

const deleteNote = (id) => {
  let notes = getFromStorage();
  notes = notes.filter((note) => note.id !== id);
  setToStorage(notes);
  renderUI();
};

const addNoteButton = document.querySelector(".addNote");
const noteContainer = document.querySelector(".noteContainer");

const colors = ["#fec970", "#fe9b71", "#b592fc", "#00d4fe", "#e3ee8e"];

function colorGenerator() {
  const index = Math.floor(Math.random()*colors.length);
  return colors[index];
}

const renderUI = () => {
  const notes = getFromStorage();
  const template = document.querySelector("#template");
  noteContainer.innerHTML = "";
  notes.forEach((note) => {
    const noteCard = template.content.cloneNode(true);
    const writeMsg = noteCard.getElementById("writeMsg");
    const msgDate = noteCard.getElementById("msgDate");
    const editButton = noteCard.getElementById("editButton");
    const deleteButton = noteCard.getElementById("deleteButton");
    const editIconButton = noteCard.querySelector(".editIconButton");
    const noteColor = noteCard.querySelector('.noteColor');

    const bgColor = colorGenerator();
    noteColor.style.backgroundColor = bgColor;

    writeMsg.readOnly = !note.isEditable;

    if (note.isEditable) {
      editIconButton.classList.remove("fa-pen-to-square");
      editIconButton.classList.add("fa-check");
    } else {
      editIconButton.classList.remove("fa-check");
      editIconButton.classList.add("fa-pen-to-square");
    }

    writeMsg.value = note.message;
    msgDate.innerHTML = note.date;
    editButton.addEventListener("click", () => {
      if (!note.isEditable) {
        note.isEditable = true;
        writeMsg.readOnly = !note.isEditable;
        editIconButton.classList.remove("fa-pen-to-square");
        editIconButton.classList.add("fa-check");
        editNote(note.id, writeMsg.value);
      } else {
        note.isEditable = false;
        writeMsg.readOnly = !note.isEditable;
        editIconButton.classList.remove("fa-check");
        editIconButton.classList.add("fa-pen-to-square");
        editNote(note.id, writeMsg.value);
      }
    });
    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    noteContainer.appendChild(noteCard);
  });
};

renderUI();

addNoteButton.addEventListener("click", () => {
  addNote("");
});


