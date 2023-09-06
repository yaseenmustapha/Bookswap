import React, { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

function useProvideAuth() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt", "username"]);
  const isAuthenticated = !!cookies.jwt;
  const token = cookies.jwt;
  const currentUser = cookies.username;

  const login = async (username, password) => {
    return axiosClient
      .post("/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setCookie("jwt", response.data.access_token);
        setCookie("username", username);
        return response.status;
      });
  };

  const logout = () => {
    removeCookie("jwt", { path: "/" });
    removeCookie("username", { path: "/" });
  };

  const register = async (username, email, password) => {
    return axiosClient
      .post("/user", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        setCookie("jwt", response.data.access_token);
        setCookie("username", username);
        return response.status;
      });
  };

  return {
    isAuthenticated,
    token,
    currentUser,
    login,
    logout,
    register,
  };
}
