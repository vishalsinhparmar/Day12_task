import { createContext, useEffect, useState } from "react";
import { getTodos } from "../services/api";

const CreateTodoContext = createContext();
const ContextProviderTodo = ({children})=>{
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grid,setGrid] = useState(false); 
    const [completedTodo,setCompltedTodos] = useState([])

    const gridLayoutchange = ()=>{
        setGrid(!grid)
    }
  
    const fetchAllTodos = async () => {
      try {
        const res = await getTodos();
        console.log("Fetched Todos:", res);
  
        if (res.success) {
          setTodos(res.data);
          const compltetedTodos = res.data.filter(todo => todo.completed);
          console.log('completedTodo',compltetedTodos)
          setCompltedTodos(compltetedTodos)
        }
      } catch (err) {
        console.log("Error fetching todos:", err.message);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
       fetchAllTodos();
     }, []);
     return (
 
           <CreateTodoContext.Provider value={{fetchAllTodos,todos,loading,gridLayoutchange,grid,completedTodo}}>
                {children}
           </CreateTodoContext.Provider> 

     )
}; 
export {
    ContextProviderTodo,
    CreateTodoContext
}