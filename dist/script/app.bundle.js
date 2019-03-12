const dataAcces = (function() {
    const localStorageKey = 'TO-DONE';
     const update = (id, callbackDone, callbackUnDone) => {
         const updateTodos = getAllItems().map(todo => {
             if (todo.id === +id) {
                 todo.status = 1 - todo.status;
                 if (todo.status === 1) callbackDone();
                 else callbackUnDone();
                 return todo;
             }
             return todo;
         });
         localStorage.setItem(localStorageKey, JSON.stringify(updateTodos));
     };
    const addItem = todo => {
        let todos = getAllItems();
        const id = todos.length; // array
        todos.push({ ...todo, id }); // nieuw item toevoegen
        localStorage.setItem(localStorageKey, JSON.stringify(todos));
        return id;
    };
    const hasItem = key => {
        return getAllItems().includes(key);
    };
    const removeItem = key => {
        const index = getAllItems().indexOf(key); // waar staat het land wat weg mag
        let savedtodos = getAllItems(); // splice()
        savedtodos.splice(index, 1); //verwijder dat item in de array
        localStorage.setItem(localStorage, JSON.stringify(savedtodos));
    };
    const getAllItems = () => {
        return JSON.parse(localStorage.getItem(localStorageKey)) || [];
    };
    const countItems = () => {
        return getAllItems().length;
    };
    return {
        addItem: addItem,
        hasItem: hasItem,
        removeItem: removeItem,
        getAllItems: getAllItems,
        countItems: countItems,
        // update: update
    };

})();
class Todo {
    constructor({title, category, status}){
        Object.assign(this, {title, category, status });
    }

    generateDOMNode(id) {
        let card = document.createElement('div')
        card.classList.add('c-card');
        card.innerHTML += `<ul class="o-list c-option-list">
        <li class="c-form-field c-form-field--option c-option-list__item">`
        card.innerHTML += `<input class="o-hide c-input-option c-custom-input-option-hidden" type="checkbox" ${this.status ? 'checked="checked"' : ''} id="${id}" />`;
        let todoLabel = document.createElement('label');
        todoLabel.setAttribute('for', id);
        todoLabel.classList.add('c-label');
        todoLabel.classList.add('c-custom-input-option-label');
        todoLabel.innerHTML = `<span class="c-custom-input-option c-custom-input-option--checkbox">
        <svg class="c-custom-input-option__symbol" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 6.75">
            <path
                d="M4.75,9.5a1,1,0,0,1-.707-.293l-2.25-2.25A1,1,0,1,1,3.207,5.543L4.75,7.086,8.793,3.043a1,1,0,0,1,1.414,1.414l-4.75,4.75A1,1,0,0,1,4.75,9.5"
                transform="translate(-1.5 -2.75)" />
        </svg>
    </span>
    <div class="c-card-info">
                            <div class="c-card-info__title">
                            ${this.title}
                            </div>
                            <div class="c-card-info__category">
                            ${this.category}
                            </div>

                        </div>`;

    // combine the 2
    card.appendChild(todoLabel);
    return card;
    }
    
}
console.log('todoModule');
const todoModule = (function () {
    const addTodo = function(title, category) {
        console.log(title, category);
        const todo = new Todo({title: title, category: category});
        // data in sync houden
        const id = dataAcces.addItem(todo); // needs to be made
        console.log(id);
        //HTML tonen
        todoUI.appendTodo(
            todo.generateDOMNode(id, function() {
                console.log("you clicked", todo);
            })
        );
    };

    return {
        addTodo: addTodo
    };
})();
// Dit is een module: constante met naam, die data bijhoudt en een return
// Dit dient voor alles van DOM Interacties
const todoUI = (function() {
    let newTodo = {
        title: null,
        category: null,
        status: null
    },
        todoHolder = null,
        todoCounter = null,
        todoAddButton = null;
    
    const setupTodoApp = function({titleClass, categoryClass, statusClass, toDoHolderClass, todoCounterClass, todoAddClass}) {
        console.log(todoCounter);
        console.log(titleClass)
        newTodo.title = document.querySelector(titleClass);
        newTodo.category = document.querySelector(categoryClass);
        newTodo.status = document.querySelector(statusClass);
        todoHolder = document.querySelector(toDoHolderClass);
        todoCounter = document.querySelector(todoCounterClass);
        todoAddButton = document.querySelector(todoAddClass);

        return true
    };

    const handleNewTodo = function(callback) {
        todoAddButton.addEventListener('click', function(e){
            e.preventDefault();
            callback(newTodo.title.value, newTodo.category.value);
        });
    };

    const appendTodo = function(todoDOMNode) {
        todoHolder.append(todoDOMNode);
    };


    const fetchFromLocalStorage = function() {
        const savedTodos = dataAcces.getAllItems();
        for (const todo of savedTodos) {
            // todo: loop the saved objects
            //create a todo instance
            // add the dom-node
             this.appendTodo(new Todo({ title: todo.title, category: todo.category}))
             this.appendTodo();
        }
    };


    return {
        setupTodoApp: setupTodoApp,
        handleNewTodo: handleNewTodo,
        appendTodo: appendTodo
    };

})();
//self evocing function (start van onze app)
(function(){

    document.addEventListener('DOMContentLoaded', function() {
        if(todoUI.setupTodoApp({
            titleClass: '.js-new-title',
            categoryClass: '.js-new-category',
            toDoHolderClass: '.js-todo-items',
            todoCounterClass: '.js-todos-counter',
            todoAddClass: '.js-new-add'
        })){
            console.log("welkom");
        todoUI.handleNewTodo(function(title, category){
            // Te veel werk voor ons; moet in het model komen en ook nog in sync zijn met onze 'backend' localStorage.
            //Todo: zorg dat de todo module onderstaande waarden print
            todoModule.addTodo(title, category);
        });

        // todoUI.fetchFromLocalStorage();
    }

    
    });
    console.log("welkom1");
})();
