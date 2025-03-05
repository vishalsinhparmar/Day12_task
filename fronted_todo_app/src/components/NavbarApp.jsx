import { NavLink } from "react-router"; // ✅ Correct import

const NavbarApp = () => {
  return (
    <nav className="bg-gradient-to-r from-black to-slate-900 p-4 shadow-lg">
      <ul className="flex items-center gap-8 md:gap-12">
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
      </ul>
    </nav>
  );
};

export default NavbarApp;
