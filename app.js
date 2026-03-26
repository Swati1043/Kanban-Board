const title = document.getElementById("ip1");
const desc = document.getElementById("ip2");
const myBtn = document.getElementById("btn");
const pendingWork = document.getElementById("pending-content");
const workingContinue = document.getElementById("working-content");
const workDone = document.getElementById("done-content");

// saare card ek array me
const columns = [pendingWork, workingContinue, workDone];

// Function to add task
function addTask() {
    if(title.value.trim()==="" || desc.value.trim()===""){
        alert("Please fill both fields");
        return;
    }

    const div = document.createElement("div");
    div.classList.add("task-card");
    div.draggable = true;


    // unique id
    div.id = "task" + Date.now();

    const head4 = document.createElement("h4");
    head4.innerText = title.value;

    const head6 = document.createElement("h6");
    head6.innerText = desc.value;
    
    const date  = new Date();
    let currDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
    const dateContainer = document.createElement("span");
    dateContainer.innerText = currDate;

    div.append(head4, head6, dateContainer);
    pendingWork.append(div);

    // clear input
    title.value = "";
    desc.value = "";


    div.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData("start",e.target.id);
    })
}

// Button click event
myBtn.addEventListener("click", addTask);

// Enter key press event for both inputs
title.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

desc.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Loop for drag & drop
columns.forEach((column) => {

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("start");
        column.append(document.getElementById(data));
    });

});
