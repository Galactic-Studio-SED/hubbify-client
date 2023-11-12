import React from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
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
    console.log("LOGIN")
    toast.warn("aSSS", {
      toastId: "warning",
    });
    // /*if (true) {
    //   navigateTo("/");
    // }*/
  };

  // When the form is submitted, but there are errors
  const onInvalid = () => {
    console.log("eRROE")
    toast.warn("Revisa bien tus datos e intenta de nuevo, por favor", {
      toastId: "warning",
    });
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
            {/* <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}> */}
    
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
                  }),
                }}
                validation={errors.email}
                placeholder={"e.g. hellotravelgo@hotmail.com"}
                type={"email"}
              >
                {errors.email?.type === "required" && (
                  <span role="alert" className="ml-4 font-semibold text-red-400">
                    ¡Hey! Este campo es requerido
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span role="alert" className="ml-4 font-semibold text-red-400">
                    Por favor, ingresa un correo electrónico válido
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
                innerRef={{ ...register("password", { required: true }) }}
                validation={errors.password}
                placeholder={"**********"}
                type={"password"}
                autoComplete={"off"}
              >
                {errors.password?.type === "required" && (
                  <span role="alert" className="ml-4 font-semibold text-red-400">
                    ¡Hey! Este campo es requerido
                  </span>
                )}
              </Input>
            </div>

            <button
              type="submit"
              className="rounded-full font-medium bg-black flex flex-row items-center justify-center py-2.5 px-4 text-white w-full"
            >
              Sign Up
            </button>

            <div className="text-gray-500 text-end">
              <span className="font-medium">Already have an account? </span>
              <span className="font-semibold text-royal-purple">Log in</span>
            </div>
          </form>

          {/* <div className="flex flex-col items-start justify-center gap-2">
            <div className="font-semibold">
              <span>Name</span>
              <span className="text-royal-purple ml-2">*</span>
            </div>

            <input
              className="border-gray-400 py-2.5 px-4 border rounded-full w-full"
              id="email"
              name="email"
              placeholder="Enter you name"
              type="email"
            />
          </div> */}

          {/* <div className="flex flex-col items-start justify-center gap-2">
            <div className="font-semibold">
              <span>Password</span>
              <span className="text-royal-purple ml-2">*</span>
            </div>

            <input
              className="border-gray-400 py-2.5 px-4 border rounded-full w-full"
              id="password"
              name="password"
              placeholder="*********"
              type="password"
            />
          </div> */}
        </div>
      </div>
      <div className="h-full w-full bg-gray-400"></div>
    </div>
  );
};

export default LoginPage;
