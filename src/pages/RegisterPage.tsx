
import { Link } from "react-router-dom";
import x from "../assets/x.png";
import { RegisterForm } from "@/components/Auth/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-32 bg-black text-white">
        <div className="hidden md:flex flex-col items-center justify-center">
            <img src={x} alt="Logo" className="w-[30rem] h-[30rem] mb-4" />
        </div>
        <div className="w-96 flex flex-col">
            <RegisterForm />
        <div className="flex items-center justify-center text-center mt-4">
          <span>
            Already have an account ?{" "}
            <Link to={"/login"}>
              <span className="text-blue-400 underline">Login</span>
            </Link>{" "}
          </span>
        </div>
        </div>
    </div>
  )
}

