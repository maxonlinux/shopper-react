import { InternalAxiosRequestConfig } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { GeneralError } from "../types/general";

interface JwtToken extends JwtPayload {
  exp: number;
}

const checkToken = async (config: InternalAxiosRequestConfig) => {
  if (config.headers?.Authorization) {
    const token = config.headers.Authorization as string;

    const decodedToken = jwtDecode(token) as JwtToken;
    const now = Date.now() / 1000;

    if (decodedToken.exp < now) {
      const error = new Error("Token expired! Please log in");
      (error as GeneralError).isAuthExpired = true;
      throw error;
    }
  }

  return config;
};

export default checkToken;
