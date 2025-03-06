// import { useEffect} from "react";
import { useContext, useState } from "react";
import { addcompltedTodo, deleteTodo,  } from "../services/api";
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit, FiGrid } from "react-icons/fi";
import { useNavigate } from "react-router";
import { CreateTodoContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import { CiGrid2H } from "react-icons/ci";

const FetchTodo = () => {
  const[checked,setChecked] = useState({});
  console.log(checked)
  const {todos,fetchAllTodos,loading,gridLayoutchange,grid} = useContext(CreateTodoContext)
  const navigate = useNavigate();

  const handleCheckbox = async(id,chekcStauts)=>{

    const updateStatus = !chekcStauts;
    const updtCompleted = {completed:updateStatus}
    const res = await addcompltedTodo(id,updtCompleted);
    if(res.success === true){
      setChecked((prev)=>({
        ...prev,
        [id]:updateStatus
       }));
       await fetchAllTodos()
    }
    
    
  }
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?",todos[id]);
    if (!confirmDelete) return;
    try {
      const res = await deleteTodo(id);
      if (res.success) {
        toast.warning("Todo deleted successfully! ✅");
        fetchAllTodos()
        // setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
    toast.error("Error deleting todo:", err.message);
    }
  };


  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ✅ Todo List
        </h1>
       <div className="text-right p-2">
        <button onClick={gridLayoutchange} className="text-right hover:text-slate-500 cursor-pointer">{grid ? <FiGrid className="text-4xl"/>:<CiGrid2H className="text-4xl"/>}</button>
       </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : todos.length > 0 ? (
          <div className={`space-y-4 ${grid ? "grid grid-cols-2 items-baseline gap-4":"block"}`}>
            {todos.map((todo) => (
              <div
                key={todo._id}
                className={`bg-gray-50 shadow-md p-4 rounded-lg flex justify-between items-center transition-all hover:bg-gray-200 ${todo.completed ? "bg-green-200":""}`}
              >
                <div>
                  <p className={`text-lg font-semibold text-gray-900   py-1 ${todo.completed ? "line-through":""}`}>
                    <span className="text-slate-500 font-bold">{todo.todo.charAt(0).toUpperCase()}</span>{todo.todo.slice(1)}
                  </p>
                  {todo.createdAt && (
                    <p className="text-sm text-gray-500">
                      📅 {new Date(todo.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    className="text-red-600 hover:text-red-500 transition-all cursor-pointer"
                    onClick={() => handleDelete(todo._id)}
                  >
                    <FaTrashCan className="text-xl" />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 transition-all cursor-pointer"
                    onClick={() => navigate(`/${todo._id}`)}
                  >

                    <FiEdit className="text-xl" />
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700 transition-all cursor-pointer"
                  >
                    
                   <input type="checkbox" 
                   checked={todo.completed}
                   onChange={()=>handleCheckbox(todo._id,todo.completed)}
                   className="bg-amber-100 p-4 border rounded cursor-pointer h-5 w-5" />
                  </button>
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
  );
};

export default FetchTodo;
