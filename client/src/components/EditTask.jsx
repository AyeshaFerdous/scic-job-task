import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
    const { taskId } = useParams(); // Get the taskId from the URL
    const [task, setTask] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    // Fetch task data by ID
    const fetchTask = async () => {
       
            const response = await axios.get(`https://scic-server-peach.vercel.app/tasks/${taskId}`);
            setTask(response.data);
      
    };

    useEffect(() => {
        fetchTask();
    }, [taskId]);

   // Handle form submission to update the task
   const handleSubmit = async (e) => {
    e.preventDefault();
   
        // Send updated task to the backend
        const response = await axios.patch(`https://scic-server-peach.vercel.app/task/${taskId}`, {
            title: task.title,
            description: task.description,
        });

        if (response.data.modifiedCount > 0) { 
            toast.success("Task updated successfully!");
            navigate("/"); 
            
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                        Task Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update Task
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;