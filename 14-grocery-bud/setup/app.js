// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
window.addEventListener('DOMContentLoaded', setupItems);
// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    if(value) {
        console.log("value is truthy");
    } else if(!value) {
        console.log("not truthy");
    }
    const id = new Date().getTime().toString();
    //if(value !== '' && editFlag === false) {
        // shortened
    if(value && !editFlag) {
        createListItem(id, value);
        displayAlert('item added to the list', 'success');
        container.classList.add('show-container');
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if(value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('Value changed successfully', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert('Please enter a value', 'danger');
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // execute function after amount of time - this case to remove class
    setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000);
}

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    container.classList.remove('show-container');
    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    };
    displayAlert('List has been cleared', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}

function deleteItem(e) { // e = event
    const element = e.currentTarget.parentElement.parentElement; // access the element
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert('Item successfully removed', 'success');
    setBackToDefault;
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    
    editElement = e.currentTarget.parentElement.previousElementSibling;

    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'Submit';
}
// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
    const itemGrocery = {id,value};
    let items = getLocalStorage();
    items.push(itemGrocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function(item) {
        if(item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item) { // map creates a new array from calling a function on every array element
        if(item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []; // ternary operator to check if items in array, if not set items to empty array
}
// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if(items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        })
        container.classList.add('show-container');
    }
};

function createListItem(id, value) {
    const element = document.createElement('article');
    element.classList.add('grocery-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr); // add it to element
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
    </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    // append child
    list.appendChild(element);
}
// localStorage.setItem("orange", JSON.stringify(["item", "item2"]));

// const oranges = JSON.parse(localStorage.getItem("orange"));

// localStorage.removeItem("orange");