
// Adds the necessary event listeners on page load
(function() {
    document.querySelector('.create')
    .addEventListener('click', newToDoForm.open);
})()

const newToDoForm = () => {
    const open = () => {
        document.querySelector('.toDoOverlay')
        .classList.remove('hidden');
    }
    const close = () => {
        document.querySelector('.toDoOverlay')
        .classList.add('hidden');
    }

    return ( open, close ); 
}