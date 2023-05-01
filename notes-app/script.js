const addButtonEl = document.getElementById("add-button");
const notesContainerEl = document.getElementById("notes-container");
const notesArray = localStorage.notes ? JSON.parse(localStorage.notes) : [];

const getNote = (id, value) => {
  return `<div id="${id}" class="note"><div class="note-header"><i onclick="editNote(${id})" class="material-icons">edit</i><i onclick="removeNote(${id})" class="material-icons">delete</i></div><textarea class="textarea">${value}</textarea></div>`;
};

const saveArray = () => {
  localStorage.notes = JSON.stringify(notesArray);
};

const updateNotes = () => {
  notesContainerEl.innerHTML = "";
  notesArray.forEach((el) => {
    const tmpEl = document.createElement("div");
    tmpEl.innerHTML = el.html;
    const note = tmpEl.children[0];
    const textarea = note.getElementsByTagName("textarea")[0];
    textarea.disabled = el.disabled;
    notesContainerEl.appendChild(note);
  });
};

const removeNote = (id) => {
  notesArray.splice(
    notesArray.findIndex((el) => el.id == id),
    1
  );
  updateNotes();
  saveArray();
};

const editNote = (id) => {
  const index = notesArray.findIndex((el) => el.id == id);
  const textarea =
    notesContainerEl.children[index].getElementsByTagName("textarea")[0];
  notesArray[index].disabled = !textarea.disabled;
  textarea.disabled = !textarea.disabled;
  saveArray();
};

addButtonEl.addEventListener("click", () => {
  const id = notesArray.length > 0 ? notesArray[0].id + 1 : 1;
  notesArray.unshift({
    id,
    value: "",
    disabled: false,
    html: getNote(id, ""),
  });
  updateNotes();
  saveArray();
});

notesContainerEl.addEventListener("input", (e) => {
  const note = notesArray.find((el) => el.id == e.target.parentElement.id);
  note.value = e.target.value;
  note.html = getNote(note.id, note.value);
  saveArray();
});

updateNotes();
