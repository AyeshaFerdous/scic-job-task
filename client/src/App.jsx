import { Outlet } from "react-router-dom";
import DropDown from "./components/DropDown";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-between">
        <div className="w-full lg:w-3/4">
          <Outlet />
        </div>

        <DropDown />
      </div>
    </>
  );
}

export default App;
