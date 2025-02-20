import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import AddTask from "../components/AddTask";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // App serves as the layout for the entire app
    children: [
      {
        path: "add-task",
        element: <AddTask />,  // AddTask component will be rendered inside the Outlet
      },
      
      
    ],
    
  },
  {
    path: "login",
    element: <Login />,  // Login component will be rendered inside the Outlet
  },
  ]);
 
  export default router;