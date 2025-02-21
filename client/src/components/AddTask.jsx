import axios from 'axios';
import { toast } from 'react-toastify';

const AddTask = () => {
    const handleSubmit =async e =>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        console.log({title,description,category})
      

        const taskData = {
            title, 
            description,
            category,
            date : new Date(),
          }
      
          try {
            // 1. make a post request
            await axios.post("https://scic-server-peach.vercel.app/add-tasks", taskData)
            // 2. Reset form
            form.reset()
            // 3. Show toast and navigate
            toast.success('Task Added Successfully!!!')
            // navigate('/my-posted-jobs')
          } catch (err) {
            console.log(err)
            toast.error(err.message)
          }
        
    }
    return (
        <div className="w-full max-w-2xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create a Task</h2>
  
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              required
              maxLength={50}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter task title"
            />
          </div>
  
          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              maxLength={200}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter task description"
            />
          </div>
  
          {/* Category Field */}
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a category</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          >
            Submit Task
          </button>
        </form>
      </div>
    );
};

export default AddTask;