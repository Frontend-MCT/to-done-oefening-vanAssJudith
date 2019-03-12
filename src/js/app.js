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
