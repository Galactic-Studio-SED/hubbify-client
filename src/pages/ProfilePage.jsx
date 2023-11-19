import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Header from "../containers/Header";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import validatePassword from "../utils/ValidatePassword";

const ProfilePage = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [isEditing, setIsEditing] = useState(false);

  const roles = Array.isArray(auth.roles)
    ? auth.roles.map((role) => mapRoleToLabel(role))
    : [mapRoleToLabel(auth.roles)];

  function mapRoleToLabel(role) {
    switch (role) {
      case import.meta.env.VITE_ADMIN_ROLE:
        return "Administrador";
      case import.meta.env.VITE_USER_ROLE:
        return "Usuario";
      case import.meta.env.VITE_SUPER_ADMIN_ROLE:
        return "Superadministrador";
      default:
        return role;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  useEffect(() => {
    const controller = new AbortController(); // To cancel the fetch request

    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get("/users/own", {
          signal: controller.signal,
        });

        setUser(response.data.data[0]);
      } catch (error) {
        const messageError = error.response?.data?.message || "";
        console.log(messageError);
        if (error.response?.data?.statusCode === 429) {
          toast.error(
            "You have exceeded the number of requests. Try again later.",
            {
              toastId: "error",
            }
          );
        } else {
          toast.error("Error while fetching profile. " + messageError, {
            toastId: "error",
          });
        }
      }
    };

    getProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  const handleSaveEdit = (newUserData) => {
    setIsEditing(false);
    setUser(newUserData); // Set the new user data received from the server
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.put(
        `/users/own`,
        JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          phone: data.phone,
          birthdate: data.dob,
        })
      );

      toast.success("User updated successfully.", {
        toastId: "success",
      });

      handleSaveEdit(response.data.data);
    } catch (error) {
      const messageError = error.response?.data?.message || "";
      console.log(messageError);
      if (error.response?.data?.statusCode === 429) {
        toast.error(
          "You have exceeded the number of requests. Try again later.",
          {
            toastId: "error",
          }
        );
      } else {
        toast.error("Error while updating profile. " + messageError, {
          toastId: "error",
        });
      }
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
    <>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="mt-3 max-w-[1440px] px-8 mx-auto">
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-between items-center gap-2">
              <h1 className="text-xl font-bold mb-10">Profile</h1>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="text-royal-purple font-bold"
                >
                  Edit profile
                </button>
              ) : (
                <button
                  onClick={handleCancelEdit}
                  className="text-royal-purple font-bold"
                >
                  Cancel
                </button>
              )}
            </div>
            {!isEditing ? (
              <div className="flex flex-col gap-5 mt-5">
                <p className="text-royal-purple font-bold">
                  Username:
                  <span className="text-gray-800"> {user?.username}</span>
                </p>
                <p className="text-royal-purple font-bold">
                  Email:
                  <span className="text-gray-800"> {user?.email}</span>
                </p>
                <p className="text-royal-purple font-bold">
                  Role:
                  <span className="text-gray-800"> {roles}</span>
                </p>
                <p className="text-royal-purple font-bold">
                  Date of Birth:
                  <span className="text-gray-800"> {user?.birthdate}</span>
                </p>
                <p className="text-royal-purple font-bold">
                  Phone Number:
                  <span className="text-gray-800"> {user?.phone}</span>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="flex flex-col gap-3"
              >
                <div>
                  <label htmlFor="username" className="font-semibold">
                    <span className="text-royal-purple font-bold">
                      Username
                    </span>
                    <span className="text-black ml-2">*</span>
                  </label>

                  <Input
                    id={"username"}
                    name={"username"}
                    aria-invalid={errors.username ? "true" : "false"}
                    innerRef={{
                      ...register("username", {
                        required: true,
                        maxLength: 50,
                      }),
                    }}
                    validation={errors.username}
                    placeholder={"e.g. john_doe123"}
                    type={"text"}
                    defaultValue={isEditing ? user?.username : ""}
                  >
                    {errors.username && (
                      <span
                        className="ml-4 font-semibold text-red-400"
                        role="alert"
                      >
                        {errors.username.type === "required" &&
                          "This field is required."}
                        {errors.username.type === "maxLength" &&
                          "Username must not exceed 50 characters."}
                      </span>
                    )}
                  </Input>
                </div>

                <div>
                  <label htmlFor="email" className="font-semibold">
                    <span className="text-royal-purple font-bold">Email</span>
                    <span className="text-black ml-2">*</span>
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
                    defaultValue={isEditing ? user?.email : ""}
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
                  <label htmlFor="phone" className="font-semibold">
                    <span className="text-royal-purple font-bold">Phone</span>
                  </label>

                  <Input
                    id={"phone"}
                    name={"phone"}
                    aria-invalid={errors.phone ? "true" : "false"}
                    innerRef={{
                      ...register("phone", {
                        maxLength: 20,
                        pattern: /^[\d()-\s]+$/,
                      }),
                    }}
                    validation={errors.phone}
                    placeholder={"e.g. 123-456-7890"}
                    type={"tel"}
                    defaultValue={isEditing ? user?.phone : ""}
                  >
                    {errors.phone && (
                      <span
                        className="ml-4 font-semibold text-red-400"
                        role="alert"
                      >
                        {errors.phone.type === "maxLength" &&
                          "Phone number must not exceed 20 digits."}
                        {errors.phone.type === "pattern" &&
                          "Please enter a valid phone number."}
                      </span>
                    )}
                  </Input>
                </div>

                <div>
                  <label htmlFor="dob" className="font-semibold">
                    <span className="text-royal-purple font-bold">
                      Date of Birth
                    </span>
                  </label>

                  <Input
                    id="dob"
                    name="dob"
                    aria-invalid={errors.dob ? "true" : "false"}
                    innerRef={{ ...register("dob") }}
                    validation={errors.dob}
                    type="date"
                    defaultValue={isEditing ? user?.birthdate : ""}
                  >
                    {errors.dob && (
                      <span
                        className="ml-4 font-semibold text-red-400"
                        role="alert"
                      >
                        {errors.dob.type === "required" &&
                          "This field is required."}
                      </span>
                    )}
                  </Input>
                </div>

                <div>
                  <label htmlFor="password" className="font-semibold">
                    <span className="text-royal-purple font-bold">
                      Password
                    </span>
                    <span className="text-black ml-2">*</span>
                  </label>

                  <Input
                    id={"password"}
                    name={"password"}
                    aria-invalid={errors.password ? "true" : "false"}
                    innerRef={{
                      ...register("password", {
                        required: true,
                        validate: validatePassword,
                      }),
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
                        {errors.password.type === "required"
                          ? "This field is required."
                          : errors.password.message}
                      </span>
                    )}
                  </Input>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="font-semibold">
                    <span className="text-royal-purple font-bold">
                      Confirm Password
                    </span>
                    <span className="text-black ml-2">*</span>
                  </label>

                  <Input
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    innerRef={{
                      ...register("confirmPassword", {
                        required: true,
                        validate: (val) => {
                          if (watch("password") != val) {
                            return "Your passwords do no match.";
                          }
                        },
                      }),
                    }}
                    validation={errors.confirmPassword}
                    placeholder={"**********"}
                    type={"password"}
                    autoComplete={"off"}
                  >
                    {errors.confirmPassword && (
                      <span
                        className="ml-4 font-semibold text-red-400"
                        role="alert"
                      >
                        {errors.confirmPassword.type === "required" &&
                          "This field is required."}
                        {errors.confirmPassword.type === "validate" &&
                          "Your passwords do no match."}
                      </span>
                    )}
                  </Input>
                </div>

                <button
                  type="submit"
                  className="rounded-full font-medium bg-black py-2.5 px-4 text-white"
                >
                  Update Profile
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
