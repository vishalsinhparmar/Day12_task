import express from 'express';
import { deleteTodo, editTododata, fetchAlltodo, registerTodo, todobyId } from '../controller/todos.controller.js';

const todoRoutes = express.Router();

todoRoutes.post('/addtodo',registerTodo);
todoRoutes.get('/todos',fetchAlltodo);
todoRoutes.patch('/updtodo/:id',editTododata);
todoRoutes.get('/todobyid/:id',todobyId);

todoRoutes.delete('/deletetodo/:id',deleteTodo);




export default todoRoutes;