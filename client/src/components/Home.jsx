import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch all tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle Drag End
    const handleDragEnd = async (result) => {
        const { source, destination } = result;

        // If the task is dropped outside the droppable area or in the same category, return early
        if (!destination || source.droppableId === destination.droppableId) return;

        // Get the task being moved
        const movedTask = tasks[source.index];
        const newCategory = destination.droppableId;

        try {
            // 1. Update the category in the backend
            await axios.patch(`http://localhost:5000/tasks/${movedTask._id}`, {
                category: newCategory
            });

            // 2. Update the category in the frontend state
            const updatedTasks = tasks.map((task) => {
                if (task._id === movedTask._id) {
                    return { ...task, category: newCategory }; // Update the category
                }
                return task;
            });

            setTasks(updatedTasks); // Update the tasks state
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DragDropContext onDragEnd={handleDragEnd}>
                {/* Task Sections (categories) */}
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <Droppable key={category} droppableId={category}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="border p-4 shadow-lg rounded-lg min-h-[300px]"
                            >
                                <h2
                                    className={`text-xl font-bold ${
                                        category === "To-Do"
                                            ? "text-blue-500"
                                            : category === "In Progress"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {category}
                                </h2>
                                <ul className="mt-2">
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, index) => (
                                            <Draggable
                                                key={task._id}
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="border p-2 mt-2 rounded bg-white cursor-pointer shadow"
                                                    >
                                                        <strong>{task.title}</strong>
                                                        <p>{task.description}</p>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </ul>
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </div>
    );
};

export default Home;