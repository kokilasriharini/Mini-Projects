let tasks = JSON.parse(localStorage.getItem("tasks")) || [];// local stroages - saves tasks in the browser so they stay after refresh.
/*parse turns the string into real array/object.
tasks stores all tasks in one list.
Arrays are used to add, remove, and display todo items.*/

let lastDeletedTask = null;
let lastDeletedIndex = null;
let undoTimer;
function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}//stringify turns array/object into a string for storage.


function showTasks() {
    document.getElementById("addbtn").style.display = "none";
    document.getElementById("inputbox").style.display = "block";
    document.getElementById("description").style.display = "block";
    document.getElementById("dueDate").style.display = "block";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("savebtn").style.display = "block";
}//opens the input area.


function closebtns() {
    document.getElementById("addbtn").style.display = "block";
    document.getElementById("inputbox").style.display = "none";
    document.getElementById("description").style.display = "none";
    document.getElementById("dueDate").style.display = "none";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("savebtn").style.display = "none";
}//hides the input area.

function AddTask() {

    let inputbox =
        document.getElementById("inputbox");
    let input = inputbox.value;
    let descriptionBox =
        document.getElementById("description");
    let description =
        descriptionBox.value;
    let dueDate =
        document.getElementById("dueDate").value;


    if(input.trim() === ""){
        alert("Add New Task!");
        return;
    }

    if(dueDate === ""){
        alert("Select Due Date!");
        return;
    }

    let today = new Date();
    let due = new Date(dueDate);
    today.setHours(0,0,0,0);//set to midnight.
    due.setHours(0,0,0,0);//set to midnight.
    let diffTime = due - today;
    let differdays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
    );/*This subtracts one Date object from another and 
    gives the difference in milliseconds. 
    A future due date gives a positive number, 
    and a past due date gives a negative number.
    
    Math.ceil() rounds up.*/

    let priority = "";
  if(differdays <= 5){
    priority = "High";
  }
  else if(differdays <= 30 && differdays > 5){
    priority = "Medium";
  }
  else{
    priority = "Low";
  }
    tasks.push({//object pused into tasks.
        text: input,
        description: description,
        completed: false,
        dueDate: dueDate,
        priority: priority
    });

    inputbox.value = "";//free the inputbox after getting inputs.
    descriptionBox.value = "";//free description(textarea) after getting inputs.
    document.getElementById("dueDate").value = "";//free duedates inputbox.
    saveTask();
    displayTask();
    closebtns();
}
/*
    Here we add a new task.

    1. Get values from:
       - inputbox
       - description
       - dueDate

    2. Calculate priority using dueDate.

    3. Store task inside tasks array.

    4. Save task into localStorage.

    5. Display updated task list.

    6. Close input area.

    In Simple words,  takes user input, 
    makes a task object, saves it.
*/
function displayTask(filter = "all") {

    let list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach((task, index) => {

        if (
            (filter === "completed" && !task.completed) ||
            (filter === "pending" && task.completed)
        ) {
            return;
        }

        let li = document.createElement("li");
        let span = document.createElement("span");
        let dateSpan = document.createElement("small");
        let prioritySpan = document.createElement("span");
        let delbtn = document.createElement("button");
        let completeBtn = document.createElement("button");
        let btnGroup = document.createElement("div");
        li.classList.add("task-item");
        btnGroup.classList.add("btn-group");
        span.classList.add("task-text");
        dateSpan.classList.add("task-date");
        span.textContent = task.text;
        span.onclick = () => {
            showTaskDetails(index);
        };

        if (task.completed) {
            span.classList.add("completed");
        }

        dateSpan.textContent = task.dueDate;
        prioritySpan.textContent = task.priority;
        if (task.priority.includes("High")) {
            prioritySpan.classList.add("high");
            li.style.borderLeft = "4px solid #ff5a5a";
        }
        else if (task.priority.includes("Medium")) {
            prioritySpan.classList.add("medium");
            li.style.borderLeft = "4px solid #ffd43b";
        }
        else {
            prioritySpan.classList.add("low");
            li.style.borderLeft = "4px solid #69db7c";
        }
        
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => {
            toggleTask(index);
        };
        delbtn.textContent = "X";
        delbtn.onclick = () => {
            deleteTask(index);
        };
        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(delbtn);
        li.appendChild(span);
        li.appendChild(prioritySpan);
        li.appendChild(dateSpan);
        li.appendChild(btnGroup);
        list.appendChild(li);
    });
}
/*
    Display tasks inside UI.

    1. Get UL list.

    2. Clear old tasks.

    3. Loop through tasks array.

    4. Create:
       - li
       - span
       - buttons
       - priority
       - due date

    5. Append everything into list.

    In Simple words, reads the array and draws tasks on the screen.
*/


function toggleTask(index) {
    tasks[index].completed =
        !tasks[index].completed;
    saveTask();
    displayTask();
    updateStats();
}// changes completed true/false.

function showTaskDetails(index) {
    let detailBox = document.getElementById("taskDetails");
    let completeBtn = document.createElement("button");
    detailBox.innerHTML = `
        <div class="detail-card">
        <button onclick="closeDetails()" class="closeDetailsbtn">X</button>
           <div class="para"> <h2>
                ${tasks[index].text}
            </h2>
            <p>
                ${tasks[index].description}
            </p>
            <small>
                Due: ${tasks[index].dueDate}
            </small>
            <br><br>
            <p class="priority">
                ${tasks[index].priority}
            </p></div>
            <button onclick="Editbtn(${index})">Edit</button>
            <button onclick="toggleTask(${index})">

    ${tasks[index].completed
        ? "Uncomplete"
        : "Complete"}

</button>
        </div>
    `;
}//shows one task in a popup view.

function closeDetails(){
    document.getElementById(
        "taskDetails"
    ).innerHTML = "";
}
function Editbtn(index){

    let detailBox = document.getElementById("taskDetails");
    detailBox.innerHTML = `
    <div class="detail-card">
        <button onclick="closeDetails()" 
        class="closeDetailsbtn">
            X
        </button>
        <input 
            type="text"
            id="editTitle"
            value="${tasks[index].text}"
            class="task-input"
        >
        <textarea
            id="editDescription"
            class="task-input"
        >${tasks[index].description}</textarea>
        <input
            type="date"
            id="editDate"
            value="${tasks[index].dueDate}"
            class="task-input"
        >
        <button onclick="saveEdit(${index})">
            Save Changes
        </button>

    </div>
    `;
}//opens the edit form.

function saveEdit(index){
   let newTitle =
        document.getElementById("editTitle").value;

    let newDescription =
        document.getElementById("editDescription").value;

    let newDate =
        document.getElementById("editDate").value;

    if(newTitle.trim() === ""){
        alert("Task title required!");
        return;
    }

    if(newDate === ""){
        alert("Select due date!");
        return;
    }

    let today = new Date();
    let due = new Date(newDate);

    today.setHours(0,0,0,0);
    due.setHours(0,0,0,0);
     
    let diffTime = due - today;
    let differdays = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
     );

     let priority = "";
     if(differdays <= 0){
        priority = "🔴 High";
     }
     else if(differdays <= 3){
        priority = "🟡 Medium";
     }
     else {
        priority = "🟢 Low";
     }
    
     tasks[index].text = newTitle;
     tasks[index].description = newDescription;
     tasks[index].dueDate = newDate;
     tasks[index].priority = priority;

     saveTask();
     displayTask();
     showTaskDetails(index);
     updateStats();
}//updates one task in the array.

function deleteTask(index) {
    lastDeletedTask = tasks[index];
    lastDeletedIndex = index;
    tasks.splice(index, 1);
    saveTask();
    displayTask();
    showUndo();
    updateStats();
}//removes one task.

function showUndo() {

    let toast = document.getElementById("toast");
    let undoBox = document.getElementById("undoBox");

    undoBox.innerHTML = `
        Task Deleted!

        <button onclick="undoTask()" class="undobutton2">
            Undo
        </button>

        <button onclick="closeUndoBox()" class="undobutton2">
            Okay
        </button>
    `;

    toast.style.display = "block";

    undoTimer = setTimeout(() => {
        toast.style.display = "none";
        undoBox.innerHTML = "";

        lastDeletedTask = null;
        lastDeletedIndex = null;

    }, 5000);
}//show undo task form.

function closeUndoBox(){

    clearTimeout(undoTimer);

    let toast =
        document.getElementById("toast");

    let undoBox =
        document.getElementById("undoBox");

    toast.style.display = "none";

    undoBox.innerHTML = "";

    lastDeletedTask = null;
    lastDeletedIndex = null;
}//close the undo box form without undoing last tasks.

function undoTask() {

    if (lastDeletedTask !== null) {

        tasks.splice(
            lastDeletedIndex,
            0,
            lastDeletedTask
        );

        saveTask();
        displayTask();
        updateStats();

        let toast =
            document.getElementById("toast");

        let undoBox =
            document.getElementById("undoBox");

        toast.style.display = "none";
        undoBox.innerHTML = "";

        clearTimeout(undoTimer);

        lastDeletedTask = null;
        lastDeletedIndex = null;
    }
}//puts back the deleted task.


function clearAllTasks() {
    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }
    let confirmClear = confirm(
        "Are you sure you want to delete all tasks?"
    );
    if (confirmClear) {
        tasks = [];
        saveTask();
        displayTask();
        updateStats();
    }
}//removes all tasks.

function updateStats() {

    const done =
        tasks.filter(task => task.completed).length;

    const pending =
        tasks.length - done;

    document.getElementById("sTotal").textContent =
        tasks.length;

    document.getElementById("sDone").textContent =
        done;

    document.getElementById("sPending").textContent =
        pending;
}// counts total, done, and pending.
displayTask();