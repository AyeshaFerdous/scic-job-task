import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";

const Navbar = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="bg-black">
      <div className="flex justify-between w-11/12 mx-auto py-4">
        <h2 className="text-3xl text-white font-bold italic">Ayesha Ferdous</h2>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
          <FaHamburger />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link to='/login'>Login</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
