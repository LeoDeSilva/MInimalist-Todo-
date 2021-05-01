let dropdown = document.getElementById("dropdown");
let input = document.getElementById("input")
let task_list = document.querySelector(".task_list")
let list_list = document.getElementById("list")
let colors = document.querySelector(".color-picker")

let PREFERENCES = {"tasks":[], "preferences":{"color-theme":"light"}}


//--------------------------LOCAL STORAGE---------------------------
function save_local(){
    localStorage.setItem("tasks", JSON.stringify(PREFERENCES))
}

function load_local(){
    return JSON.parse(localStorage.getItem("tasks"))
}


function check(e){
    if (e.classList.contains("checked")){
        e.classList.remove("checked")
        e.parentElement.childNodes[3].classList.remove("strike")
    }else{
        e.classList.add("checked")
        e.parentElement.childNodes[3].classList.add("strike")
    }
}




//--------------------------MENUS---------------------------

function toggle_class(element, remove, add){
    element.classList.remove(remove)
    element.classList.add(add)
}

function open_dropdown_menu(){
    if (dropdown.classList.contains("show")){
        toggle_class(dropdown, "show", "hide")
        toggle_class(colors, "show", "hide")
    }else{
        toggle_class(dropdown, "hide", "show")
    }
}

function data_theme(color){
    document.body.setAttribute("data-theme", color)
    PREFERENCES["preferences"]["color-theme"] = color
}

function open_colors(){
    if (colors.classList.contains("hide")){
        toggle_class(colors, "hide", "show")
    }else{
        toggle_class(colors, "show", "hide")
    }
}


function save_tasks(){
    console.log(PREFERENCES)
    PREFERENCES["tasks"] = document.getElementById("container").innerHTML
    save_local()
}

var check_enter = function (event){
    if (event.keyCode === 13){
        task_list.innerHTML += `<div class="task"> <span onclick="check(this)" class="checkbox"></span> <span>${input.value}</span> </div>` 
        input.value = ""
        update_properties()
    }
}

function update_properties(){
    tasks = document.querySelectorAll(".task")
    for (let i = 0; i < tasks.length; i++){
        tasks[i].childNodes[1].addEventListener("dblclick", function(e){
            tasks[i].remove()
        })
    }
}

function load_tasks(){
    document.getElementById("container").innerHTML = PREFERENCES["tasks"]
}

//-------------------------LOGIC------------------------

preferences = load_local()
if (preferences != null){
    PREFERENCES = preferences
    data_theme(PREFERENCES["preferences"]["color-theme"])
    load_tasks()
}

toggle_class(dropdown, "show", "hide")
input.addEventListener("keyup",check_enter)
update_properties()
setInterval(save_tasks, 500)