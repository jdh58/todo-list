import ThickArrow from './icons/arrow-thicker.svg'
import Edit from './icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg'
import Danger from './icons/dangerous_FILL0_wght400_GRAD0_opsz48.svg'
import { format, formatDistance, formatRelative, parseISO, addDays } from 'date-fns';
import { controller } from './index.js'


// Adds the necessary event listeners on page load
export const loadEventListeners = () => {
    document.querySelector('.create')
    .addEventListener('click', newToDoForm().open);
    document.querySelector('.create')
    .addEventListener('click', newToDoForm().newify);
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
    
        console.log(toDo)
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

export const category = () => {

    const _addToDoListeners = (toDoArr, category) => {
        document.querySelectorAll(`.delete`)
        .forEach(element => element.addEventListener('click', controller().deleteToDo.bind(null, toDoArr, category)))
        document.querySelectorAll(`.edit`)
        .forEach(element => element.addEventListener('click', newToDoForm().updateify.bind(null, toDoArr, category)))
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
        const newArr = toDoArr.filter(todo => (todo.categories.includes(category)))
        console.log(newArr);
        console.log(toDoArr);

        // Build each todo in the new array
        newArr.forEach(todo => buildToDo(todo, category));
        
        // Add the listeners to the new todos
        _addToDoListeners(toDoArr, category);
    }

    const highlight = (category) => {
        // Remove the bold from all category texts
        document.querySelectorAll(`.category > p`).forEach(element => element.classList.remove('bold'));
        // Bold the selected category text
        document.querySelector(`.${category} > p`).classList.add('bold');
    }

    return { load, highlight };
}


const buildToDo = (newToDo, category) => {
    let content = document.body;
    let div = document.createElement('div');
    let p = document.createElement('p');
    let li = document.createElement('li');
    let img = document.createElement('img');
    let span = document.createElement('span');
    
    content.querySelector(`.${category}-group`).classList.remove('hidden');
    content.querySelector(`.${category}-group`).appendChild(li.cloneNode(true)).classList.add('to-do-item');
    content.querySelector(`.${category}-group > .to-do-item:last-child`).setAttribute('data-id', newToDo.uniqueID);
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(div.cloneNode(true));
    content.querySelector(`.${category}-group > .to-do-item:last-child > div`).appendChild(div.cloneNode(true)).classList.add('check-circle');
    content.querySelector(`.${category}-group > .to-do-item:last-child > div > div`).classList.add('hidden');
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(p.cloneNode(true)).textContent = newToDo.task;
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(span.cloneNode(true)).classList.add('options');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(p.cloneNode(true)).classList.add('date');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options .date`).textContent = newToDo.date;
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Edit);
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'edit');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('edit');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Danger);
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'delete');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('delete');
    
}

