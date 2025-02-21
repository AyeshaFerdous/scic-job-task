import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
 
  const navigate = useNavigate();

  // Fetch tasks from the backend
  const fetchTasks = async () => {
  
      const response = await axios.get("https://scic-server-peach.vercel.app/tasks");
      setTasks(response.data);
    
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };
  // Handle task delete
  const handleDelete = async (id) => {

    const deletedTask = tasks.filter((task) => task._id !== id); 
  setTasks(deletedTask); 
    const { data } = await axios.delete(`https://scic-server-peach.vercel.app/tasks/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Task deleted successfully");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`); 
  };

 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Task List
      </h2>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-600">
          No tasks found. Add a new task to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => modernDelete(task._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
