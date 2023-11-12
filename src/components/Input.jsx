import React from "react";

const Input = ({ children, validation, innerRef, ...rest }) => {
  return (
    <div>
      <input
        className={`border-gray-400 mt-4 py-2.5 px-4 border rounded-full w-full ${
          validation ? "border-red-400 text-red-400" : ""
        }`}
        {...innerRef}
        {...rest}
      />
      {children}
    </div>
  );
};

export default Input;
