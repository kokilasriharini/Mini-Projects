let notesList = JSON.parse(localStorage.getItem("notesList")) || [];
        let lastdeletedNotesIndex = null;
        let lastdeletedNotes = null;
        let editIndex = null;
        let undobtn;
            function saveTask() {
                localStorage.setItem("notesList", JSON.stringify(notesList));
            }
            function Addnotes() {
                 document.getElementById("popup-title").textContent = "NEW NOTES";
                  document.getElementById("description").readOnly = false;
                document.getElementById("notes").style.display = "block";
                document.getElementById("description").focus();
            }
            function submitnote() {
                let descriptionBox = document.getElementById("description");
                let description = descriptionBox.value;
                if(description.trim() === "") {
                    alert("Add New Notes!");
                    return;
                }
                if(editIndex !== null) {
                    notesList[editIndex].description =
                        description;
                    editIndex = null;
                } 
                else {
                    notesList.push({
                        description: description
                    });
                }
                descriptionBox.value = "";
                saveTask();
                displayNotes();
                closebtn();
            }
            function displayNotes() {
                const noteColors = [
                    "#f5c842",
                    "#ff8a65",
                    "#81c784",
                    "#64b5f6",
                    "#ba68c8",
                    "#ffd54f",
                    "#4db6ac",
                    "#e57373"
                ];
                    let list = document.getElementById("notes-list");
                    list.innerHTML = "";
                    notesList.forEach((note, index) => {
                    let li = document.createElement("li");
                    li.style.background = noteColors[index % noteColors.length];
                    let noteText = document.createElement("span");
                    noteText.textContent = note.description;
                    let Editbtn = document.createElement("button");
                    Editbtn.innerHTML = `<img src="../Images/Edit_Image.png" width = "20px">`;
                    Editbtn.onclick = () => {
                        EditNote(index);
                    }
                    let delbtn = document.createElement("button");
                    delbtn.innerHTML = `<img src="../Images/delete-button.svg" width = "20px">`;
                    delbtn.onclick = () => {
                        deleteNotes(index);
                    };
                    let showbtn = document.createElement("button");
                    showbtn.textContent = "View";
                    showbtn.onclick = () => {
                         showdetails(index);
                    }
                    let btnGroup = document.createElement("div");
                    btnGroup.classList.add("btn-group");
                    li.appendChild(noteText);
                    li.appendChild(btnGroup);
                    btnGroup.appendChild(showbtn);
                    btnGroup.appendChild(Editbtn);
                    btnGroup.appendChild(delbtn);
                    list.appendChild(li);
                });

            }
            function deleteNotes(index) {
                lastdeletedNotesIndex = index;
                lastdeletedNotes = notesList[index];
                notesList.splice(index, 1);
                saveTask();
                displayNotes();
                showundo();
            }
            function showundo() {
                let toast = document.getElementById("toast");
                let undoBox = document.getElementById("undoBox");
                undoBox.innerHTML = `
                        Task Deleted!
                        <button onclick="undoTask()" class="undobutton2">Undo</button>
                        `;
                toast.classList.add("show");
                undobtn = setTimeout(() => {
                    toast.classList.remove("show");
                    undoBox.innerHTML = "";
                    lastdeletedNotes = null;
                    lastdeletedNotesIndex = null;
                }, 5000);
            }
            function undoTask() {  
                if (lastdeletedNotes !== null) {
                    notesList.splice(
                        lastdeletedNotesIndex,
                        0,
                        lastdeletedNotes
                    );
                    saveTask();
                    displayNotes();
                    let toast = document.getElementById("toast");
                    let undoBox = document.getElementById("undoBox");
                    toast.classList.remove("show");
undoBox.innerHTML = "";
clearTimeout(undobtn);
                    lastdeletedNotesIndex = null;
                    lastdeletedNotes = null;
                }
            }
            function EditNote(index) {
                document.getElementById("popup-title").textContent = "EDIT NOTE";
                editIndex = index;
                document.getElementById("notes")
                    .style.display = "block";
                document.getElementById("description").value =
                    notesList[index].description;
                document.getElementById("description")
                    .focus();
            }
            function showdetails(index){
                document.getElementById("popup-title").textContent = "VIEW NOTE";
                document.getElementById("notes").style.display = "block";
                document.getElementById("description").value =
                    notesList[index].description;
                document.getElementById("description").readOnly = true;
                document.querySelector(".submit-btn").style.display = "none";
}
            function closebtn() {
                document.getElementById("description").value = "";
                document.getElementById("description").readOnly = false;
                document.getElementById("notes").style.display = "none";
                document.querySelector(".submit-btn").style.display = "block";
            }
document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") 
        submitnote();
      if (e.key === "Escape") 
        closebtn();
    });

const darkBtn = document.querySelector(".DarkMode");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
displayNotes();

/* Features to add :
search notes.

pin important notes.

auto-save while typing.

note character count.

create and edit timestamps.

empty state message when no notes exist*/
