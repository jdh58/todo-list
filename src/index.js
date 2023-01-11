import './styles.css';
import { loadPage } from './buildPage.js';
import * as DOMmanip from './DOMmanip.js';
import { format, formatDistance, formatRelative, parseISO, addDays } from 'date-fns';
import * as storage from './storage.js';

const toDoItem = (task, date, priority, notes, project, uniqueID) => {
    let categories = [];
    return { task, date, priority, notes, project, categories, uniqueID };
}

// Define uniqueID as 1
let uniqueID = 1;

// define the todo array
let toDoArr = [];

// Define projectID as 1
let projectID = 1;

// define the projects array
let projectArr = [];


export const controller = () => {

    const createNewToDo = (event) => {

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
        form.elements['notes'].value, form.elements['project'].value,
        uniqueID)
        
        // Iterate unique ID so the next todo doesnt get the same number
        uniqueID++;
    
        // Add this new To-do to the array that keeps track of all todos
        toDoArray().addToDo(toDoArr, newToDo);
        
        // Now close the overlay
        DOMmanip.newToDoForm().close();
    
        // Set the categories for the todo
        categories().setCategories(newToDo);
    
        // Finally, reload the selected category
        DOMmanip.category().load(toDoArr, category);

        storage.updateStorage(toDoArr, projectArr);
    }

    const updateToDo = (location, category, sameID, event) => {
        // Stops page from refreshing
        event.preventDefault();

        // Now close the overlay
        DOMmanip.newToDoForm().close();

        // Make the form an easy to understand variable
        let form = document.querySelector('#addNewToDo');
        
        // Make a new todo with the updated values
        let newToDo = toDoItem(
            form.elements['task'].value,
            form.elements['date'].value,
            form.elements['priority'].value,
            form.elements['notes'].value,
            form.elements['project'].value,
            sameID)
        
        // Set the categories for the todo
        categories().setCategories(newToDo);
        
        // Set the old todo equal to the new one.
        toDoArr[location] = newToDo;
        
        // Load the current category
        DOMmanip.category().load(toDoArr, category)

        storage.updateStorage(toDoArr, projectArr);
    }

    const deleteToDo = (newArr, category, event) => {
        
        // Initialize removeID so the if-else can configure it
        let removeID = 0

        if (typeof event == 'string') {
            removeID = event;
        } else {
            // Go up the event path to find uniqueID
            removeID = event.composedPath()[2].getAttribute('data-id');
        }

        console.log(removeID)

        console.log(newArr)
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].uniqueID == removeID) {
                newArr = toDoArray().unaddToDo(newArr, i);
                break;
            }
        }
    
        toDoArr = newArr;
    
        DOMmanip.category().load(toDoArr, category);

        storage.updateStorage(toDoArr, projectArr);
    }

    return { createNewToDo, updateToDo, deleteToDo }
}

const toDoArray = () => {

    const addToDo = (toDoArr, todo) => {
        toDoArr.push(todo);
    }

    const unaddToDo = (newArr, location) => {
        // Cut out the selected todo
        newArr = toDoArr.slice(0, location);
        newArr.push(...toDoArr.slice(location+1));
        return newArr;
    }

    const viewToDo = () => {
        return toDoArr;
    }

    const overwriteToDo = (location, newToDo) => {
        toDoArr[location] = newToDo;
    }

    return { addToDo, viewToDo, unaddToDo, overwriteToDo };
}

export const categories = () => {

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
        // Wipe the categories so we don't repeat them
        newToDo.categories = [];
        // Make the current date comparable with the due date format
        let currentDate = format(new Date(), 'yyyy-MM-dd');
        // Every todo will be in the all category
        newToDo.categories.push('inbox');

        // Decide which categories there will be for this todo
        if (newToDo.date < currentDate) {
            newToDo.categories.push('pastdue');
        } if (newToDo.date > currentDate && newToDo.date <= addDays(parseISO(currentDate), 7)) {
            newToDo.categories.push('thisweek');
        } if (newToDo.date == currentDate) {
            newToDo.categories.push('today');
        } if (newToDo.priority == 'high') {
            newToDo.categories.push('highpriority');
        }
    }

    const updateCategory = (project, event) => {
        // Set category equal to the text content of the clicked item
        let category = findCategory(event.target.textContent);

        /* If a project was clicked instead of a category set category 
        equal to the project's ID so the functions can identify it. */
        if (project != null) {
            category = project.id;
        }
        console.log(typeof category)
        console.log(project)
        
        DOMmanip.category().highlight(category);
        DOMmanip.category().load(toDoArr, category);
    }

    const createNewProject = (event) => {
        // Stop the page from refreshing
        event.preventDefault();

        console.log(projectID)
        console.log(projectArr)

        // Make the form an easy to understand variable
        let form = document.querySelector('#addNewProject');

        let newProject = { 
            name: form.elements['name'].value,
            color: form.elements['color'].value,
            id: projectID,
        };

        // Iterate projectID so the next project doesn't have the same one
        projectID++;
        
        // Put the new project into the array
        projectArr.push(newProject);
        console.log(projectArr)

        // Build the project's category label and the form option
        DOMmanip.category().buildNewProject(newProject);

        // Close the form 
        DOMmanip.newProjectForm().close();

        storage.updateStorage(toDoArr, projectArr);

        console.log(projectArr)
    }

    const loadStoredItems = (toDoArr, projectArr) => {

        /* We don't store categories becuase we can find them at
        any time, so re-add them now. */
        toDoArr.forEach(todo => setCategories(todo))

        // Load the todos in the inbox category
        DOMmanip.category().load(toDoArr, 'inbox');

        // Build each project in the DOM
        projectArr.forEach(project => DOMmanip.category().buildNewProject(project))
    }
    

    return { updateCategory, findCategory, setCategories, createNewProject, loadStoredItems }
}

(function () {
    loadPage();
    DOMmanip.loadEventListeners();
    
    // add an event listener to all the category elements to update the variable
    // Bind the null so the event is the second variable and the function can work with the projects too
    document.querySelectorAll('.category')
    .forEach(element => element.addEventListener('click', categories().updateCategory.bind(null, null)))


    // Now for the storage implementation
    let storedValues = storage.convertStorage()

    // Set the todo and project arrays equal to their stored values
    toDoArr = storedValues[0];
    projectArr = storedValues[1];


    console.log(projectArr)
    if (toDoArr.length >= 1 || projectArr.length >= 1) {
        categories().loadStoredItems(toDoArr, projectArr);
    }
    console.log(projectArr)
    console.log(projectArr[projectArr.length-1].id)

    /* Update the IDs so they dont go back to 1 and overlap with
    stored todos or projects. Use the latest stored one + 1.*/
    if (toDoArr.length >= 1) {
        uniqueID = toDoArr[toDoArr.length-1].uniqueID + 1;
    }
    if (projectArr.length >= 1) {
        projectID = projectArr[projectArr.length-1].id + 1;
    }

})()