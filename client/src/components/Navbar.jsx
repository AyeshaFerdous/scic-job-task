import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-black">
      <div className="flex justify-between w-11/12 mx-auto py-4">
        <h2 className="text-3xl text-white font-bold italic">Ayesha Ferdous</h2>

        <div className="flex">
           
        <Link
            to="/"
            className="flex justify-center items-center p-4 text-xl text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all ease-in-out duration-200"
          >
            <span>Home</span>
          </Link>
          <Link
            to="/add-task"
            className="flex justify-center items-center p-4 text-xl text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all ease-in-out duration-200"
          >
            <span>Add Task</span>
          </Link>

          {/* Edit Task Button */}
          <Link
            to="/edit-task"
            className="flex justify-center items-center p-4 text-xl text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all ease-in-out duration-200"
          >
            <span>Edit Task</span>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            <FaHamburger />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {user && user?.email ? (
              <li>
                <Link onClick={logOut}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
