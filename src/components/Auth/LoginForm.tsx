import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { BASEURL } from "@/lib/constant";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);
  const { setAccessToken, setUser } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${BASEURL}/users/login`, {
        username,
        password,
      });
      console.log(res.data.data.accessToken);
      console.log(res.data.data.refreshToken);
      setAccessToken(res.data.data.accessToken);
      
      setUser(res.data.data.user);

      localStorage.setItem('username',res.data.data.user.username);
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl mb-4 font-bold">Happening now</h1>
      <h3>Join today.</h3>

      <div className=" p-3 w-full">
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

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            size={10}
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        
      </div>
          <div className="flex w-56  items-center justify-center text-center mt-4">
          <Input onChange={()=>{
            setRememberMe(!rememberMe);
            localStorage.setItem("rememberMe", !rememberMe ? "true" : "false");
          }}  type="checkbox" className=" w-20" />
          <span className="text-xl flex  text-white">Remember me</span>
        </div>
    </div>
  );
};

export default LoginForm;
