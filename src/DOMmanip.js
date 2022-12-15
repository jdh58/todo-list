import ThickArrow from './icons/arrow-thicker.svg'
import Edit from './icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg'
import Danger from './icons/dangerous_FILL0_wght400_GRAD0_opsz48.svg'
import { format, formatDistance, formatRelative, parseISO, addDays } from 'date-fns';



// Adds the necessary event listeners on page load
export const loadEventListeners = () => {
    document.querySelector('.create')
    .addEventListener('click', newToDoForm().open);
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

    return { open, close }; 
}

export const category = () => {

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

        newArr.forEach(todo => buildToDo(todo, category));
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
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(div.cloneNode(true));
    content.querySelector(`.${category}-group > .to-do-item:last-child > div`).appendChild(div.cloneNode(true)).classList.add('check-circle');
    content.querySelector(`.${category}-group > .to-do-item:last-child > div > div`).classList.add('hidden');
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(p.cloneNode(true)).textContent = newToDo.task;
    content.querySelector(`.${category}-group > .to-do-item:last-child`).appendChild(span.cloneNode(true)).classList.add('options');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(p.cloneNode(true)).classList.add('date');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options .date`).textContent = newToDo.dueDate;
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Edit);
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'edit');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('edit');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).appendChild(img.cloneNode(true)).setAttribute('src', Danger);
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.setAttribute('alt', 'delete');
    content.querySelector(`.${category}-group > .to-do-item:last-child > .options`).lastChild.classList.add('delete');
}

