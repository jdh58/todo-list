// Adds the necessary event listeners on page load
(function() {
    document.querySelector('.create')
    .addEventListener('click', newToDoForm.open);
})()

export const newToDoForm = () => {
    const open = () => {
        document.querySelector('.to-do-overlay')
        .classList.remove('hidden');
    }
    const close = () => {
        document.querySelector('.to-do-overlay')
        .classList.add('hidden');
    }

    return ( open, close ); 
}

export const addNewToDo = () => {
    return "fsafas";
}