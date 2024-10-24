import { React, createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthenticationContext = createContext();
export default AuthenticationContext;

axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("edoUserToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthenticationProvider = ({ children }) => {
  const [userData, setUserData] = useState(() =>
    sessionStorage.getItem("edoUserData")
      ? JSON.parse(sessionStorage.getItem("edoUserData"))
      : null
  );
  const [userToken, setUserToken] = useState(() =>
    sessionStorage.getItem("edoUserToken")
      ? JSON.parse(sessionStorage.getItem("edoUserToken"))
      : null
  );
  const [sigUpResponse, setSigUpResponse] = useState(null);
  const [sigUpError, setSigUpError] = useState(null);
  const [loginError, setloginError] = useState(null);
  const [loginIsLoading, setloginIsLoading] = useState(true);
  const [signInIsLoading, setSignInIsLoading] = useState(true);
  const [messages, setMessages] = useState(0);

  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const handleSigUpSubmit = async (e) => {
    setSignInIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    e.preventDefault();
    const formData = {
      role: e.target.role.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone_number: e.target.phone_number.value,
    };
    try {
      const result = await axios.post(`${baseUrl}/api/auth/register`, formData);
      setSigUpResponse(result.data);
    } catch (error) {
      setSigUpError(error.response.data.message);
    } finally {
      setSignInIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    setloginIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    e.preventDefault();
    const formData = {
      value: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const result = await axios.post(`${baseUrl}/api/auth/login`, formData);
      if (result.data.status === "inactive") {
        setloginError("Account Deactived");
      } else {
        setUserData(result.data.user);
        setUserToken(result.data.token);
        sessionStorage.setItem("edoUserData", JSON.stringify(result.data.user));
        sessionStorage.setItem(
          "edoUserToken",
          JSON.stringify(result.data.token)
        );
        const response = await axios.get(
          `${baseUrl}/api/user/${result.data.user.id}`
        );
        setMessages(response.data.user.message_count);
      }
    } catch (error) {
      setloginError(error.response.data.message);
    } finally {
      setloginIsLoading(false);
    }
  };

  const handleLogOutSubmit = () => {
    setUserData(null);
    setUserToken(null);
    sessionStorage.removeItem("edoUserData");
    sessionStorage.removeItem("edoUserToken");
  };

  const isQA = () => {
    if (userData && userData.role_id === 1) {
      return true;
    }
    return false;
  };
  const isAdmin = () => {
    if (userData && userData.role_id === 2) {
      return true;
    }
    return false;
  };

  const isWareHouser = () => {
    if (userData && userData.role_id === 3) {
      return true;
    }
    return false;
  };

  const isHeadTeacher = () => {
    if (userData && userData.role_id === 4) {
      return true;
    }
    return false;
  };

  const isSubebUser = () => {
    if (userData && userData.role_id === 5) {
      return true;
    }
    return false;
  };

  let contextData = {
    sigUpResponse: sigUpResponse,
    sigUpError: sigUpError,
    loginError: loginError,
    userData: userData,
    loginIsLoading: loginIsLoading,
    signInIsLoading: signInIsLoading,
    handleSigUpSubmit: handleSigUpSubmit,
    handleLoginSubmit: handleLoginSubmit,
    handleLogOutSubmit: handleLogOutSubmit,
    setUserData: setUserData,
    isAdmin: isAdmin,
    isHeadTeacher: isHeadTeacher,
    isSubebUser: isSubebUser,
    isWareHouser: isWareHouser,
    isQA: isQA,
    setloginError: setloginError,
    setSigUpResponse: setSigUpResponse,
    setSigUpError: setSigUpError,
    messages,
    setMessages,
  };

  return (
    <AuthenticationContext.Provider value={contextData}>
      {children}
    </AuthenticationContext.Provider>
  );
};
