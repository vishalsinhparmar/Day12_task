import { useContext, useEffect, useState } from "react";
import { addTodo, editTodo, todobyId } from "../services/api";
import { useNavigate, useParams } from "react-router"; // 
import { CreateTodoContext } from "../context/ContextProvider";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TodoForm = () => {
  const {fetchAllTodos} = useContext(CreateTodoContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [loading,setLoading] = useState(false);
  const handleChangeValue = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(todo.trim() === ""){
       setLoading(false)
       return toast.error('provide a valid todo value')
    }
    const todoForm = { todo };

    try {
      if (id) {
        const res = await editTodo(id, todoForm);
        if (res.success) {
          toast.success("Todo updated successfully! ✅");
          setTodo("");
          navigate("/");
          fetchAllTodos()
          setLoading(false)
        }
      } else {
        const res = await addTodo(todoForm);
        if (res.success) {
          toast.success("Todo added successfully! ✅");
          setTodo("");
          fetchAllTodos()
          setLoading(false)

        }
      }
    } catch (err) {
      console.log("Error in form submission:", err.message);
    }
  };

  const fetchTodoById = async () => {
    try {
      const res = await todobyId(id);
      if (res.success) {
        setTodo(res.data.todo);
      }
    } catch (err) {
      console.log("Error fetching todo by ID:", err.message);
    }
  };

  useEffect(() => {
    if (id) fetchTodoById();
  }, [id]);

  return (
    <div className="flex justify-center items-center ">
      <ToastContainer/>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {id ? "Edit Todo" : "Add Todo"}
        </h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            onChange={handleChangeValue}
            value={todo}
            placeholder="Enter your todo..."
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
          <button
          disabled ={loading}
            type="submit"
            className={` text-white py-2 font-semibold rounded-lg transition-all  focus:ring-2 ${loading ? "bg-slate-800 hover:bg-slate-700 opacity-30 text-white":"bg-violet-600 hover:bg-violet-700"} focus:ring-violet-400 cursor-pointer`}
          >
            {loading ? "...processing": id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
