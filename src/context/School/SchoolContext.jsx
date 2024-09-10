import { React, createContext, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "../General/GeneralContext";

const SchoolContext = createContext();
export default SchoolContext;

export const SchoolProvider = ({ children }) => {
  const [getSchoolsData, setGetSchoolsData] = useState([]);
  const [getSchoolTotal, setGetSchoolTotal] = useState(0);
  const [getSchoolsError, setGetSchoolsError] = useState(null);
  const [getSchoolsIsLoading, setGetSchoolsIsLoading] = useState(true);

  const [addSchoolError, setAddSchoolError] = useState(null);
  const [addSchoolIsLoading, setAddSchoolIsLoading] = useState(true);
  const [addSchoolResponse, setAddSchoolResponse] = useState(null);

  const [getSingleSchoolData, setGetSingleSchoolData] = useState(null);
  const [getSingleSchoolError, setSingleSchoolError] = useState(null);
  const [getSingleSchoolIsLoading, setSingleSchoolIsLoading] = useState(true);

  const [deleteSchoolResponse, setdeleteSchoolResponse] = useState(null);
  const [deleteSchoolError, setdeleteSchoolError] = useState(null);
  const [deleteSchoolIsLoading, setdeleteSchoolIsLoading] = useState(true);

  const [editSchoolResponse, seteditSchoolResponse] = useState(null);
  const [editSchoolError, seteditSchoolError] = useState(null);
  const [editSchoolIsLoading, seteditSchoolIsLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    name: "",
    website: "",
    email: "",
    phone_number: "",
    level: "",
    address: "",
    city: "",
    lga: "",
    postal_code: "",
    school_image: "",
  });

  const { handleAddFile, addFileError } = useContext(GeneralContext);

  const getSchools = async () => {
    setGetSchoolsIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school`);

      setGetSchoolsData(response.data.schools);
      setGetSchoolTotal(response.data.pagination.total);
    } catch (error) {
      setGetSchoolsError(error);
    } finally {
      setGetSchoolsIsLoading(false);
    }
  };

  const getSingleSchool = async (pk) => {
    setSingleSchoolIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school/${pk}`);
      setGetSingleSchoolData(response.data.school);
      seteditedFormData({
        name: response.data.school.name,
        website: response.data.school.website,
        email: response.data.school.email,
        phone_number: response.data.school.phone_number,
        level: response.data.school.level,
        address: response.data.school.address,
        city: response.data.school.city,
        lga: response.data.school.lga,
        postal_code: response.data.school.postal_code,
      });
    } catch (error) {
      setSingleSchoolError(error);
    } finally {
      setSingleSchoolIsLoading(false);
    }
  };

  const handleAddSchool = async (e) => {
    e.preventDefault();
    setAddSchoolIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    const imageData = e.target.school_image.files[0];

    const fileResponse = await handleAddFile(imageData);

    if (fileResponse && fileResponse.success) {
      const formData = {
        name: e.target.name.value,
        website: e.target.website.value,
        email: e.target.email.value,
        phone_number: e.target.phone_number.value,
        level: e.target.level.value,
        address: e.target.address.value,
        city: e.target.city.value,
        lga: e.target.lga.value,
        postal_code: e.target.postal_code.value,
        school_image: fileResponse.url,
      };
      try {
        const result = await axios.post(`${baseUrl}/api/school`, formData);
        setAddSchoolResponse(result.data);
      } catch (error) {
        setAddSchoolError(error.response.data.message);
        console.log(error);
      } finally {
        setAddSchoolIsLoading(false);
      }
    } else {
      setAddSchoolError(addFileError || "File upload failed");
    }
    setAddSchoolIsLoading(false);
  };

  const handleEditSchool = async (e, pk) => {
    e.preventDefault();
    seteditSchoolIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    let fileResponse;

    if (e.target.school_image.files[0]) {
      const imageData = e.target.school_image.files[0];
      fileResponse = await handleAddFile(imageData);
    }

    const updatedData = {
      name: editedFormData.name,
      website: editedFormData.website,
      email: editedFormData.email,
      phone_number: editedFormData.phone_number,
      level: editedFormData.level,
      address: editedFormData.address,
      city: editedFormData.city,
      lga: editedFormData.lga,
      postal_code: editedFormData.postal_code,
      school_image:
        fileResponse && fileResponse.success
          ? fileResponse.url
          : editedFormData.school_image,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/school/${pk}`,
        updatedData
      );
      seteditSchoolResponse(result.data);
    } catch (error) {
      seteditSchoolError(error.response.data.message);
      console.log(error);
    } finally {
      seteditSchoolIsLoading(false);
    }

    if (!fileResponse || !fileResponse.success) {
      seteditSchoolError(addFileError || "File upload failed");
      seteditSchoolIsLoading(false);
    }
  };

  const deleteSchool = async (pk) => {
    setdeleteSchoolIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.delete(`${baseUrl}/api/school/${pk}`);
      setdeleteSchoolResponse(response.data.message);
    } catch (error) {
      setdeleteSchoolError(error.response.data.message);
    } finally {
      setdeleteSchoolIsLoading(false);
    }
  };

  let contextData = {
    getSchools: getSchools,
    handleAddSchool: handleAddSchool,
    setAddSchoolResponse: setAddSchoolResponse,
    setAddSchoolError: setAddSchoolError,
    getSingleSchool: getSingleSchool,
    deleteSchool: deleteSchool,
    seteditedFormData: seteditedFormData,
    handleEditSchool: handleEditSchool,
    seteditSchoolResponse: seteditSchoolResponse,
    seteditSchoolError: seteditSchoolError,
    getSchoolsIsLoading: getSchoolsIsLoading,
    getSchoolsError: getSchoolsError,
    getSchoolTotal: getSchoolTotal,
    getSchoolsData: getSchoolsData,
    addSchoolResponse: addSchoolResponse,
    addSchoolIsLoading: addSchoolIsLoading,
    addSchoolError: addSchoolError,
    getSingleSchoolIsLoading: getSingleSchoolIsLoading,
    getSingleSchoolError: getSingleSchoolError,
    getSingleSchoolData: getSingleSchoolData,
    deleteSchoolResponse: deleteSchoolResponse,
    deleteSchoolIsLoading: deleteSchoolIsLoading,
    deleteSchoolError: deleteSchoolError,
    editedFormData: editedFormData,
    editSchoolIsLoading: editSchoolIsLoading,
    editSchoolError: editSchoolError,
    editSchoolResponse: editSchoolResponse,
  };

  return (
    <SchoolContext.Provider value={contextData}>
      {children}
    </SchoolContext.Provider>
  );
};
