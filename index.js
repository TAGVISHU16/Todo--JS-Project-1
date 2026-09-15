let todos = [
    {
        id: Date.now() + 1,
        text: "Go to gym",
        isCompleted: false
    },
    {
        id: Date.now() + 2,
        text: "Revision Web Dev",
        isCompleted: false
    },
    {
        id: Date.now() + 3,
        text: "Take Class",
        isCompleted: false
    }
];

let editTodoId = null;

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const formbtn = document.querySelector("#form-btn");
const taskCount = document.querySelector("#task-count");
const completeCount = document.querySelector("#complete-count");

// 1. Form Submit Handler (Fixed Logic)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoValue = todoInput.value.trim();
    if (!todoValue) return;

    if (editTodoId) {
        // --- EDITING LOGIC ---
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                };
            }
            return todo;
        });

        // Edit Mode Reset
        editTodoId = null;
        formbtn.textContent = "Add";
    } else {
        // --- ADDING LOGIC ---
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        };
        todos.push(newTodo);
    }

    todoInput.value = "";
    renderTodo(); // Full UI Redraw
});

// 2. Render UI
function renderTodo() {
    todoList.innerHTML = "";
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

// Initial Call
renderTodo();

// 3. Create DOM Element
function addTodo(todo) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`;
    li.innerHTML = `
        <input data-id="${todo.id}" ${todo.isCompleted ? `checked` : ""} type="checkbox">
        <p class="flex-1 ${todo.isCompleted ? "line-through text-gray-400" : ""}">${todo.text}</p>
        <div class="flex gap-2">
            <button data-action="edit" data-id="${todo.id}">Edit</button>
            <button data-action="delete" data-id="${todo.id}">Delete</button>
        </div>
    `;
    todoList.append(li);

    taskCount.textContent = `TASKS (${todos.length})`
    completeCount.textContent = `COMPLETED (${todos.filter((todo) => todo.isCompleted).length})`
}

// 4. Click Events Handler (Edit, Delete, Checkbox)
todoList.addEventListener('click', (e) => {
    let li = e.target.closest('li');
    let btn = e.target.closest('button');
    let action = btn?.dataset.action;
    let id = li?.dataset?.id;
    let checkbox = e.target.closest('input[type="checkbox"]');

    if (action === "edit") {
        startEdit(id);
    }

    if (action === "delete") {
        deleteTodo(id);
    }

    if (checkbox) {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                };
            }
            return todo;
        });
        renderTodo(); // Checkbox toggle par UI update
    }
});

// 5. Delete Logic (Fixed)
function deleteTodo(id) {
    todos = todos.filter((todo) => 
        todo.id !== Number(id));
    renderTodo();
}

// 6. Start Edit Mode
function startEdit(id) {
    editTodoId = id;
    let currentTodo = todos.find((todo) => 
        todo.id === Number(id));

    if (currentTodo) {
        todoInput.value = currentTodo.text;
        formbtn.textContent = "Update";
    }
}




                            //    SOME ERROR CODE





//     let todos = [
//     {
//         id: Date.now() + 1,
//         text: "Go to gym",
//         isCompleted: false
//     },
//     {
//         id: Date.now() + 2,
//         text: "Revision Web Dev",
//         isCompleted: false
//     },
//     {
//         id: Date.now() + 3,
//         text: "Take Class",
//         isCompleted: false
//     }
// ]

// let editTodoId = null

// const todoForm = document.querySelector("#todo-form")
// const todoInput = document.querySelector("#todo-input")
// const todoList = document.querySelector("#todo-list")
// const formbtn = document.querySelector("#form-btn")

// todoForm.addEventListener(`submit`, (e) => {
//     e.preventDefault()

//     const todoValue = todoInput.value;

//     todos.push(todoValue)

//     console.log({editTodoId, todoValue});

//     if(editTodoId){
//         // editing
//         todos = todos.map((todo) => {
//             if(todo.id === Number(editTodoId)){
//                 return {
//                     ...todo,
//                     text: todoValue
//                 }
//             }
//             return todo
//         })
//     }else {
//         // adding 
//     }
//     let newTodo = {
//         id: Date.now(),
//         text: todoValue,
//         isCompleted: false
//     }
//     addTodo(newTodo)
// })

// function renderTodo() {
//     todoList.innerHTML = ""
//     todos.forEach(function (todo) {
//         addTodo(todo)
//     })
// }

// renderTodo()

// function addTodo(todo) {
//     const li = document.createElement("li")
//     // li.textContent = todo.text
//     // <li data-id="1" class="xflex gap-2 border border-slate-300 p-4 rounded-xl">
//     li.dataset.id = todo.id
//     li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`
//     li.innerHTML = `
//                     <input data-id=${todo.id} ${todo.isCompleted === true ? `checked` : ""} type="checkbox">
//                     <p class="flex-1">${todo.text}</p>
//                     <div class="flex gap-2 ">
//                         <button data-action="edit" data-id=${todo.id}>Edit</button>
//                         <button data-action="delete" data-id=${todo.id}>Delete</button>
//                     </div>
//                 </li>`
//     todoList.append(li)
// }

// todoList.addEventListener(`click`, (e) => {

//     let li = e.target.closest(`li`)
//     let btn = e.target.closest('button')
//     let action = btn?.dataset.action;
//     let id = li?.dataset?.id
//     let checkbox = e.target.closest('input[type="checkbox"]')

//     // if (action === "edit") {
//     //     console.log("editing...");
//     // }

//     if (action === "edit") {
//         startEdit(id)
//     }

//     if (action === "delete") {
//         deleteTodo(e, id)
//     }

//     if (checkbox) {
//         todos = todos.map((todo) => {
//             if (todo.id === Number(id)) {
//                 return {
//                     ...todo,
//                     isCompleted: !todo.isCompleted
//                 }
//             }
//             return todo
//         })
//         console.log(todos);
//     }
// })


// function deleteTodo(e, id) {
//     e.target.closest('li').remove()

//     todos = todos.filter((todo) => {
//         if (todo.id !== Number(id)) {
//             return todo
//         }
//     })
// }

// function startEdit(id) {

//     editTodoId = id;

//     let currentTodo = todos.find((todo) => {
//             if (todo.id === Number(id)){
//                 return todo
//             }
//         })  

//         todoInput.value = currentTodo.text
        
//         formbtn.textContent = "Update"
// }