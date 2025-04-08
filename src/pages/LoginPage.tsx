import LoginForm from "@/components/Auth/LoginForm";
import x from "../assets/x.png";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center gap-40 bg-black text-white">
        <div className="">
            <img src={x} alt="Logo" className="w-[30rem] h-[30rem] mb-4" />
        </div>
        <div className="">
            <LoginForm />
        </div>
    </div>
  )
}

export default LoginPage