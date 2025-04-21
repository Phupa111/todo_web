import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      setIsLoading(true);
      setSignupError("");

      const response = await axios.post(`${apiUrl}/api/Users`, payload);
      console.log("Success:", response.data);

      // Show success state
      setSignupSuccess(true);
      reset(); // Clear form

      // Optional: Redirect after timeout
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error("Error:", err);

      // Set appropriate error message
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create account. Please try again.";
      setSignupError(errorMessage);
    } finally {
      setIsLoading(false);
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

        {/* Success message */}
        {signupSuccess && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg text-center">
            <p className="font-medium">Account created successfully!</p>
            <p className="text-sm mt-1">
              You can now log in with your credentials.
            </p>
          </div>
        )}

        {/* Error message */}
        {signupError && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-center text-sm">
            {signupError}
          </div>
        )}

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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
