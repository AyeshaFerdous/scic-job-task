import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-11/12 mx-auto">
        <div >
          <Outlet />
        </div> 
      </div>
    </>
  );
}

export default App;
