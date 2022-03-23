// referencias al html

import { Todo } from "../class";
import { todoList } from "../index";

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const clearCompleted = document.querySelector(".clear-completed");
const ulFiltors = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');
export const crearTodoHtml = (todo) => {
  const htmlTodo = `
<li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${
          todo.completado ? "checked" : ""
        }>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild); // firstElementChild   retornamos el primer elemento hijo, en este caso <li></li>  para eliminar el div
  
  return div;
};

//eventos

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    
    const nuevoTodo = new Todo(event.target.value);
    
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    event.target.value =''; // seteamos el input
 

  }
});

ulFiltors.addEventListener('click', (event) =>{
  
  const filtro = event.target.text;

  if(!filtro){return;}

  anchorFiltro.forEach(elem => elem.classList.remove('selected'));
 event.target.classList.add('selected');
  for(const elemento of divTodoList.children){

    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch (filtro) {
      case 'Pendientes':
        if(completado){
          elemento.classList.add('hidden');
        }
        break;
        case 'Completados':
          if(!completado){
            elemento.classList.add('hidden');
          }
        break;
    
    }

    
  }



})

clearCompleted.addEventListener('click',()=>{


todoList.eliminarCompletados();

for(let i = divTodoList.children.length-1; i>=0 ; i--){

  const elemento = divTodoList.children[i];

  if(elemento.classList.contains('completed')){
    
    divTodoList.removeChild(elemento);

  }
}

});

divTodoList.addEventListener('click',(event) =>{

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id'); // obtener dato del elemento html



    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    else if(nombreElemento.includes('button')){ // hay que borrar el elemento
      
      todoList.eliminarTodo(todoId);
      divTodoList.removeChild(todoElemento); // eliminar contenido del html
    }


});
