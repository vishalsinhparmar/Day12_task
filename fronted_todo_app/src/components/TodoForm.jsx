import { useEffect, useState } from "react";
import { addTodo, editTodo, todobyId } from "../services/api";
import { useNavigate, useParams } from "react-router"; // ✅ Fixed import

const TodoForm = ({fetchAllTodos}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  const handleChangeValue = (e) => {
    setTodo(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(todo.trim() === ""){
       return alert('please enter the todo')
    }
    const todoForm = { todo };

    try {
      if (id) {
        const res = await editTodo(id, todoForm);
        if (res.success) {
          alert("Todo updated successfully! ✅");
          setTodo("");
          navigate("/");
          fetchAllTodos()
        }
      } else {
        const res = await addTodo(todoForm);
        if (res.success) {
          alert("Todo added successfully! ✅");
          setTodo("");
          fetchAllTodos()
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
            type="submit"
            className="bg-violet-600 text-white py-2 font-semibold rounded-lg transition-all hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 cursor-pointer"
          >
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
