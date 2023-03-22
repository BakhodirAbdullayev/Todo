'use strict'


const input = document.querySelector('.todoText')
const btn = document.querySelector('.btn')
const todoList = document.querySelector('.todoList')

const editTodoText = document.querySelector('.editTodoText')
const editBtn = document.querySelector('.editBtn')
const modal = document.querySelector('.modal')
const saveModal = document.querySelector('.saveModal')
const saveEdit = document.querySelector('.ok')
const cancelEdit = document.querySelector('.cancel')


let editedItemIndex
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if(todos.length) showTodos()
function setTodos(){
    localStorage.setItem('list', JSON.stringify(todos))
}

function showTodos(){
    const getTodos = JSON.parse(localStorage.getItem('list'))
    todoList.innerHTML = ''
    getTodos.forEach((item, index)=>{
        todoList.innerHTML += `
            <div class="todoListItem">
                <div class="itemText">
                    ${item.text}
                </div>
                <div class="itemBtn">
                    <div class="itemUpdate" onclick="editTodo('${item.text}',${index})">
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <div class="itemDelete" onclick="delTodo(${index})">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>`
    })
}



function showErr(inputName, btnName){
    inputName.classList.add('todoTextErr')
    btnName.classList.add('btnErrShake', 'btnErr')
    inputName.value = ''

    setTimeout(()=>{
        btnName.classList.remove('btnErrShake')
    }, 200)
}
function delErr(inputName, btnName){
    inputName.classList.remove('todoTextErr')
    btnName.classList.remove('btnErrShake', 'btnErr')
}



btn.addEventListener('click',(e)=>{
    e.stopPropagation()
    e.preventDefault()

    if (input.value.trim() === ''){
       showErr(input, btn)
    } else{
        delErr(input, btn)
        todos.push({text: input.value.trim(), nimadir: true,})
        input.value = '';
        setTodos()
        showTodos()
    }
})

function delTodo(itemIndex){
    todos = todos.filter((item, index) => {
        return index !== itemIndex
    });
    setTodos()
    showTodos()
}

function editTodo(nimadir,itemIndex){
    openModal()
    editTodoText.value = nimadir
    editedItemIndex = itemIndex
}




editBtn.addEventListener('click', (i)=>{
    i.stopPropagation()
    i.preventDefault()

    if (editTodoText.value.trim() === ''){
        showErr(editTodoText, editBtn)
    }
    else{
        delErr(editTodoText, editBtn)
        saveModal.style.display = 'flex'
    }
})
saveEdit.addEventListener('click', (e)=>{
    e.preventDefault()
    e.stopPropagation()
    todos.splice(editedItemIndex, 1,{text: editTodoText.value.trim(), nimadir: true,})
    editTodoText.value = '';
    setTodos()
    showTodos()
    closeModal()

})
cancelEdit.addEventListener('click', ()=>{
    closeModal()
})

function openModal(){
    modal.style.display = 'flex'
}
function closeModal(){
    modal.style.display = 'none'
    saveModal.style.display = 'none'
}