const itemForm = document.getElementById('item-form'); // FORM
const itemInput = document.getElementById('item-input');  // INPUT
const itemList = document.getElementById('item-list');   // UL
const button = document.querySelector('.btn-link');
const buttonClear = document.querySelector('.btn-clear');
const filter = document.getElementById('filter');



checkUI();

function displayLocalStorge(e) {
    e.preventDefault(); 
    const local = fromLocalStorage();
    local.forEach(item => createLiDOM(item))
    checkUI();
}



function addList(e) {
    e.preventDefault(); 

    const inputText = itemInput.value; 

    if(inputText === '' ) {
        alert("Enter the text pleace");
        return;
    }
    let text = itemInput.value; 

    // Add LocalStorage 
    LocalStorageData(text);
    createLiDOM(text)

    itemList.value = '';
    checkUI();
}



function createLiDOM(text) {
    const li = document.createElement('LI'); 
    li.textContent = text;
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button); 
    itemInput.value = '';
    itemList.appendChild(li);
}



function LocalStorageData(text) {
    let LocalStorageArray = fromLocalStorage(); 

    LocalStorageArray.push(text); 
    localStorage.setItem('item', JSON.stringify(LocalStorageArray));
}

function fromLocalStorage() {
    let LocalStorageArray; 
    if(localStorage.getItem('item') == null ) {
        LocalStorageArray = [];
    } else {
        LocalStorageArray = JSON.parse(localStorage.getItem('item'));
    }
    return LocalStorageArray; 
}


function createButton(classes) {
    const button = document.createElement('button'); 
    button.className = classes;
    const icon = document.createElement('i'); 
    icon.className = 'fa-solid fa-xmark';
    button.appendChild(icon);
    return button;
}




function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove('li');

        }
        checkUI();
    }
}



function clearItems(e) {
    while(itemList.firstChild) {
        itemList.firstChild.remove()
    }
    checkUI();
}


function checkUI() {
    const lists = itemList.querySelectorAll('li'); 
    if(lists.length ===0) {
        buttonClear.style.display = "none"; 
        filter.style.display = "none";
    } else {
        buttonClear.style.display = "block"; 
        filter.style.display = "block";
    }
}

function onFilter(e) {
    const LiItems = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase(); 

    LiItems.forEach((item)=> {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();

        if(itemName.indexOf(text) != -1 ) {
            item.style.display = "flex"; 
        } else {
            item.style.display = "none";
        }
    })
}


itemList.addEventListener('click', removeItem);
buttonClear.addEventListener('click', clearItems);
filter.addEventListener('input', onFilter);
document.addEventListener('DOMContentLoaded', displayLocalStorge); 
itemForm.addEventListener('submit', addList); 

