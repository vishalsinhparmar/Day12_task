import express from 'express';
import { completedTodoupdt, deleteTodo, editTododata, fetchAllcompletedTodo, fetchAlltodo, registerTodo, todobyId } from '../controller/todos.controller.js';

const todoRoutes = express.Router();

todoRoutes.post('/addtodo',registerTodo);
todoRoutes.get('/todos',fetchAlltodo);
todoRoutes.patch('/updtodo/:id',editTododata);
todoRoutes.get('/todobyid/:id',todobyId);

todoRoutes.delete('/deletetodo/:id',deleteTodo);
todoRoutes.patch('/completeTodo/:id',completedTodoupdt);
todoRoutes.get('/fetchAllcomplted',fetchAllcompletedTodo);






export default todoRoutes;