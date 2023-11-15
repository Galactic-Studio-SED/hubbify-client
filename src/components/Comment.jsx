import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Comment = ({
  id,
  userId,
  name,
  content,
  createdAt,
  onUpdate,
  onDelete,
}) => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de borrar el comentario?"
    );
    if (confirmDelete) {
      try {
        const response = axiosPrivate.delete(`/comments/own/${id}`);

        toast.success("Comment deleted successfully.", {
          toastId: "success",
        });

        // Call the onDelete function to update the state in the parent component
        onDelete(id);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.put(
        `/comments/own/${id}`,
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

      toast.success("Comment updated successfully.", {
        toastId: "success",
      });

      // Call the onUpdate function to update the state in the parent component
      onUpdate(id, data.comment);

      handleSaveEdit();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onInvalid = () => {
    toast.warn("try again, please.", {
      toastId: "warning",
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg ">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row flex-wrap items-center gap-2 w-full ">
          <div className="font-semibold text-royal-purple">{name}</div>
          <span>|</span>
          <div className="text-gray-600">{createdAt}</div>
          {auth && auth.id === userId && (
            <div className="grid grid-cols-2 gap-2 ml-auto">
              <button onClick={handleDelete} className="text-red-500">
                Borrar
              </button>
              <button onClick={handleEdit} className="text-royal-purple">
                Modificar
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="w-full flex flex-col gap-3"
          >
            <div>
              <textarea
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
                onChange={(e) => setEditedContent(e.target.value)}
                value={editedContent}
                rows="2"
                cols="50"
              />
              {errors.comment && (
                <span className="ml-4 font-semibold text-red-400" role="alert">
                  {errors.comment.type === "required" &&
                    "This field is required."}
                  {errors.comment.type === "maxLength" &&
                    "Comment must not exceed 500 characters."}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 ml-auto">
              <button
                type="submit"
                className="min-w-[90px] w-fit rounded-lg font-medium bg-royal-purple py-2.5 px-4 text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="min-w-[90px] w-fit rounded-lg font-medium bg-red-400 py-2.5 px-4 text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-justify text--deep-dark">
            <p className="font-medium">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
