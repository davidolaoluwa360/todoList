"use strict";
import {TodoRepository} from "./repo/index.js";

Object.defineProperty(Array.prototype, "last", {
    get(){
        return this[this.length - 1];
    }
});

const taskbtn = document.querySelector("#task-btn");
const task = document.querySelector("#task");
let key = 1;
taskbtn.addEventListener("click", (event) => {
    if(task.value.trim().length === 0){
        alert("Task field must not be empty");
    }
    else{
        const todo = new TodoRepository(task.value, key);
        todo.addTodo();
        key++;
        task.value = "";
    }
    event.preventDefault();
});

// Load existing data from localstorage once the page load
const taskData = Object.keys(localStorage);

if(taskData.length > 0){
    const lastKey = Number.parseInt(taskData.last);
    key = lastKey + 1;
    taskData.forEach((elem, index) => {
        const todo = new TodoRepository(localStorage.getItem(elem), taskData[index]);
        todo.addTodo();
    });
}
