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