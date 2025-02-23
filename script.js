// this is a dom access method.
const button = document.querySelector(".button");
const input = document.querySelector(".main-input");
const progressNumber = document.querySelector(".Progress-Number");
const progress = document.querySelector('.progress');

let multipleTask = document.querySelector(".multiple-task");

// This update progress function update the data of task.
const updateProgress = () => {
    let totalTask = multipleTask.children.length;
    let completedTask = document.querySelectorAll(".multiple-task input:checked").length;
    let progressPercentage = totalTask > 0 ? (completedTask / totalTask) * 100 : 0;
    progressNumber.innerText = `${completedTask} / ${totalTask}`;
    progress.style.width = `${progressPercentage}%`;
};

// This main function create a task, delete a task and edit a task.
const MainFunction = () => {
    let newTask = document.createElement("div");
    newTask.className = "task";
    newTask.style.marginTop = "30px";
    newTask.style.display = "flex";
    newTask.style.backgroundColor = "transparent";
    newTask.style.border = "rgb(72, 47, 155) solid 2px";
    newTask.style.padding = "10px";
    newTask.style.borderRadius = "20px";
    newTask.style.marginLeft = "10px";

    let newTask_input = document.createElement("input");
    newTask_input.type = "checkbox";
    newTask_input.style.width = "20px";
    newTask_input.style.height = "20px";
    newTask_input.style.marginTop = "3px";
    newTask_input.style.marginLeft = "20px";
    newTask_input.style.cursor = "pointer";
    newTask_input.style.margin = "auto";

    let newTask_paragraph = document.createElement("p");
    newTask_paragraph.style.marginLeft = "20px";
    newTask_paragraph.style.fontSize = "large";
    newTask_paragraph.style.marginTop = "3px";
    newTask_paragraph.style.width = "75% ";
    newTask_paragraph.innerText = input.value;


    let newTask_editingImage = document.createElement("img");
    newTask_editingImage.src = "./edit.png";
    newTask_editingImage.alt = "edit";
    newTask_editingImage.style.width = "25px";
    newTask_editingImage.style.height = "25px";
    newTask_editingImage.style.cursor = "pointer";
    newTask_editingImage.style.margin = "auto";
    newTask_editingImage.style.marginRight = "20px";
    newTask_editingImage.style.marginLeft = "10px";


    let newTask_deletingImage = document.createElement("img");
    newTask_deletingImage.src = "./delete.png";
    newTask_deletingImage.alt = "delete";
    newTask_deletingImage.style.width = "25px";
    newTask_deletingImage.style.height = "25px";
    newTask_deletingImage.style.cursor = "pointer";
    newTask_deletingImage.style.margin = "auto";

    newTask_input.addEventListener("change", () => {
        if (newTask_input.checked) {
            newTask_paragraph.style.textDecoration = "line-through";
            newTask_paragraph.style.textDecorationThickness = "3px";
        } else {
            newTask_paragraph.style.textDecoration = "none";
        }
        updateProgress(); 
    })

    newTask_deletingImage.addEventListener("click", function () {
        newTask.remove(); // Removes the task
        updateProgress();
    });

    newTask_editingImage.addEventListener("click", function () {
        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = newTask_paragraph.innerText;
        editInput.style.width = "70%";
        editInput.style.fontSize = "large";
        editInput.style.marginLeft = "20px";
        editInput.style.padding = "5px";

        newTask.replaceChild(editInput, newTask_paragraph); // Replace paragraph with input field

        editInput.focus(); // Automatically focus on the input field

        // Save changes when user presses Enter
        editInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                newTask_paragraph.innerText = editInput.value; 
                newTask.replaceChild(newTask_paragraph, editInput); // Replace input field back to paragraph
            }
        });
    });


    newTask.appendChild(newTask_input);
    newTask.appendChild(newTask_paragraph);
    newTask.appendChild(newTask_editingImage);
    newTask.appendChild(newTask_deletingImage);

    multipleTask.prepend(newTask);

    updateProgress();

}


//this is the addeventListener of mainFunction.
button.addEventListener('click', () => {
    if (input.value) {
        MainFunction();
        input.value = '';
    } else {
        alert('Please enter a task');
    }
})


