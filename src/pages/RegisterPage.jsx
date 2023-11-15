import React from "react";
import Input from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../api/axios";

const RegisterPage = () => {
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/users",
        JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      toast.success("Registration successful! You can now log in.", {
        toastId: "success",
      });

      navigateTo("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Registration failed. Please try again.", {
        toastId: "error",
      });
    }
  };

  const onInvalid = () => {
    toast.warn(
      "Double-check your information and give it another try, please.",
      {
        toastId: "warning",
      }
    );
  };

  return (
    <div className="md:grid md:grid-cols-2 min-h-screen">
      <div className="p-10 grid place-items-center">
        <div className="max-w-[550px] w-full flex flex-col gap-10 ">
          <div className="flex flex-col items-center justify-center gap-2">
            <a
              href="#"
              className="text-royal-purple text-5xl md:text-6xl font-bold tracking-wide font-monserrat"
            >
              hubbify
            </a>
            <h1 className="font-semibold mt-6">Create your account</h1>
            <p className="font-medium text-text-quaternary">
              Let’s get started
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="flex flex-col gap-10"
          >
            <div>
              <label htmlFor="username" className="font-semibold">
                <span>Username</span>
                <span className="text-royal-purple ml-2">*</span>
              </label>

              <Input
                id={"username"}
                name={"username"}
                aria-invalid={errors.username ? "true" : "false"}
                innerRef={{
                  ...register("username", {
                    required: true,
                    maxLength: 50,
                  }),
                }}
                validation={errors.username}
                placeholder={"e.g. john_doe123"}
                type={"text"}
              >
                {errors.username && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.username.type === "required" &&
                      "This field is required."}
                    {errors.username.type === "maxLength" &&
                      "Username must not exceed 50 characters."}
                  </span>
                )}
              </Input>
            </div>

            <div>
              <label htmlFor="email" className="font-semibold">
                <span>Email</span>
                <span className="text-royal-purple ml-2">*</span>
              </label>

              <Input
                id={"email"}
                name={"email"}
                aria-invalid={errors.email ? "true" : "false"}
                innerRef={{
                  ...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    maxLength: 200,
                  }),
                }}
                validation={errors.email}
                placeholder={"e.g. hello@example.com"}
                type={"email"}
              >
                {errors.email && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.email.type === "required" &&
                      "This field is required."}
                    {errors.email.type === "pattern" &&
                      "Please enter a valid email address."}
                    {errors.email.type === "maxLength" &&
                      "Email must not exceed 200 characters."}
                  </span>
                )}
              </Input>
            </div>

            <div>
              <label htmlFor="phone" className="font-semibold">
                <span>Phone</span>
              </label>

              <Input
                id={"phone"}
                name={"phone"}
                aria-invalid={errors.phone ? "true" : "false"}
                innerRef={{
                  ...register("phone", {
                    maxLength: 20,
                    pattern: /^[\d()-\s]+$/,
                  }),
                }}
                validation={errors.phone}
                placeholder={"e.g. 123-456-7890"}
                type={"tel"}
              >
                {errors.phone && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.phone.type === "maxLength" &&
                      "Phone number must not exceed 20 digits."}
                    {errors.phone.type === "pattern" &&
                      "Please enter a valid phone number."}
                  </span>
                )}
              </Input>
            </div>

            <div>
              <label htmlFor="dob" className="font-semibold">
                <span>Date of Birth</span>
              </label>

              <Input
                id="dob"
                name="dob"
                aria-invalid={errors.dob ? "true" : "false"}
                innerRef={{ ...register("dob") }}
                validation={errors.dob}
                type="date"
              >
                {errors.dob && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.dob.type === "required" &&
                      "This field is required."}
                  </span>
                )}
              </Input>
            </div>

            <div>
              <label htmlFor="password" className="font-semibold">
                <span>Password</span>
                <span className="text-royal-purple ml-2">*</span>
              </label>

              <Input
                id={"password"}
                name={"password"}
                aria-invalid={errors.password ? "true" : "false"}
                innerRef={{
                  ...register("password", { required: true, minLength: 8 }),
                }}
                validation={errors.password}
                placeholder={"**********"}
                type={"password"}
                autoComplete={"off"}
              >
                {errors.password && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.password.type === "required" &&
                      "This field is required."}
                    {errors.password.type === "minLength" &&
                      "Password length should be at least 8 characters."}
                  </span>
                )}
              </Input>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="font-semibold">
                <span>Confirm Password</span>
                <span className="text-royal-purple ml-2">*</span>
              </label>

              <Input
                id={"confirmPassword"}
                name={"confirmPassword"}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                innerRef={{
                  ...register("confirmPassword", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match.";
                      }
                    },
                  }),
                }}
                validation={errors.confirmPassword}
                placeholder={"**********"}
                type={"password"}
                autoComplete={"off"}
              >
                {errors.confirmPassword && (
                  <span
                    className="ml-4 font-semibold text-red-400"
                    role="alert"
                  >
                    {errors.confirmPassword.type === "required" &&
                      "This field is required."}
                    {errors.confirmPassword.type === "validate" &&
                      "Your passwords do no match."}
                  </span>
                )}
              </Input>
            </div>

            <button
              type="submit"
              className="rounded-full font-medium bg-black py-2.5 px-4 text-white w-full"
            >
              Sign Up
            </button>

            <div className="text-gray-500 text-end">
              <span className="font-medium">Already have an account? </span>
              <Link to={"/login"} className="font-semibold text-royal-purple">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="h-full w-full bg-gray-400"></div>
    </div>
  );
};

export default RegisterPage;
