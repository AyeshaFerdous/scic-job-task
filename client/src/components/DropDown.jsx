import { Link } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { TiEdit } from "react-icons/ti";

const DropDown = () => {
    return (
        <div className='flex justify-between py-6'>

            {/* Action Buttons */}
            <div className='w-full lg:w-24 bg-black p-4 rounded-lg shadow-lg flex flex-col items-center justify-between space-y-6'>
                
                {/* Add Task Button */}
                <Link to="/add-task" className="flex justify-center items-center p-4 text-xl text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all ease-in-out duration-200">
                    <CiCirclePlus className="text-2xl" />
                </Link>

                {/* Edit Task Button */}
                <Link to="/edit-task" className="flex justify-center items-center p-4 text-xl text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:scale-105 transition-all ease-in-out duration-200">
                    <TiEdit className="text-2xl" />
                </Link>
            </div>
        </div>
    );
};

export default DropDown;