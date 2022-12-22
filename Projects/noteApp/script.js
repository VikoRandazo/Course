let keyName = `note`;
let notes = [];

getData = () => {
  let task = document.querySelector(`.noteDetails`);
  let noteDate = document.querySelector(`.noteDate`);
  let noteHour = document.querySelector(`.noteHour`);
  task = task.value;
  noteDate = noteDate.value;
  noteHour = noteHour.value;

  return { task, noteDate, noteHour };
};

pushToArray = () => {
  let data = getData();
  notes.push(data);


  return notes;
};

convertAndStore = () => {
  let userInputs = pushToArray();
  let dataConvert = JSON.stringify(userInputs);
  localStorage.setItem(keyName, dataConvert);

  return dataConvert;
};

convertAndLoad = () => {
  let convertAndLoad = convertAndStore();
  let dataFromStorage = localStorage.getItem(keyName);
  let notesFromStorage = JSON.parse(dataFromStorage);
  return notesFromStorage;
};

openModal = () => {
  const modal = document.querySelector(`.container_errorModal`);
  modalBG = document.querySelector(`.container_errorModal_BG`);
  modal.classList.add(`open`);
  modalBG.style.display = `block`;
  return { modal, modalBG };
};

closeModal = () => {
  let modal = openModal();
  let modalBG = modal.modalBG;
  modalBG.style.display = `none`;
  modal.modal.classList.remove(`open`);
};

function clearFields () {
  let task = document.querySelector(`.noteDetails`);
  let noteDate = document.querySelector(`.noteDate`);
  let noteHour = document.querySelector(`.noteHour`);
  
  noteHour.value = ``;
  noteDate.value = ``;
  task.value = ``;
};

createNote = () => {
  const userInputs = getData();
  const task = userInputs.task;
  const noteDate = userInputs.noteDate;
  const noteHour = userInputs.noteHour;

  // validate fulfilment
  if (task && noteDate && noteHour) {
    let notesContainer = document.querySelector(`.notes`);
    let loadedNotesArray = convertAndLoad();
    for (let i = 0; i < loadedNotesArray.length; i++) {
      console.log(loadedNotesArray[loadedNotesArray.length - 1].task);
    }

    // create elements
    let newNote = document.createElement(`li`);
    let closeIcon = document.createElement(`span`);
    let noteTaskContainer = document.createElement(`div`);
    let noteTask = document.createElement(`p`);
    let dateAndTimeContainer = document.createElement(`div`);
    let dueDate = document.createElement(`span`);
    let dueHour = document.createElement(`span`);
    let divider = document.createElement(`hr`)

    // add classes
    newNote.classList.add(`note`);
    closeIcon.classList.add(`material-icons`);
    closeIcon.classList.add(`closeIcon`);
    noteTaskContainer.classList.add(`noteTaskContainer`);
    noteTask.classList.add(`noteTask`);
    dueDate.classList.add(`taskDueDate`);
    dueHour.classList.add(`taskDueHour`);
    dateAndTimeContainer.classList.add(`dateAndTimeContainer`);
    divider.classList.add(`noteDivider`)

    // add attributes
    closeIcon.setAttribute(`onclick`, `deleteNote()`);

    // add value
    closeIcon.innerText = `close`;
    noteTask.innerText = loadedNotesArray[loadedNotesArray.length - 1].task;
    dueDate.innerText = loadedNotesArray[loadedNotesArray.length - 1].noteDate;
    dueHour.innerText = loadedNotesArray[loadedNotesArray.length - 1].noteHour;

    // append elements
    newNote.appendChild(closeIcon);
    noteTaskContainer.appendChild(noteTask);
    dateAndTimeContainer.append(dueDate, dueHour);
    newNote.append(noteTaskContainer,divider, dateAndTimeContainer);
    notesContainer.appendChild(newNote);

    clearFields()
    return newNote;
  } else {
    openModal();
  }
};



deleteNote = () => {
  localStorage.removeItem(keyName)
  event.target.parentNode.remove();
};

