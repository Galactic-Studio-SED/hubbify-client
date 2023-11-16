import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const CommentInput = ({ setComments }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.post(
        "/comments/own",
        JSON.stringify({
          content: data.comment,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      setComments((prev) => [response.data.data, ...prev]);

      toast.success("Comment sent successfully.", {
        toastId: "success",
      });

      reset();
    } catch (error) {
      const messageError = error.response?.data?.message || "";
      console.log(messageError);
      toast.error("Error while creating the comment. " + messageError, {
        toastId: "error",
      });
    }
  };

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
            maxLength: 255,
          })}
          placeholder={"Share your thoughts or a post"}
          type={"text"}
        />
        {errors.comment && (
          <span className="ml-4 font-semibold text-red-400" role="alert">
            {errors.comment.type === "required" && "This field is required."}
            {errors.comment.type === "maxLength" &&
              "Comment must not exceed 255 characters."}
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
