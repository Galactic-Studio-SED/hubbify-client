import React from "react";
import Input from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (true) {
      navigateTo("/");
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
            <h1 className="font-semibold mt-6">Sign In to your account</h1>
            <p className="font-medium text-text-quaternary">
              Welcome back to hubbify
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="flex flex-col gap-10"
          >
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
              <label htmlFor="email" className="font-semibold">
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

            <button
              type="submit"
              className="rounded-full font-medium bg-black py-2.5 px-4 text-white w-full"
            >
              Sign In
            </button>

            <div className="text-gray-500 text-end">
              <span className="font-medium">Don’t have an account? </span>
              <Link
                to={"/register"}
                className="font-semibold text-royal-purple"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="h-full w-full bg-gray-400"></div>
    </div>
  );
};

export default LoginPage;
