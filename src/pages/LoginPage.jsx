import React from "react";

const LoginPage = () => {
  return (
    <div className="md:grid md:grid-cols-2 min-h-screen">
      <div className="p-10 grid place-items-center">
        <div className="max-w-[550px] w-full flex flex-col gap-10 ">
          <div className="flex flex-col items-center justify-center gap-2">
          <a href="#" className="text-royal-purple text-5xl md:text-6xl font-bold tracking-wide font-monserrat">hubbify</a>
            <h1 className="font-semibold mt-6">Create your account</h1>
            <p className="font-medium text-text-quaternary">
              Let’s get started
            </p>
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
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
          </div>

          <div className="flex flex-col items-start justify-center gap-2">
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
          </div>

          <button
            type="button"
            className="rounded-full font-medium bg-black flex flex-row items-center justify-center py-2.5 px-4 text-white w-full"
          >
            Sign Up
          </button>

          <div className="text-gray-500 text-end">
            <span className="font-medium">Already have an account? </span>
            <span className="font-semibold text-royal-purple">Log in</span>
          </div>
        </div>
      </div>
      <div className="h-full w-full bg-gray-400"></div>
    </div>
  );
};

export default LoginPage;
