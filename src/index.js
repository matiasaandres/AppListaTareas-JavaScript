import './styles.css';

import {Todo, TodoList} from './class/index';
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './class/todo.class';
// import { TodoList } from './class/todo-list-class';



export const todoList = new TodoList();

todoList.todos.forEach(todo => crearTodoHtml(todo));