import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.config";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import login from '../assets/Login.jpg';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        toast("Google login Successful!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login Failed!");
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Left Side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img src={login} alt="Login" className="w-full max-w-sm md:max-w-md lg:max-w-lg" />
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login To Your Account</h2>

        <button
          onClick={handleGoogle}
          className="flex items-center justify-center w-full bg-white border border-gray-300 py-2 px-4 rounded-md shadow-md hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="text-2xl mr-2" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;