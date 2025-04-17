import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { BASEURL } from "@/lib/constant";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthResponse } from "@/types/loginTypes";
import { loginInputTypes, loginSchema } from "@/validations/user-validation/loginValidation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInputTypes>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  });
  
  const [error, setError] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState<boolean>(
    localStorage.getItem("rememberMe") === "true"
  );
  
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<loginInputTypes> = async (data) => {
    setError("");

    try {
      const res = await axios.post<AuthResponse>(`${BASEURL}/users/login`, {
        username: data.username,
        password: data.password,
      });
   
      setAccessToken(res.data.data.accessToken);
      setUser(res.data.data);
      
      localStorage.setItem('username', res.data.data.user.username);
      navigate("/home", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error during login:", error.response?.data?.message);
        setError(
          error.response?.data?.message || "Invalid username or password"
        );
      } else {
        console.error("Unexpected error:", error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const handleRememberMeChange = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    localStorage.setItem("rememberMe", newValue ? "true" : "false");
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl mb-4 font-bold">Happening now</h1>
      <h3>Join today.</h3>

      <div className="p-3 w-full">
        <Button className="bg-white text-gray-600 p-2 rounded-full">
          Login with Google
        </Button>

        <br />
        <br />

        <Button className="bg-white text-black p-2 rounded-full hover:text-white">
          Login with Github
        </Button>

        <div className="flex items-center justify-center text-center mt-2">
          <div className="h-[1px] w-full bg-white" />
          <span className="m-1">or</span>
          <div className="h-[1px] w-full bg-white" />
        </div>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          
          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
          <div className="flex items-center mt-2">
            <Input 
              type="checkbox" 
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 mr-2" 
            />
            <label htmlFor="rememberMe" className="text-white">Remember me</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;