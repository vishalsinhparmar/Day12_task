import {  useContext,  } from "react";
import { CreateTodoContext } from "../context/ContextProvider";
import { FiGrid } from "react-icons/fi";
import { CiGrid2H } from "react-icons/ci";
import NavbarApp from "./NavbarApp";
import { FaRegCheckCircle } from "react-icons/fa";

const CompletdTodos = ()=>{
    
    const {gridLayoutchange,grid,loading,completedTodo} = useContext(CreateTodoContext)
     return (
        <>
        <NavbarApp/>
               <div className="flex justify-center items-center h-dvh ">
                 <div className="bg-gray-50 shadow-lg rounded-xl p-6 w-full max-w-2xl">
                   <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                     ✅ Completd Todo List
                   </h1>
                  <div className="text-right p-2">
                   <button onClick={gridLayoutchange} className="text-right hover:text-slate-500 cursor-pointer">{grid ? <FiGrid className="text-4xl"/>:<CiGrid2H className="text-4xl"/>}</button>
                  </div>
                   {loading ? (
                     <div className="flex justify-center items-center py-10">
                       <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                     </div>
                   ) : completedTodo.length > 0 ? (
                     <div className={`space-y-4 ${grid ? "grid grid-cols-2 items-baseline gap-4":"block"}`}>
                       {completedTodo.map((todo) => (
                         <div
                           key={todo._id}
                           className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center transition-all hover:bg-gray-50"
                         >
                           <div>
                             <p className="text-lg font-semibold text-gray-900   py-1 ">
                               <span className="text-slate-500 font-bold">{todo.todo.charAt(0).toUpperCase()}</span>{todo.todo.slice(1)}
                             </p>
                             {todo.createdAt && (
                               <p className="text-sm text-gray-500">
                                 📅 {new Date(todo.createdAt).toLocaleString()}
                               </p>
                             )}
                           </div>

                           <div >
                              <FaRegCheckCircle className="text-green-500 text-2xl"/>
                           </div>
           
                          
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-center text-gray-500 text-lg">
                        No todos found. Add some!
                     </p>
                   )}
                 </div>
               </div>
        </>
     )
};

export default CompletdTodos;