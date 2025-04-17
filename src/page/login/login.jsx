import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import FormInput from "../../components/form/FormInput";
import { useNavigate } from "react-router";

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/api/Users/Login`, data);

      // Save user info or token
      localStorage.setItem("user", JSON.stringify(res.data));

      // Navigate to dashboard
      navigate("/todo");
    } catch (err) {
      console.error("Login failed", err);
      setError("login", { message: "Invalid email or password" });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500">
          Login to your TaskFlow account
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            title="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
          />
          <FormInput
            register={register}
            title="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/sing-up"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
