// import { useEffect} from "react";
import { deleteTodo,  } from "../services/api";
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";

const FetchTodo = ({todos,fetchAllTodos,loading}) => {
  const navigate = useNavigate();


  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      if (res.success) {
        alert("Todo deleted successfully! ✅");
        fetchAllTodos()
        // setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.log("Error deleting todo:", err.message);
    }
  };


  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ✅ Todo List
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : todos.length > 0 ? (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-gray-50 shadow-md p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {todo.todo}
                  </p>
                  {todo.createdAt && (
                    <p className="text-sm text-gray-500">
                      📅 {new Date(todo.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    className="text-red-600 hover:text-red-800 transition-all cursor-pointer"
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
