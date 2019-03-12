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