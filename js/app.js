function bindEvents(todoItem) {
  const checkbox = todoItem.querySelector('.checkbox') // Получить доступ к полю по его классу
  const editButton = todoItem.querySelector('button.edit')
  const deleteButton = todoItem.querySelector('button.delete')

  checkbox.addEventListener('change', toggleTodoItem); // Подключаем событие к чекбоксу, при изменении включаем функцию
  editButton.addEventListener('click', editTodoItem);
  deleteButton.addEventListener('click', deleteTodoItem);
}

function createTodoItem(title) {
  const checkbox = document.createElement('input');
  // createElement - создание нового элемента с тегом
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';

  const label = document.createElement('label');
  label.innerText = title;
  label.className = 'title';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'textfield';

  const editButton = document.createElement('button');
  editButton.innerText = 'Изменить';
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Удалить';
  deleteButton.className = 'delete';

  const listItem = document.createElement('li');
  listItem.className = 'todo-item';

  listItem.appendChild(checkbox); // Добавить к ребенку
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  bindEvents(listItem);

  return listItem;
}

function addTodoItem(event) {
  event.preventDefault();
  // Останавливает отправку данных на сервер, чтобы страница не перезагружалась
  if (addInput.value === '') return alert('Необходимо ввести название задачи'); //если значения нет

  const todoItem = createTodoItem(addInput.value);
  todoList.appendChild(todoItem);
  addInput.value = '';
}

function toggleTodoItem(){
  const listItem = this.parentNode; //Получаем доступ к родительскому элементу
  listItem.classList.toggle('completed'); // Получаем доступ ко всем классам и добавляем класс completed
}
function editTodoItem(){
  const listItem = this.parentNode;
  const title = listItem.querySelector('.title');
  const editInput = listItem.querySelector('.textfield');
  const isEditing = listItem.classList.contains('editing'); // Проверяем есть ли опр класс у элемента

  listItem.classList.toggle('editing'); // Добавляем класс editing

  if (isEditing) {
    title.innerText = editInput.value; // Если в режиме редактирования
    this.innerText = "Изменить"; // Поменять текст кнопки
  } else {
    editInput.value = title.innerText;
    this.innerText = "Сохранить";
  }
}
function deleteTodoItem(){
  const listItem = this.parentNode;
  todoList.removeChild(listItem);
}

const todoList = document.getElementById('todo-list'); // const - неизменяемая переменная
const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoItems = document.querySelectorAll('.todo-item'); // выводит массив

function main() {
  todoForm.addEventListener('submit', addTodoItem);
  // Метод addEventListener позволяет добавлять несколько обработчиков на одно событие одного элемента
  todoItems.forEach(item => bindEvents(item)); // item - очередной элемент массива
}

main();
