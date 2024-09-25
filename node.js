const itemForm = document.getElementById('item-form'); // FORM
const itemInput = document.getElementById('item-input');  // INPUT
const itemList = document.getElementById('item-list');   // UL
const button = document.querySelector('.btn-link');
const buttonClear = document.querySelector('.btn-clear');
const filter = document.getElementById('filter');
const btn = document.querySelector('.btn');
let condition = false; 


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
    if(condition) {
        let itemSelect = itemList.querySelector('.edit'); 
        itemSelect.classList.remove('edit');
        removeLocal(itemSelect.textContent); 
        itemSelect.remove();
        condition = false; 
    } else {
        if(itemAlreadyExist(text)) {
            alert('Item already Exist'); 
            itemInput.value = '';
            return;
        }
    }
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


function clearItems(e) {
    while(itemList.firstChild) {
        itemList.firstChild.remove()
    }
    localStorage.removeItem('item');
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
    if(!condition) {
        btn.innerHTML = '<i class="fa-solid fa-plus"></i>  Add Item';
        btn.style.backgroundColor = '#333';
    }
}

function removeItemLocal(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {
        if(confirm("Are you sure?")) {
            //remove from DOM
            e.target.parentElement.parentElement.remove('li');

            //remove from LocalStorage 
            removeLocal(e.target.parentElement.parentElement.textContent);
        }
        checkUI();
    } else {
        setItemToEdit(e.target)
    }
}

function itemAlreadyExist(newItem) {
    let LocalStorageArray = fromLocalStorage(); 
    return LocalStorageArray.includes(newItem);
}

function setItemToEdit(text) {
    condition = true; 

    itemList.querySelectorAll('li').forEach(i=> i.classList.remove('edit'));
        
    text.classList.add('edit'); 
    btn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update item';
    btn.style.backgroundColor = '#228B22';
    itemInput.value = text.textContent.trim();
}



function removeLocal(e) {
    let text = e; 
    let LocalStorageArray = fromLocalStorage(); 

    LocalStorageArray = LocalStorageArray.filter((item)=> {
        return item !== text;
    });
    localStorage.setItem('item', JSON.stringify(LocalStorageArray));
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


itemList.addEventListener('click', removeItemLocal);
buttonClear.addEventListener('click', clearItems);
filter.addEventListener('input', onFilter);
document.addEventListener('DOMContentLoaded', displayLocalStorge); 
itemForm.addEventListener('submit', addList); 




