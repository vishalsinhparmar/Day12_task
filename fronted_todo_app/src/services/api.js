import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  "https://day12task-production.up.railway.app/api";

const api = axios.create({
    baseURL:API_BASE_URL
});

const addTodo = async (todo)=>{
     const res  = await api.post('/addtodo',todo);
     return res.data;
};
const getTodos = async ()=>{
    const res  = await api.get('/todos');
    return res.data;
};
const editTodo = async (id,todo)=>{
    const res  = await api.patch(`/updtodo/${id}`,todo);
    return res.data;
};
const deleteTodo = async (id)=>{
    const res  = await api.delete(`/deletetodo/${id}`);
    return res.data;
};
const todobyId = async (id)=>{
    const res  = await api.get(`/todobyid/${id}`);
    return res.data;
};
const addcompltedTodo = async (id,completed)=>{
    const res  = await api.patch(`/completeTodo/${id}`,completed);
    return res.data;
};
const fetchCompltedtodo = async ()=>{
    const res  = await api.get(`/fetchAllcomplted`);
    return res.data;
};

export {
     addTodo,
     getTodos,
     editTodo,
     deleteTodo,
     todobyId,
     addcompltedTodo,
     fetchCompltedtodo
}
