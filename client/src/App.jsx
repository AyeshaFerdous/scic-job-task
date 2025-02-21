import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto flex justify-between">
        <div className="w-full lg:w-3/4">
          <Outlet />
        </div>

       
      </div>
    </>
  );
}

export default App;
