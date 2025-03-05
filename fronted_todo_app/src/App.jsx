
import { lazy, Suspense } from "react";

const FetchTodo = lazy(()=> import("./components/FetchTodo"));
const NavbarApp = lazy(()=> import("./components/NavbarApp"));
const TodoForm = lazy(()=> import("./components/TodoForm"));


const App = () => {
  
  return (
    <Suspense fallback={<div>...loading</div>}>
  
      <NavbarApp />
      <div className="bg-sky-200 min-h-screen flex flex-col items-center justify-start p-6 w-full">
        {/* Todo Form */}
        <div className="w-full max-w-lg mb-6">
          <TodoForm />
        </div>

        {/* Todo List */}
        <div className="w-full max-w-2xl">
          <FetchTodo />
        </div>
      </div>
    </Suspense>
  );
};

export default App;
