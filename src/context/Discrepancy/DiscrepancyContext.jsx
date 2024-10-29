import { React, createContext, useState } from "react";
import axios from "axios";

const DiscrepancyContext = createContext();
export default DiscrepancyContext;

export const DiscrepancyProvider = ({ children }) => {
  const [getDiscrepancysData, setGetDiscrepancysData] = useState([]);
  const [getDiscrepancysError, setGetDiscrepancysError] = useState(null);
  const [getDiscrepancysIsLoading, setGetDiscrepancysIsLoading] =
    useState(true);

  const [getDiscrepancyData, setGetDiscrepancyData] = useState(null);
  const [getDiscrepancyError, setDiscrepancyError] = useState(null);
  const [getDiscrepancyIsLoading, setDiscrepancyIsLoading] = useState(true);

  const [addDiscrepancyError, setAddDiscrepancyError] = useState(null);
  const [addDiscrepancyIsLoading, setAddDiscrepancyIsLoading] = useState(true);
  const [addDiscrepancyResponse, setAddDiscrepancyResponse] = useState(null);
  const [formData, setFormData] = useState({
    report_id: "",
    reporter: "",
    item_name: "",
    supplier: "",
    expected_quantity: "",
    actual_quantity: "",
    discrepancy_type: "",
    description: "",
    date: "",
  });

  const getDiscrepancys = async () => {
    setGetDiscrepancysIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/discrepancy`);
      setGetDiscrepancysData(response.data.discrepancies);
    } catch (error) {
      setGetDiscrepancysError(error);
    } finally {
      setGetDiscrepancysIsLoading(false);
    }
  };

  const getResolvedDiscrepancys = async () => {
    setGetDiscrepancysIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/discrepancy/resolved`);
      setGetDiscrepancysData(response.data.discrepancies);
    } catch (error) {
      setGetDiscrepancysError(error);
    } finally {
      setGetDiscrepancysIsLoading(false);
    }
  };

  const getDiscrepancy = async (pk) => {
    setDiscrepancyIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/discrepancy/${pk}`);
      setGetDiscrepancyData(response.data.discrepancy);
    } catch (error) {
      setDiscrepancyError(error);
    } finally {
      setDiscrepancyIsLoading(false);
    }
  };

  const handleAddDiscrepancy = async (e) => {
    e.preventDefault();
    setAddDiscrepancyIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const DiscrepancyData = {
      report_id: formData.report_id,
      reporter: formData.reporter,
      item_name: formData.item_name,
      supplier: formData.supplier,
      expected_quantity: formData.expected_quantity,
      actual_quantity: formData.actual_quantity,
      discrepancy_type: e.target.discrepancy_type.value,
      description: formData.description,
      date: formData.date,
    };

    try {
      const result = await axios.post(
        `${baseUrl}/api/discrepancy`,
        DiscrepancyData
      );
      setAddDiscrepancyResponse(result.data);
    } catch (error) {
      setAddDiscrepancyError(error.response.data.message);
      console.log(error);
    } finally {
      setAddDiscrepancyIsLoading(false);
    }
  };

  let contextData = {
    getDiscrepancys: getDiscrepancys,
    getResolvedDiscrepancys: getResolvedDiscrepancys,
    getDiscrepancy: getDiscrepancy,
    handleAddDiscrepancy: handleAddDiscrepancy,
    setAddDiscrepancyResponse: setAddDiscrepancyResponse,
    setAddDiscrepancyError: setAddDiscrepancyError,
    setFormData: setFormData,

    getDiscrepancysIsLoading: getDiscrepancysIsLoading,
    getDiscrepancysError: getDiscrepancysError,
    getDiscrepancysData: getDiscrepancysData,
    getDiscrepancyData: getDiscrepancyData,
    getDiscrepancyError: getDiscrepancyError,
    getDiscrepancyIsLoading: getDiscrepancyIsLoading,
    addDiscrepancyResponse: addDiscrepancyResponse,
    addDiscrepancyIsLoading: addDiscrepancyIsLoading,
    addDiscrepancyError: addDiscrepancyError,
    formData: formData,
  };

  return (
    <DiscrepancyContext.Provider value={contextData}>
      {children}
    </DiscrepancyContext.Provider>
  );
};
