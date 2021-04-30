let dropdown = document.getElementById("dropdown");
let input = document.getElementById("input")
let task_list = document.querySelector(".task_list")
let list_list = document.getElementById("list")
let colors = document.querySelector(".color-picker")
let LISTS = {"lists":[], "preferences":{"color-theme":"light"}}
let INDEX = 0


//--------------------------LOCAL STORAGE---------------------------
function save_local(){
    localStorage.setItem("lists", JSON.stringify(LISTS))
    localStorage.setItem("index", INDEX)
}

function load_local(){
    return JSON.parse(localStorage.getItem("lists"))
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

function log(){
    console.log("LOG")
}



//--------------------------MENUS---------------------------
function open_nav() {
  document.getElementById("sidenav").style.width = "45vh";
  update_list()
}

function close_nav() {
  document.getElementById("sidenav").style.width = "0";
}

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
    LISTS["preferences"]["color-theme"] = color
}

function open_colors(){
    if (colors.classList.contains("hide")){
        toggle_class(colors, "hide", "show")
    }else{
        toggle_class(colors, "show", "hide")
    }
}

function handle_click(){
    $(window).click(function() {
        toggle_class(dropdown, "show", "hide")
    });

    $('#dropdown').click(function(event){
    event.stopPropagation();
    });
    $('#profile').click(function(event){
    event.stopPropagation();
    });
    $('#open_preview').click(function(event){
    event.stopPropagation();
    });
}

function save_list(lists){
    content = document.getElementById("container").innerHTML
    title = document.getElementById("title").innerHTML
    lists[INDEX] = {"title":title, "content":content}
}

var check_enter = function (event){
    if (event.keyCode === 13){
        task_list.innerHTML += `<div class="task"> <span onclick="check(this)" class="checkbox"></span> <span>${input.value}</span> </div>` 
        input.value = ""
        update_properties()
    }
}

function update_properties(){
    document.getElementById("input").removeEventListener("keyup", check_enter)
    document.getElementById("input").addEventListener("keyup", check_enter)
    input = document.getElementById("input")
    task_list = document.querySelector(".task_list")
    tasks = document.querySelectorAll(".task")
    for (let i = 0; i < tasks.length; i++){
        tasks[i].childNodes[1].addEventListener("dblclick", function(e){
            tasks[i].remove()
        })
    }
}

function open_list(i){
    INDEX = i
    container = document.getElementById("container")
    container.innerHTML = LISTS["lists"][i]["content"]
    update_properties() 
    close_nav()
}

function add_list(){
    LISTS["lists"].push({"title":"UNTITLED", "content":`<h1 id="title" contenteditable="true" spellcheck="false">UNTITLED</h1> <input id="input" spellcheck="false" class="input" type="text" placeholder="New Task..."><div class="task_list"></div>`})
    update_list()
    
}

function update_list(){
    list_list.innerHTML = ""
    for (let i = 0; i < LISTS["lists"].length; i++){
        list_list.innerHTML += `<span onclick="open_list(${i})" class="note">${LISTS["lists"][i]["title"]}</span>`
    }
}

//-------------------------LOGIC------------------------

toggle_class(dropdown, "show", "hide")
input.addEventListener("keyup",check_enter)

//handle_click()
update_properties()

setInterval(function(){
    save_list(LISTS["lists"])
}, 500)