import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Header from "../containers/Header";
import User from "../components/User";

const UsersPage = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController(); // To cancel the fetch request

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });

        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error("Error while fetching users. Please try again.", {
          toastId: "error",
        });
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    try {
      const response = axiosPrivate.delete(`/users/${id}`);

      toast.success("User deleted successfully.", {
        toastId: "success",
      });

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpgradeUser = (id) => {
    try {
      const response = axiosPrivate.put(`/users/upgrade/${id}`);

      /* const response = axiosPrivate.put(`/users/${id}`, {
        roles: ["ADMINISTRATOR"],
      });*/

      toast.success("User upgraded successfully.", {
        toastId: "success",
      });

      setUsers(
        users.map((user) => {
          if (user.id === id) {
            console.log(user);
            return {
              ...user,
              role: [import.meta.env.VITE_ADMIN_ROLE],
            };
          }

          return user;
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="mt-3 max-w-[1440px] px-8 mx-auto">
        <div className="bg-white p-8 rounded-lg mb-6">
          <div className="flex justify-between items-center gap-2">
            <h1 className="font-bold text-xl">Users list</h1>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {users?.map((user) => (
            <User
              key={user.id}
              id={user.id}
              username={user.username}
              birthdate={user.birthdate}
              email={user.email}
              phone={user.phone}
              roles={user.role}
              onDelete={handleDeleteUser}
              onUpgrade={handleUpgradeUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
