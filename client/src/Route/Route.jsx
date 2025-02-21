import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import AddTask from "../components/AddTask";
import Home from "../components/Home";
import TaskList from "../components/TaskList";
import EditTask from "../components/EditTask";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-task",
        element: <AddTask />, 
      },
      {
        path : "/edit-task",
        element : <TaskList/>
      },
      {
        path : "/edit-task/:taskId",
        element : <EditTask/>
      },
      
    ],
    
  },
  {
    path: "login",
    element: <Login />,  // Login component will be rendered inside the Outlet
  },
  ]);
 
  export default router;