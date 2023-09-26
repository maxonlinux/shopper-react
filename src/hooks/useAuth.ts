import { IUser } from "../types/user";
import { ICredentials, IRegister } from "../types/credentials";
import { ToastStatus } from "../types/toaster";
import { useToaster } from "../components/Context/ToasterContext";
import { useUser } from "../components/Context/UserContext";
import api from "../axios/config";
import { ApiError } from "../types/general";

// Constants
const SIGNUP_URL = "/auth/signup";
const SIGNIN_URL = "/auth/signin";

export const useAuth = () => {
  // Context
  const { addToast } = useToaster();
  const { user, setUser } = useUser();

  // Handlers
  const handleSuccess = (response: any) => {
    const { token, id, role, username }: IUser = response.data.user;

    const userData = {
      id,
      username,
      token,
      role,
    };

    setUser(userData);
    addToast("Success", ToastStatus.Success);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleError = (error: ApiError) => {
    if (error.response) {
      addToast(error.response.data.message, ToastStatus.Error);
    } else {
      addToast(error.message, ToastStatus.Error);
    }
  };

  // Register
  const register = async (data: IRegister) => {
    try {
      const response = await api.post(SIGNUP_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      handleSuccess(response);
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  // Login
  const logIn = async (data: ICredentials) => {
    try {
      const response = await api.post(SIGNIN_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      handleSuccess(response);
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  // Logout
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, register, logIn, logOut };
};
