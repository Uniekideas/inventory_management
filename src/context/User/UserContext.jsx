import { React, createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import GeneralContext from "../General/GeneralContext";
import debounce from "lodash.debounce";

const UserContext = createContext();
export default UserContext;

export const UsersProvider = ({ children }) => {
  const [getUsersData, setGetUsersData] = useState([]);
  const [getUsersError, setGetUsersError] = useState(null);
  const [getUsersIsLoading, setGetUsersIsLoading] = useState(true);

  const [getSingleUserData, setGetSingleUserData] = useState(null);
  const [getSingleUserError, setSingleUserError] = useState(null);
  const [getSingleUserIsLoading, setSingleUserIsLoading] = useState(true);

  const [addUserError, setAddUserError] = useState(null);
  const [addUserIsLoading, setAddUserIsLoading] = useState(true);
  const [addUserResponse, setAddUserResponse] = useState(null);

  const [userStatusResponse, setUserStatusResponse] = useState(null);
  const [userStatusError, setUserStatusError] = useState(null);
  const [userStatusIsLoading, setUserStatusIsLoading] = useState(true);

  const [editUserResponse, seteditUserResponse] = useState(null);
  const [editUserError, seteditUserError] = useState(null);
  const [editUserIsLoading, seteditUserIsLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    name: "",
    username: "",
    oracle_id: "",
    email: "",
    phone_number: "",
    level: "",
    image: "",
    role: "",
    department: "",
  });

  const { handleAddFile, addFileError } = useContext(GeneralContext);

  const getUsers = async () => {
    setGetUsersIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/user`);
      setGetUsersData(response.data.users);
    } catch (error) {
      setGetUsersError(error);
    } finally {
      setGetUsersIsLoading(false);
    }
  };

  const getSingleUser = async (pk) => {
    setSingleUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/user/${pk}`);
      setGetSingleUserData(response.data.user);
      console.log("hey");
      console.log(response.data);
      seteditedFormData({
        name: response.data.user.name || "",
        username: response.data.user.username || "",
        oracle_id: response.data.user.oracle_id || "",
        email: response.data.user.email || "",
        phone_number: response.data.user.phone_number || "",
        level: response.data.user.level || "",
        image: response.data.user.image || "",
        role: response.data.user.role_id || "",
        department: response.data.user.department || "",
      });
    } catch (error) {
      setSingleUserError(error);
    } finally {
      setSingleUserIsLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    // console.log(e.target.name.value);
    const imageData = e.target.image.files[0];

    const fileResponse = await handleAddFile(imageData);

    if (fileResponse && fileResponse.success) {
      const formData = {
        name: e.target.name.value,
        username: e.target.username.value,
        oracle_id: e.target.oracle_id.value,
        email: e.target.email.value,
        phone_number: e.target.phone_number.value,
        level: e.target.level.value,
        role: e.target.role.value,
        department: e.target.department.value,
        image: fileResponse.url,
        school: e.target.school.value,
      };
      try {
        const result = await axios.post(`${baseUrl}/api/user`, formData);
        setAddUserResponse(result.data);
      } catch (error) {
        setAddUserError(error.response.data.message);
        console.log(error);
      } finally {
        setAddUserIsLoading(false);
      }
    } else {
      setAddUserError(addFileError || "File upload failed");
    }
    setAddUserIsLoading(false);
  };

  const handleEditUser = async (e, pk) => {
    e.preventDefault();
    seteditUserIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    let fileResponse;

    if (e.target.image.files[0]) {
      const imageData = e.target.image.files[0];
      fileResponse = await handleAddFile(imageData);
    }

    const updatedData = {
      name: editedFormData.name,
      username: editedFormData.username,
      oracle_id: editedFormData.oracle_id,
      email: editedFormData.email,
      phone_number: editedFormData.phone_number,
      level: editedFormData.level,
      role:
        editedFormData.role === 1
          ? "qa"
          : editedFormData.role === 2
          ? "admin"
          : editedFormData.role === 3
          ? "warehouse-staff"
          : editedFormData.role === 4
          ? "head-teacher"
          : editedFormData.role,
      department: editedFormData.department,
      image:
        fileResponse && fileResponse.success
          ? fileResponse.url
          : editedFormData.image,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/user/${pk}`,
        updatedData
      );
      seteditUserResponse(result.data.message);
    } catch (error) {
      seteditUserError(error.response.data.message);
    } finally {
      seteditUserIsLoading(false);
    }

    if (!fileResponse || !fileResponse.success) {
      seteditUserError(addFileError || "File upload failed");
      seteditUserIsLoading(false);
    }
  };

  const handleUserStatus = useCallback(
    debounce(async (pk) => {
      setUserStatusIsLoading(true);
      const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
      try {
        const result = await axios.patch(
          `${baseUrl}/api/user/update-status/${pk}`
        );
        setUserStatusResponse(result.data.message);
      } catch (error) {
        setUserStatusError(error.response.data.message);
        console.log(error);
      } finally {
        setUserStatusIsLoading(false);
      }
    }, 500),
    []
  );

  let contextData = {
    getUsers: getUsers,
    getSingleUser: getSingleUser,
    handleAddUser: handleAddUser,
    setAddUserResponse: setAddUserResponse,
    setAddUserError: setAddUserError,
    seteditedFormData: seteditedFormData,
    handleEditUser: handleEditUser,
    seteditUserResponse: seteditUserResponse,
    seteditUserError: seteditUserError,

    handleUserStatus: handleUserStatus,
    getUsersIsLoading: getUsersIsLoading,
    getUsersError: getUsersError,
    getUsersData: getUsersData,
    getSingleUserIsLoading: getSingleUserIsLoading,
    getSingleUserError: getSingleUserError,
    getSingleUserData: getSingleUserData,
    addUserResponse: addUserResponse,
    addUserIsLoading: addUserIsLoading,
    addUserError: addUserError,
    editedFormData: editedFormData,
    editUserIsLoading: editUserIsLoading,
    editUserError: editUserError,
    editUserResponse: editUserResponse,
    userStatusIsLoading: userStatusIsLoading,
    userStatusError: userStatusError,
    userStatusResponse: userStatusResponse,
  };
  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};
