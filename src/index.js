import './styles.css';
import { loadPage } from './buildPage.js';
import * as DOMmanip from './DOMmanip.js';
import { format, formatDistance, formatRelative, parseISO, addDays } from 'date-fns';

const toDoItem = (task, dueDate, priority, notes, project) => {
    let completed = false;
    let categories = [];
    return { task, dueDate, priority, notes, project, completed, categories };
}

function createNewToDo(toDoArr, event) {

    // Stops page from refreshing
    event.preventDefault();

    /* Set category equal to whatever category header is 
    bold since that's what's selected */
    let category = categories().findCategory
    (document.querySelector('.category > .bold').textContent) 


    // Make the form an easy to understand variable
    let form = document.querySelector('#addNewToDo');

    // Construct the new To-do
    let newToDo = toDoItem(form.elements['task'].value,
    form.elements['date'].value, form.elements['priority'].value,
    form.elements['notes'].value, form.elements['project'].value)

    // Add this new To-do to the array that keeps track of all todos
    toDoArray(toDoArr).addToDo(newToDo);
    
    // Now close the overlay
    DOMmanip.newToDoForm().close();

    // Set the categories for the todo
    categories().setCategories(newToDo);

    // Finally, reload the selected category
    DOMmanip.category().load(toDoArr, category);
}

const toDoArray = (toDoArr) => {

    const addToDo = (todo) => {
        toDoArr.push(todo);
        console.log(toDoArr)
    }

    const removeToDo = (location) => {
        // Cut out the desired todo spot
        toDoArr = toDoArr.slice(0, location-1) + toDoArr.slice(location+1);
    }

    const viewToDo = (todo) => {
        return toDoArr;
    }

    const updateToDo = (location, newToDo) => {
        toDoArr[location] = newToDo;
    }

    return { addToDo, viewToDo, removeToDo, updateToDo };
}

const categories = () => {

    const findCategory = (catText) => {
        // Make it lowercase and remove the space to line up with the html
        let category = catText.toLowerCase();
        for (let i = 0; i < category.length; i++) {
            if (category[i] === ' ') {
                category = category.slice(0, i) + category.slice(i+1)
            }
        }
        return category;
    }

    const setCategories = (newToDo) => {
        // Make the current date comparable with the due date format
        let currentDate = format(new Date(), 'yyyy-MM-dd');
        // Every todo will be in the all category
        newToDo.categories.push('inbox');

        // Decide which categories there will be for this todo
        if (newToDo.dueDate < currentDate) {
            newToDo.categories.push('pastdue');
        } if (newToDo.dueDate > currentDate && newToDo.dueDate <= addDays(parseISO(currentDate), 7)) {
            newToDo.categories.push('thisweek');
        } if (newToDo.dueDate == currentDate) {
            newToDo.categories.push('today');
        } if (newToDo.priority == 'high') {
            newToDo.categories.push('highpriority');
        }
    }

    const updateCategory = (toDoArr, event) => {

        // Set category equal to the text content of the clicked item
        let category = findCategory(event.target.textContent);
        
        DOMmanip.category().highlight(category);
        DOMmanip.category().load(toDoArr, category);
    }

    

    return { updateCategory, findCategory, setCategories }
}

(function () {
    loadPage();
    DOMmanip.loadEventListeners();

    // define the todo array
    const toDoArr = [];

    // add an event listener to all the cateGory elements to update the variable
    document.querySelectorAll('.category')
    .forEach(element => element.addEventListener('click', categories().updateCategory.bind(null, toDoArr)))
    // when a form is submitted, create and add the todo.
    document.querySelector('.submit')
    .addEventListener('click', createNewToDo.bind(null, toDoArr));
})()