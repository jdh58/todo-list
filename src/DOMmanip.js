import ThickArrow from './icons/arrow-thicker.svg'
import Edit from './icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg'
import Danger from './icons/dangerous_FILL0_wght400_GRAD0_opsz48.svg'
import { format, formatDistance, formatRelative, parseISO, addDays } from 'date-fns';
import { controller, categories } from './index.js'


// Adds the necessary event listeners on page load
export const loadEventListeners = () => {
    document.querySelector('.create')
    .addEventListener('click', newToDoForm().open);
    document.querySelector('.create')
    .addEventListener('click', newToDoForm().newify);

    document.querySelector('.create-project')
    .addEventListener('click', newProjectForm().wipe)
    document.querySelector('.create-project')
    .addEventListener('click', newProjectForm().open)
    // Add event listener for making new todo on submit
    document.querySelector('.project-submit')
    .addEventListener('click', categories().createNewProject);
    
}

export const newToDoForm = () => {

    const open = () => {
        document.querySelector('.to-do-overlay')
        .classList.remove('hidden');

        // Add event listener to close the overlay
        document.querySelector('.fieldset-wrapper > img')
                .addEventListener('click', close)
    }
    const close = () => {
        document.querySelector('.to-do-overlay')
        .classList.add('hidden');

        // Remove the closing event listener once the button goes offscreen
        document.querySelector('.fieldset-wrapper > img')
                .removeEventListener('click', close)
    }

    const newify = () => {
        // Replace with a clone to remove all event listeners
        let buttonClone = document.querySelector('.submit');
        document.querySelector('.submit').remove();
        document.querySelector('.fieldset-wrapper').appendChild(buttonClone.cloneNode(true))
        // Add event listener for making new todo on submit
        document.querySelector('.submit')
        .addEventListener('click', controller().createNewToDo);

        document.querySelector('.fieldset-wrapper > legend').textContent = 'Add New Task';


        // Make the form an easy to understand variable
        let form = document.querySelector('#addNewToDo');

        // Wipe the form values
        const cleanForm = (userValue) => {
            form.elements[`${userValue}`].value = null;
        }
        cleanForm('task');
        cleanForm('date');
        cleanForm('priority');
        cleanForm('notes');
        cleanForm('project');

        document.querySelector('.fieldset-wrapper > .submit').textContent = 'Submit';
    }

    const updateify = (newArr, category, event) => {
        // Replace with a clone to remove all event listeners
        let buttonClone = document.querySelector('.submit');
        document.querySelector('.submit').remove();
        document.querySelector('.fieldset-wrapper').appendChild(buttonClone.cloneNode(true))
    
        
        // Go up the event path to find uniqueID
        let removeID = event.composedPath()[2].getAttribute('data-id');
        let toDo = 0;
        
        console.log(newArr)
        console.log(removeID)
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].uniqueID == removeID) {
                // This is the todo we are going to update
                toDo = newArr[i];
                newToDoForm().open();
                // Add event listener for updating todo on submit, send in location and current category
                document.querySelector('.submit')
                .addEventListener('click', controller().updateToDo.bind(null, i, category, toDo.uniqueID));
                break;
            }
        }
        
        document.querySelector('.fieldset-wrapper > legend').textContent = 'Update Task';
    
        // Make the form an easy to understand variable
        let form = document.querySelector('#addNewToDo');
    
        const changeForm = (userValue) => {
            form.elements[`${userValue}`].value = toDo[`${userValue}`];
        }

        changeForm('task');
        changeForm('date');
        changeForm('priority');
        changeForm('notes');
        changeForm('project');

        document.querySelector('.fieldset-wrapper > .submit').textContent = 'Update';
    }

    return { open, close, newify, updateify }; 
}

export const newProjectForm = () => {

    const wipe = () => {
        // Make the form an easy to understand variable
        let form = document.querySelector('#addNewProject');

        // Wipe the form values
        const cleanForm = (userValue) => {
            form.elements[`${userValue}`].value = null;
        }
        cleanForm('name');
        cleanForm('color');

        document.querySelector('.fieldset-wrapper > .submit').textContent = 'Submit';
    }

    const open = () => {
        document.querySelector('.project-overlay')
        .classList.remove('hidden');

        // Add event listener to close the overlay
        document.querySelector('.project-overlay .fieldset-wrapper > img')
        .addEventListener('click', close)
    }
    const close = () => {
        document.querySelector('.project-overlay')
        .classList.add('hidden');

        // Remove the closing event listener once the button goes offscreen
        document.querySelector('.project-overlay .fieldset-wrapper > img')
        .removeEventListener('click', close)
    }

    return { open, close, wipe };
}

export const category = () => {

    const _completedStyles = (toDoArr, category, event) => {
        event.composedPath()[1].querySelector('.check-circle')
        .classList.add('clicked-circle')

        event.composedPath()[1].style.opacity = '0%';

        let removeToDoId = event.composedPath()[1].getAttribute('data-id');

        setTimeout(() => {
            controller().deleteToDo(toDoArr, category, removeToDoId);
        }, 1500)
    }

    const _toDoHoverStyles = (event) => {
        event.target.classList.add('hovered-todo')
        event.composedPath()[1].querySelector('.check-circle')
        .classList.add('hovered-circle')
    }
    const _removeToDoHoverStyles = (event) => {
        event.target.classList.remove('hovered-todo')
        event.composedPath()[1].querySelector('.check-circle')
        .classList.remove('hovered-circle')
    }

    const _addToDoListeners = (toDoArr, category) => {
        document.querySelectorAll(`.delete`)
        .forEach(element => element.addEventListener('click', controller().deleteToDo.bind(null, toDoArr, category)))
        document.querySelectorAll(`.edit`)
        .forEach(element => element.addEventListener('click', newToDoForm().updateify.bind(null, toDoArr, category)))

        // Styling to highlight when hovering over the todo.
        document.querySelectorAll(`.to-do-item > p`)
        .forEach(element => element.addEventListener('mouseover', _toDoHoverStyles));
        // Remove when unhovered
        document.querySelectorAll(`.to-do-item > p`)
        .forEach(element => element.addEventListener('mouseout', _removeToDoHoverStyles));

        /* When clicked for completion, stylize it going away,
        then remove from todo list. */
        document.querySelectorAll(`.to-do-item > p`)
        .forEach(element => element.addEventListener('click', _completedStyles.bind(null, toDoArr, category)));
    }

    const _unload = () => {
        // First, hide all the headers
        document.querySelectorAll('main > div')
        .forEach(element => element.classList.add('hidden'));
        // Then, remove all the todo elements.
        document.querySelectorAll('main > div > li')
        .forEach(element => element.remove());
    }

    const load = (toDoArr, category) => {
        // Unload all todos
        _unload();
        /* Create an array with only the todos that will be loaded 
        in the currently selected array */
        const newArr = toDoArr.filter(todo => (todo.categories.includes(category)));
        /* If there's no todos found with a match for the category,
        then it must be a project, so scan for those */
        if (typeof category === 'number') {
            console.log(category)
            newArr.push(...toDoArr.filter(todo => (todo.project.includes(category))))
        }
        console.log(newArr);
        console.log(toDoArr);

        // Build each todo in the new array
        newArr.forEach(todo => buildToDo(todo, category));
        
        // Add the listeners to the new todos
        _addToDoListeners(toDoArr, category);
    }

    const highlight = (category) => {
        console.log(category);
        // Remove the bold from all category texts
        document.querySelectorAll(`.category > p`).forEach(element => element.classList.remove('bold'));

        if (typeof category === 'string') {
            // Bold the selected category text
            document.querySelector(`.${category} > p`).classList.add('bold');
        } else {
            // Bold the selected project
            document.querySelector(`[data-projectnum="${category}"] > p`).classList.add('bold');
        }
    }

    const buildNewProject = (newProject) => {

        // Add the header for the main todos section
        document.querySelector('main').appendChild(document.createElement('div')).classList.add(`ID${newProject.id}-group`);
        document.querySelector(`.ID${newProject.id}-group`).classList.add('hidden');
        document.querySelector(`.ID${newProject.id}-group`).appendChild(document.createElement('h2')).classList.add('to-do-header');
        document.querySelector(`.ID${newProject.id}-group > .to-do-header:last-child`).appendChild(document.createElement('p')).textContent = newProject.name;

        // Add the category to the left side
        document.querySelector('.projects.list')
        .appendChild(document.createElement('li')).classList.add('project', 'category');

        // Give the DOM element an id so we can recognize it
        document.querySelector('.projects.list').lastChild
        .setAttribute('data-projectnum', newProject.id);

        // Make the div circle and give it the chosen color
        document.querySelector(`[data-projectnum="${newProject.id}"]`)
        .appendChild(document.createElement('div'));
        document.querySelector(`[data-projectnum="${newProject.id}"] div`)
        .style.backgroundColor = newProject.color;

        // Make the text element and name it after the project
        document.querySelector(`[data-projectnum="${newProject.id}"]`)
        .appendChild(document.createElement('p'));
        document.querySelector(`[data-projectnum="${newProject.id}"] p`)
        .textContent = newProject.name;

        // Add a new option to the todo form 
        document.querySelector(`#project`).appendChild(document.createElement('option')).setAttribute('value', newProject.id);
        document.querySelector(`#project`).lastChild.textContent = newProject.name;

        // Add event listener so it loads the proper todos when clicked
        document.querySelector(`[data-projectnum="${newProject.id}"]`)
        .addEventListener('click', categories().updateCategory.bind(null, newProject));

    }

    return { load, highlight, buildNewProject };
}


const buildToDo = (newToDo, category) => {
    let content = document.body;
    let div = document.createElement('div');
    let p = document.createElement('p');
    let li = document.createElement('li');
    let img = document.createElement('img');
    let span = document.createElement('span');
    
    content.querySelector(`.ID${category}-group`).classList.remove('hidden');
    content.querySelector(`.ID${category}-group`).appendChild(li.cloneNode(true)).classList.add('to-do-item');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child`).setAttribute('data-id', newToDo.uniqueID);
    content.querySelector(`.ID${category}-group > .to-do-item:last-child`).appendChild(div.cloneNode(true));
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > div`).appendChild(div.cloneNode(true)).classList.add('check-circle');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child`).appendChild(p.cloneNode(true)).textContent = newToDo.task;
    content.querySelector(`.ID${category}-group > .to-do-item:last-child`).appendChild(span.cloneNode(true)).classList.add('options');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).appendChild(p.cloneNode(true)).classList.add('date');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options .date`).textContent = newToDo.date;
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Edit);
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'edit');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('edit');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Danger);
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'delete');
    content.querySelector(`.ID${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('delete');
    
}

