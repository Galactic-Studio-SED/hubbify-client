import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CommentInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};

  const onInvalid = () => {
    toast.warn("try again, please.", {
      toastId: "warning",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="bg-white p-5 rounded-lg flex items-center justify-center gap-4 "
    >
      <div className="w-full">
        <input
          className={`w-full border-gray-300 bg-gray-100 py-2.5 px-4 border rounded-lg  ${
            errors.comment ? "border-red-400 text-red-400" : ""
          }`}
          id={"comment"}
          name={"comment"}
          aria-invalid={errors.comment ? "true" : "false"}
          {...register("comment", {
            required: true,
            maxLength: 300,
          })}
          placeholder={"Share your thoughts or a post"}
          type={"text"}
        />
        {errors.comment && (
          <span className="ml-4 font-semibold text-red-400" role="alert">
            {errors.comment.type === "required" && "This field is required."}
            {errors.comment.type === "maxLength" &&
              "Comment must not exceed 500 characters."}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="min-w-[90px] rounded-lg font-medium bg-royal-purple py-2.5 px-4 text-white"
      >
        Send
      </button>
    </form>
  );
};

export default CommentInput;
