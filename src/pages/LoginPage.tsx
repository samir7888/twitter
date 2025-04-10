import LoginForm from "@/components/Auth/LoginForm";
import x from "../assets/x.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-32 bg-black text-white">
      <div className="hidden md:flex flex-col items-center justify-center">
        <img src={x} alt="Logo" className="w-[30rem] h-[30rem] mb-4" />
      </div>
      <div className="w-96 flex flex-col">
        <LoginForm />
        <div className="flex items-center justify-center text-center mt-4">
          <span>
            Create a new account ?{" "}
            <Link to={"/signup"}>
              <span className="text-blue-400 underline"> signup</span>
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
