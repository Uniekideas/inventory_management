import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";

const isAuthenticated = () => {
  return sessionStorage.getItem("edoUserData") !== null;
};

function PrivateRoute() {
  const { userData } = useContext(AuthenticationContext);

  return !userData ? <Navigate to="/Login" replace /> : <Outlet />;
}
export default PrivateRoute;

export const PrivatteAuthentactionRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to={"/"} replace /> : children;
};

export const PrivatteQARoute = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    if (userData && userData.role_id !== 1) {
      navigate(-1);
    }
  }, [userData, navigate]);

  return userData && userData.role_id === 1 ? <Outlet /> : null;
};

export const PrivatteAdminRoute = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    if (userData && userData.role_id !== 2) {
      navigate(-1);
    }
  }, [userData, navigate]);

  return userData && userData.role_id === 2 ? <Outlet /> : null;
};

export const PrivatteWareHouseRoute = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    if (userData && userData.role_id !== 3) {
      navigate(-1);
    }
  }, [userData, navigate]);

  return userData && userData.role_id === 3 ? <Outlet /> : null;
};

export const PrivatteHeadTeacherRoute = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    if (userData && userData.role_id !== 4) {
      navigate(-1);
    }
  }, [userData, navigate]);

  return userData && userData.role_id === 4 ? <Outlet /> : null;
};

export const PrivateSubebUserRoute = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthenticationContext);

  useEffect(() => {
    if (userData && userData.role_id !== 5) {
      navigate(-1);
    }
  }, [userData, navigate]);

  return userData && userData.role_id === 5 ? <Outlet /> : null;
};
