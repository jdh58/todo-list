import './styles.css';
import { loadPage } from './buildPage.js';
import * as DOMmanip from './DOMmanip.js';
/*
console.log(DOMmanip.addNewToDo);
*/
(function () {
    loadPage();
    DOMmanip.loadEventListeners();
    document.querySelector('.submit')
    .addEventListener('click', createNewToDo);
})()

const toDoItem = (task, dueDate, priority, notes, project) => {
    let completed = false;
    return { task, dueDate, priority, notes, completed, project };
}

function createNewToDo(event) {
    // Stops page from refreshing
    event.preventDefault();

    // Make the form an easy to understand variable
    let form = document.querySelector('#addNewToDo');

    // Construct the new To-do
    let newToDo = toDoItem(form.elements['task'].value,
    form.elements['date'].value, form.elements['priority'].value,
    form.elements['notes'].value, form.elements['project'].value)

    // Add this new To-do to the array that keeps track of all todos
    toDoArray().addToDo(newToDo);
    
    // Now close the overlay
    DOMmanip.newToDoForm().close();

    // Finally, display the to-do on the page
    DOMmanip.addNewToDo(newToDo);
}

const toDoArray = () => {
    const toDoArr = [];

    const addToDo = (todo) => {
        toDoArr.push(todo);
    }

    const removeToDo = (location) => {
        toDoArr = toDoArr.slice(0, location-1) + toDoArr.slice(location+1);
    }

    const updateToDo = (location, newToDo) => {
        toDoArr[location] = newToDo;
    }

    return { addToDo, removeToDo };
}