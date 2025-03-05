import { createContext, useEffect, useState } from "react";
import { getTodos } from "../services/api";

const CreateTodoContext = createContext();
const ContextProviderTodo = ({children})=>{
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchAllTodos = async () => {
      try {
        const res = await getTodos();
        console.log("Fetched Todos:", res);
  
        if (res.success) {
          setTodos(res.data);
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
 
           <CreateTodoContext.Provider value={{fetchAllTodos,todos,loading}}>
                {children}
           </CreateTodoContext.Provider> 

     )
}; 
export {
    ContextProviderTodo,
    CreateTodoContext
}