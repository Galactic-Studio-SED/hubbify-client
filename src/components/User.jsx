import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { convertDateSimple } from "../utils/ConvertDate";

const User = ({ id, username, birthdate, email, phone, onDelete }) => {
  const axiosPrivate = useAxiosPrivate();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de borrar el comentario?"
    );
    if (confirmDelete) {
      // Call the onDelete function to update the state in the parent component
      onDelete(id);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg w-full">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row flex-wrap items-center gap-2 w-full ">
          <div className="font-semibold text-royal-purple">{username}</div>
          <span>|</span>
          <div className="text-gray-600">{email}</div>
          <button onClick={handleDelete} className="text-red-500 ml-auto">
            Delete user
          </button>
        </div>
        <div className="text-justify text-deep-dark">
          <p className="font-medium">
            Date of birth:{" "}
            <span className="font-bold">{convertDateSimple(birthdate)}</span>
          </p>
          <p className="font-medium">
            Phone: <span className="font-bold">{phone}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
