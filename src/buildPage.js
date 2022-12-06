import PlusButton from './icons/add_circle_FILL0_wght400_GRAD0_opsz48.svg'
import ThickArrow from './icons/arrow-thicker.svg'
import Arrow from './icons/arrow_back_ios_new_FILL0_wght400_GRAD0_opsz48.svg'
import Close from './icons/close_FILL0_wght400_GRAD0_opsz48.svg'
import Danger from './icons/dangerous_FILL0_wght400_GRAD0_opsz48.svg'
import DateRange from './icons/date_range_FILL0_wght400_GRAD0_opsz48.svg'
import Edit from './icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg'
// import Event from './icons/.svg'
import Inbox from './icons/inbox_FILL0_wght400_GRAD0_opsz48.svg'
import HighPriority from './icons/priority_high_FILL0_wght400_GRAD0_opsz48.svg'
import Sunny from './icons/sunny_FILL0_wght400_GRAD0_opsz48.svg'


export const loadPage = () => {

    let content = document.body;
    let div = document.createElement('div');
    let p = document.createElement('p');
    let li = document.createElement('li');
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let span = document.createElement('span');
    let button = document.createElement('button');

    content.appendChild(document.createElement('header'));
    content.querySelector('header').appendChild(div.cloneNode(true)).classList.add('categories-header');
    content.querySelector('.categories-header').appendChild(h2.cloneNode(true)).classList.add('header');
    content.querySelector('header h2').textContent = 'Categories';
    content.querySelector('.categories-header').appendChild(img.cloneNode(true)).setAttribute('src', Arrow);
    
    content.querySelector('header').appendChild(div.cloneNode(true)).classList.add('todo-header');
    content.querySelector('.todo-header').appendChild(document.createElement('h1')).classList.add('header');
    content.querySelector('header h1').textContent = 'To-Do List';
    content.querySelector('.todo-header').appendChild(img.cloneNode(true)).setAttribute('src', PlusButton);
    content.querySelector('.todo-header img').classList.add('create');
    content.querySelector('.todo-header img').setAttribute('alt', "add new to-do button");

    //now onto nav
    content.appendChild(document.createElement('nav'));
    content.querySelector('nav').appendChild(document.createElement('ul'));
    let navUl = content.querySelector('nav > ul');
    navUl.classList.add('categories', 'list')
    const addCat = (icon, title) => {
        navUl.appendChild(li.cloneNode(true)).classList.add('category');
        navUl.lastChild.appendChild(img.cloneNode(true)).setAttribute('src', icon)
        navUl.lastChild.appendChild(p.cloneNode(true)).textContent = title;
    }
    addCat(Inbox, 'All');
    addCat(Sunny, 'Today');
    addCat(Danger, 'Past Due');
    addCat(DateRange, 'This Week');
    addCat(HighPriority, 'High Priority');
    
    navUl.appendChild(li.cloneNode(true)).classList.add('projects-header', 'category');
    navUl.lastChild.appendChild(img.cloneNode(true)).setAttribute('src', ThickArrow)
    navUl.lastChild.appendChild(p.cloneNode(true)).textContent = 'Projects';
    content.querySelector('nav').appendChild(document.createElement('ul')).classList.add('projects', 'list');
    content.querySelector('.projects.list').appendChild(li.cloneNode(true));
    /* remove this when for real */ content.querySelector('.projects.list > li').setAttribute('data-projectnum', '1');
    content.querySelector('.projects.list > li').classList.add('project', 'category');
    content.querySelector('.projects.list > li').appendChild(div.cloneNode(true));
    content.querySelector('.projects.list > li').appendChild(p.cloneNode(true)).textContent = 'Boobies';

    content.appendChild(document.createElement('main'));
    content.querySelector('main').appendChild(h2.cloneNode(true)).classList.add('to-do-header');
    content.querySelector('.to-do-header').appendChild(p.cloneNode(true)).textContent = 'Past Due'
    content.querySelector('.to-do-header').appendChild(img.cloneNode(true)).setAttribute('src', ThickArrow);
    content.querySelector('.to-do-header > img').setAttribute('alt', 'close/expand');
    content.querySelector('main').appendChild(li.cloneNode(true)).classList.add('to-do-item');
    content.querySelector('.to-do-item').appendChild(div.cloneNode(true));
    content.querySelector('.to-do-item > div').appendChild(div.cloneNode(true)).classList.add('check-circle');
    content.querySelector('.to-do-item').appendChild(p.cloneNode(true)).textContent = 'Find god';
    content.querySelector('.to-do-item').appendChild(span.cloneNode(true)).classList.add('options');
    content.querySelector('.options').appendChild(p.cloneNode(true)).classList.add('date');
    content.querySelector('.options .date').textContent = '07-18-2022';
    content.querySelector('.options').appendChild(img.cloneNode(true)).setAttribute('src', Edit);
    content.querySelector('.options').lastChild.setAttribute('alt', 'edit');
    content.querySelector('.options').appendChild(img.cloneNode(true)).setAttribute('src', Danger);
    content.querySelector('.options').lastChild.setAttribute('alt', 'delete');

    // now for overlay
    content.appendChild(document.createElement('form')).classList.add('to-do-overlay', 'hidden');
    content.querySelector('form').setAttribute('id', 'addNewToDo');
    content.querySelector('form').setAttribute('action', '');
    content.querySelector('form').appendChild(document.createElement('fieldset'));
    content.querySelector('fieldset').appendChild(div.cloneNode(true)).classList.add('fieldset-wrapper');
    content.querySelector('.fieldset-wrapper').appendChild(img.cloneNode(true)).setAttribute('src', Close);
    content.querySelector('.fieldset-wrapper').appendChild(document.createElement('legend')).textContent = 'Add New Task';

    const newForm = (type, formType, placeholder) => {
        content.querySelector('.fieldset-wrapper').appendChild(div.cloneNode(true)).classList.add(`${type}-form`);
        content.querySelector(`.${type}-form`).appendChild(document.createElement('label')).setAttribute('for', `${type}`);
        content.querySelector(`.${type}-form > label`).textContent = type[0].toUpperCase() + type.slice(1);


        if (formType == 'input') {
            content.querySelector(`.${type}-form`).appendChild(document.createElement('input')).setAttribute('id', `${type}`);
            content.querySelector(`#${type}`).setAttribute('name', `${type}`);
            content.querySelector(`#${type}`).setAttribute('type', `${type}`);
            content.querySelector(`#${type}`).setAttribute('placeholder', `${placeholder}`);
        } else if (formType == 'select') {
            content.querySelector(`.${type}-form`).appendChild(document.createElement('select')).setAttribute('id', `${type}`);
            content.querySelector(`#${type}`).setAttribute('name', `${type}`)
        } else if (formType == 'textarea') {
            content.querySelector(`.${type}-form`).appendChild(document.createElement('textarea')).setAttribute('id', `${type}`);
            content.querySelector(`#${type}`).setAttribute('name', `${type}`);
            content.querySelector(`#${type}`).setAttribute('type', `${type}`);
            content.querySelector(`#${type}`).setAttribute('placeholder', `${placeholder}`);
        }


    }

    function addOptions(type) {
        let option = document.createElement('option');
        for (let i = 1; i < arguments.length; i++) {
            content.querySelector(`#${type}`).appendChild(option.cloneNode(true)).setAttribute('value', `${arguments[i]}`);
            content.querySelector(`#${type}`).lastChild.textContent = arguments[i][0].toUpperCase() + arguments[i].slice(1);
        }
    }

    newForm('task', 'input', 'Wash the dishes');
    newForm('date', 'input');
    newForm('priority', 'select');
    addOptions('priority', 'low', 'normal', 'high');
    newForm('notes', 'textarea', 'Use the green sponge...')
    newForm('project', 'select')
    addOptions('project', 'boobies')

    content.querySelector('.fieldset-wrapper').appendChild(button.cloneNode(true)).classList.add('submit');
    content.querySelector('.submit').setAttribute('type', 'submit');
    content.querySelector('.submit').textContent = 'Submit';
}

// maybe next time make a function where i only have to give the queryselector and what i want to add to append a child.