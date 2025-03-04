import { useEffect, useState } from "react";
import FetchTodo from "./components/FetchTodo";
import NavbarApp from "./components/NavbarApp";
import TodoForm from "./components/TodoForm";
import { getTodos } from "./services/api";

const App = () => {
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
    <>
      <NavbarApp />
      <div className="bg-sky-200 min-h-screen flex flex-col items-center justify-start p-6 w-full">
        {/* Todo Form */}
        <div className="w-full max-w-lg mb-6">
          <TodoForm fetchAllTodos={fetchAllTodos}/>
        </div>

        {/* Todo List */}
        <div className="w-full max-w-2xl">
          <FetchTodo  todos = {todos} loading ={loading} fetchAllTodos={fetchAllTodos}/>
        </div>
      </div>
    </>
  );
};

export default App;
