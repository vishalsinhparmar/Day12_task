import { NavLink } from "react-router";

const NavbarApp = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-black to-gray-900 p-4 shadow-lg z-50">
      <ul className="flex items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-8 md:gap-12">
          <li>
            <NavLink
              to="/"
              className="text-white font-semibold text-lg px-4 py-2 rounded-md transition duration-300 hover:bg-white/20"
            >
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="text-white font-semibold text-lg px-4 py-2 rounded-md transition duration-300 hover:bg-white/20"
            >
              Home
            </NavLink>
          </li>
        </div>

        <li>
          <NavLink to="/completedTodo">
            <button className="bg-orange-600 text-white text-lg font-semibold px-5 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-orange-700 hover:scale-95 cursor-pointer ">
              ✅ Completed Todos
            </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarApp;
