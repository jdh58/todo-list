import './styles.css';
import { loadPage } from './buildPage.js';
/*
console.log(DOMmanip.addNewToDo);
*/
(function () {
    loadPage();
    //document.querySelector('.submit')
    //.addEventListener('click', createNewToDo);
})()/*

const toDoItem = (task, dueDate, priority, notes, project) => {
    let completed = false;
    return { task, dueDate, priority, notes, completed, project };
}

function createNewToDo(event) {
    // Stops page from refreshing
    event.preventDefault();

    toDoForm = document.getElementById('addToDoForm');

    newToDo = toDoItem ( toDoForm.task, toDoForm.dueDate, toDoForm.priority,
        toDoForm.notes, toDoForm.completed, toDoForm.project );

    toDoArray.addToDo(newToDo);
    DOMmanip.addNewToDo(newToDo);
    toDoForm.reset();
    DOMmanip.newToDoForm.close();
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
}*/