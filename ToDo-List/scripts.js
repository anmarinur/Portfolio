let toDoItems = []; // Aquí se van a ir guardando los toDos cada uno en un objeto

// Clase para crear las tareas

function ToDo(tarea) {
  this.tarea = tarea;
  this.estado = false;
}


// Método para setear el estado de la tarea como true

ToDo.prototype.realizada = function() {
  this.estado = true;
}

// Función para transformar de objeto a etiquetas

function buildToDo(todo, index) {
  let toDoShell = document.createElement('div');
  toDoShell.setAttribute('class', 'toDoShell');
  let toDoText = document.createElement('span');
  toDoText.innerHTML = todo.tarea;
  toDoText.setAttribute('id', index);
  if (todo.estado) {
    toDoText.setAttribute('class', 'completedTask');
  }
  toDoShell.appendChild(toDoText);
  toDoText.addEventListener('click', completeToDo)
  return toDoShell;
}

// Función que toma cada tarea (objeto) del arreglo y lo convierte a modo etiquetas (HTML)

function buildToDos(toDos) {
  let newArray = toDos.map(buildToDo);
  return newArray;
}

// Función para mostrar las tareas en pantalla

function displayToDo() {
  let toDoContainer = document.querySelector('#toDoContainer');
  toDoContainer.innerHTML = '';
  let newContainer = buildToDos(toDoItems);
  newContainer.forEach(element => {toDoContainer.appendChild(element)});
}

// Función para crear nuevas tareas y agregarlas al arreglo

function newToDo() {
  let toDoInput = document.querySelector('#toDoInput').value;
  let newToDo = new ToDo(toDoInput);
  toDoItems.push(newToDo);
  document.querySelector('#toDoInput').value = '';
  displayToDo();
}

// Función para poner una tarea como completada

function completeToDo(event) {
  const index = event.target.id;
  toDoItems[index].realizada();
  displayToDo();
}

// Instrucción para crear la nueva tarea al dar click en el botón

document.querySelector('#addButton').addEventListener('click', newToDo);
document.querySelector('#toDoInput').addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    newToDo();
  }
});
