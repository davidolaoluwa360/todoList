import {Todo} from "../todo.js";

class TodoRepository extends Todo{
    addTodo(){
        const form = document.querySelector("form");
        const todoTree = document.createElement("div");
        todoTree.setAttribute("class", "task-tree");
        const todo = `
        <div class="form-group">
            <input type="checkbox" name="list" id="${this.key}">
            <label contenteditable="true" class="${this.key}">${this.title}</label>
            <div class="taskManagerBtnWrapper">
                <span class="updatetask btn" title="update"><i class="fas fa-pen-square"></i></span>
                <span class="deletetask btn" title="delete"><i class="far fa-times-circle"></i></span>
            </div>
        </div>
        `
        todoTree.innerHTML = todo;
        form.appendChild(todoTree);

        // Saving the Todo Task to the localstorage
        this.saveTodo(this.key, this.title);

        // Binding an event listener on the task's
        const updatetask = todoTree.querySelector(".updatetask");
        updatetask.addEventListener("click", () => {
            const key = updatetask.parentNode.parentNode.querySelector("label").className;
            const title = updatetask.parentNode.parentNode.querySelector("label").innerHTML;
            // Here the updated task is been saved to the localstorage
            this.updateTodo(key, title);
        });

        // The event listener below delete the task from the localstorage and also remove it from the node tree
        const deletetask = todoTree.querySelector(".deletetask");
        deletetask.addEventListener('click', () => {
            const key = deletetask.parentNode.parentNode.querySelector("label").className;
            this.deleteTask(key);
            deletetask.parentNode.parentNode.remove();
        });

        // The event listener below mark the task list once completed
        const completetask = todoTree.querySelector("input[type='checkbox']");
        completetask.addEventListener("click", () => {
            const title = todoTree.querySelector("label");
            this.completed(title, completetask);
        });
    }

    updateTodo(key, title){
        this.saveTodo(key, title);
    }

    saveTodo(key, title){
        localStorage.setItem(key, title);
    }

    completed(title, completetaskinput){
        if(completetaskinput.checked){
            title.style.setProperty("text-decoration", "line-through");
        }
        else{
            title.style.setProperty("text-decoration", "none");
        }
    }

    deleteTask(key){
        localStorage.removeItem(key);
    }
}

export {TodoRepository}