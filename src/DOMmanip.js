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

export const addNewToDo = (newToDo) => {
    
}


const buildHeader = (headerText) => {
    content.querySelector('main').appendChild(h2.cloneNode(true)).classList.add('to-do-header');
    content.querySelector('.to-do-header').appendChild(p.cloneNode(true)).textContent = headerText;
    content.querySelector('.to-do-header').appendChild(img.cloneNode(true)).setAttribute('src', ThickArrow);
    content.querySelector('.to-do-header > img').setAttribute('alt', 'close/expand');
}