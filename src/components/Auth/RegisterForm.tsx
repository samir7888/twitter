import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { BASEURL } from "@/lib/constant";
import { useNavigate } from "react-router-dom";
import { UserApiResponse } from "@/types/user";
import {
  registerInputType,
  userSchema,
} from "@/validations/user-validation/registerValidation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterForm = () => {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerInputType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER", // Changed default to USER as it's likely more common
      username: "",
    },
  });

  const onSubmit: SubmitHandler<registerInputType> = async (data) => {
    setError("");

    try {
      await axios.post<UserApiResponse>(`${BASEURL}/users/register`, {
        email: data.email,
        password: data.password,
        role: data.role,
        username: data.username,
      });

      // Show success message before navigation (optional)
      alert("Registration successful! Please log in.");
      navigate("/login", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error during register user:",
          error.response?.data?.message
        );
        setError(
          error.response?.data?.message || "Registration failed. Please try again."
        );
      } else {
        console.error("Unexpected error:", error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-3xl mb-4 font-bold">Happening now</h1>
      <h3 className="text-lg mb-6">Create your account today</h3>

      <div className="p-3 w-full">
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded bg-transparent text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded bg-transparent text-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded bg-transparent text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <select 
              {...register("role")}
              className="w-full p-2 border border-gray-300 rounded bg-black text-white"
            >
              <option value="USER" className="bg-black text-white">User</option>
              <option value="ADMIN" className="bg-black text-white">Admin</option>
              <option value="MODERATOR" className="bg-black text-white">Moderator</option>
              <option value="GUEST" className="bg-black text-white">Guest</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mt-2"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <p className="text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};