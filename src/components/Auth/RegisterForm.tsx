import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { BASEURL } from "@/lib/constant";
// import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { UserApiResponse } from "@/types/user";
import { userSchema } from "@/validations/user-validation/registerValidation";

export const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("ADMIN");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validationResult = userSchema.safeParse({
      email,
      password,
      role,
      username,
    });

    if (!validationResult.success) {
      const firstError = Object.values(validationResult.error.flatten().fieldErrors)[0]?.[0];
      setError(firstError || "Invalid input. Please check your form.");
      setLoading(false);
      return;
    }

    try {
      await axios.post<UserApiResponse>(`${BASEURL}/users/register`, {
        email,
        password,
        role,
        username,
      });

      navigate("/login", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during register user:",
          error.response?.data?.message
        );
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

      <div className="p-3 w-full">
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            required
          />

          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
            className="p-2 border border-gray-300 rounded"
            required
          />

          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
            required
          />

          <select
            className="bg-black text-white p-2 rounded border border-gray-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
            <option value="GUEST">Guest</option>
          </select>

          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded"
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};
