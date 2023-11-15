import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      /*const response = await axios.get("/auth/refresh", {
        //headers: {
        //Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        //},
        withCredentials: true,
      });
      setAuth((prev) => {

        return {
          ...prev,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      });

      return response.data.accessToken;*/
    } catch (error) {
      console.log(error.message);
    }
  };

  return { refresh };
};

export default useRefreshToken;
