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