import { convertDateSimple } from "../utils/ConvertDate";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const User = ({
  id,
  username,
  birthdate,
  email,
  phone,
  roles,
  onDelete,
  onUpgrade,
}) => {
  const { auth } = useAuth();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      if (userRoles.includes(import.meta.env.VITE_SUPER_ADMIN_ROLE)) {
        toast.error("You can't delete a superadmin user.", {
          toastId: "error",
        });
        return;
      }

      // Call the onDelete function to update the state in the parent component
      onDelete(id);
    }
  };

  const handleUpgrade = () => {
    const confirmUpgrade = window.confirm(
      "Are you sure you want to upgrade this user to ADMINISTRATOR?"
    );
    if (confirmUpgrade) {
      // Call the onDelete function to update the state in the parent component
      onUpgrade(id);
    }
  };

  const hasRole = (role) => {
    return auth?.roles?.includes(role);
  };

  const userRoles = Array.isArray(roles) ? roles : [roles];

  function mapRoleToLabel(role) {
    switch (role) {
      case import.meta.env.VITE_ADMIN_ROLE:
        return "Admin";
      case import.meta.env.VITE_USER_ROLE:
        return "Usuario";
      case import.meta.env.VITE_SUPER_ADMIN_ROLE:
        return "Superadmin";
      default:
        return role;
    }
  }

  const roleUserSepartedByCommas = userRoles.map(mapRoleToLabel).join(", ");

  return (
    <div className="bg-white p-5 rounded-lg w-full">
      <div className="flex flex-col items-start justify-center gap-3">
        <div className="flex flex-row flex-wrap items-center gap-2 w-full ">
          <div className="font-semibold text-royal-purple">{username}</div>
          <span>|</span>
          <div className="text-gray-600">{email}</div>
          <span>|</span>
          <div className="text-gray-600">{roleUserSepartedByCommas}</div>

          <div className="ml-auto flex gap-2">
            {hasRole(import.meta.env.VITE_SUPER_ADMIN_ROLE) &&
              !userRoles.includes(import.meta.env.VITE_ADMIN_ROLE) &&
              !userRoles.includes(import.meta.env.VITE_SUPER_ADMIN_ROLE) && (
                <button onClick={handleUpgrade} className="text-royal-purple ">
                  Upgrade to admin
                </button>
              )}

            <button onClick={handleDelete} className="text-red-500">
              Delete user
            </button>
          </div>
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
