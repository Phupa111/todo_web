import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const apiUrl = import.meta.env.VITE_API_URL;
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${apiUrl}/api/Users`, payload);
      console.log("Success:", response.data);
      // Optional: Show success toast, redirect, etc.
    } catch (err) {
      console.error("Error:", err);
      // Optional: Show error toast
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account 📝
        </h2>
        <p className="text-center text-gray-500">
          Join TaskFlow and boost your productivity
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            title="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
          />
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
          <FormInput
            register={register}
            title="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
