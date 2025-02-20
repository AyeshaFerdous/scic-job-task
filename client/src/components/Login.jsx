import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import auth from "../../firebase.config";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import login from '../assets/Login.jpg'
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {  setUser} =
    useContext(AuthContext);
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
    <div className="flex justify-center">
        <div>
        <img src={login} alt="" />
        </div>

        <div className="bg-sky-100 p-4">
            <h2>Login To Your Account</h2>
            <button
                  onClick={handleGoogle}
                  className="btn w-full font-semibold px-12 md:px-24"
                >
                  <FcGoogle className="text-2xl" />
                  <span>Sign in with Google</span>
                </button>

        </div>
    </div>
  );
};

export default Login;
