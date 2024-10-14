import { React, createContext, useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "../General/GeneralContext";

const LocationContext = createContext();

export default LocationContext;

export const LocationProvider = ({ children }) => {
  const [locationsData, setLocationsData] = useState([]);
  const [getItemsDataCount, setGetItemsDataCount] = useState(0);
  const [getItemsPagination, setGetItemsPagination] = useState({});
  const [getItemsError, setGetItemsError] = useState(null);
  const [getItemsIsLoading, setGetItemsIsLoading] = useState(true);

  const [addItemError, setAddItemError] = useState(null);
  const [addItemIsLoading, setAddItemIsLoading] = useState(true);
  const [addItemResponse, setAddItemResponse] = useState(null);

  const [getSingleItemData, setGetSingleItemData] = useState(null);
  const [getSingleItemError, setSingleItemError] = useState(null);
  const [getSingleItemIsLoading, setSingleItemIsLoading] = useState(true);

  const [editItemResponse, seteditItemResponse] = useState(null);
  const [editItemError, seteditItemError] = useState(null);
  const [getButtonLoading, setGetButtonLoading] = useState(true);
  const [editedFormData, seteditedFormData] = useState({
    barcode_id: "",
    name: "",
    description: "",
    brand: "",
    category: "",
    value: "",
    image: "",
    unit_cost: 0,
    quantity: 0,
    reorder_point: 0,
    supplier: "",
  });

  //   const [createReportError, setCreateReportError] = useState(null);
  //   const [createReportIsLoading, setCreateReportIsLoading] = useState(true);
  //   const [createReportResponse, setCreateReportResponse] = useState(null);

  //   const { handleAddFile, addFileError } = useContext(GeneralContext);
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const getLocations = async (url = `${baseUrl}/api/location`) => {
    setGetItemsIsLoading(true);

    try {
      const response = await axios.get(url);
      setLocationsData(response);
    } catch (error) {
      console.log(error);
      setGetItemsError(error);
    } finally {
      setGetItemsIsLoading(false);
    }
  };

  const getSingleLocation = async (pk) => {
    setSingleItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item/${pk}`);

      setGetSingleItemData(response.data.item);
      seteditedFormData({
        barcode_id: response.data.item.barcode_id || "",
        name: response.data.item.name || "",
        description: response.data.item.description || "",
        brand: response.data.item.brand || "",
        category: response.data.item.category || "",
        value: response.data.item.value || "",
        image: response.data.item.image || "",
        unit_cost: response.data.item.unit_cost || 0,
        quantity: response.data.item.quantity || 0,
        reorder_point: response.data.item.reorder_point || 0,
        supplier: response.data.item.supplier || "",
      });
    } catch (error) {
      setSingleItemError(error);
    } finally {
      setSingleItemIsLoading(false);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    setAddItemIsLoading(true);

    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    console.log("hey");
    console.log(formData);

    try {
      const result = await axios.post(`${baseUrl}/api/location`, formData);

      setAddItemResponse(result.data);
    } catch (error) {
      setAddItemError(error.response.data.message);
      console.log(error);
    }

    setAddItemIsLoading(false);
  };

  const handleEditLocation = async (e, pk) => {
    e.preventDefault();
    setGetButtonLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const updatedData = {
      barcode_id: editedFormData.barcode_id,
      name: editedFormData.name,
      description: editedFormData.description,
      brand: editedFormData.brand,
      unit_cost: editedFormData.unit_cost,
      quantity: editedFormData.quantity,
      reorder_point: editedFormData.reorder_point,
      supplier: editedFormData.supplier,
      category: editedFormData.category,
      value: editedFormData.value,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/item/${pk}`,
        updatedData
      );

      seteditItemResponse(result.data);
    } catch (error) {
      seteditItemError(error.response.data.message);
    } finally {
      setGetButtonLoading(false);
    }
  };

  //   const generateReport = async (formatQuery, lga, schoolType) => {
  //     setCreateReportIsLoading(true);
  //     const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  //     try {
  //       const response = await axios.get(
  //         `${baseUrl}/api/item/inventory-report?format=${formatQuery}&lga=${lga}&schoolType=${schoolType}`
  //       );

  //       if (formatQuery === "pdf") {
  //         let doc = new jsPDF();
  //         autoTable(doc, {
  //           head: [["Id", "Name", "Brand", "Category", "Quantity", "Supplier"]],
  //           body: response.data.map((item) => [
  //             item.id,
  //             item.name,
  //             item.brand,
  //             item.category,
  //             item.quantity,
  //             item.supplier,
  //           ]),
  //         });
  //         doc.save("edo-inventory.pdf");
  //         setCreateReportResponse(response);
  //       } else {
  //         var wb = XLSX.utils.book_new();
  //         var ws = XLSX.utils.json_to_sheet(response.data);

  //         XLSX.utils.book_append_sheet(wb, ws, "edo_iventory_report");
  //         XLSX.writeFile(wb, "edo_inventory_report.xlsx");
  //         setCreateReportResponse(response);
  //       }
  //     } catch (error) {
  //       setCreateReportError(error);
  //     } finally {
  //       setCreateReportIsLoading(false);
  //     }
  //   };

  let contextData = {
    getItemsIsLoading: getItemsIsLoading,
    getItemsError: getItemsError,
    locationsData: locationsData,
    getItemsDataCount: getItemsDataCount,
    getItemsPagination: getItemsPagination,
    setGetItemsPagination,
    setLocationsData,
    setGetItemsDataCount,
    addItemError: addItemError,
    addItemIsLoading: addItemIsLoading,
    addItemResponse: addItemResponse,
    getSingleItemIsLoading: getSingleItemIsLoading,
    getSingleItemError: getSingleItemError,
    getButtonLoading: getButtonLoading,
    editedFormData: editedFormData,
    // editItemIsLoading: editItemIsLoading,
    editItemError: editItemError,
    editItemResponse: editItemResponse,
    // createReportError: createReportError,
    // createReportIsLoading: createReportIsLoading,
    // createReportResponse: createReportResponse,

    getLocations: getLocations,
    handleAddLocation: handleAddLocation,
    setAddItemError: setAddItemError,
    setAddItemResponse: setAddItemResponse,
    getSingleLocation: getSingleLocation,
    seteditItemError: seteditItemError,
    seteditItemResponse: seteditItemResponse,
    handleEditLocation: handleEditLocation,
    seteditedFormData: seteditedFormData,
    // setCreateReportResponse: setCreateReportResponse,
    // setCreateReportError: setCreateReportError,
  };

  return (
    <LocationContext.Provider value={contextData}>
      {children}
    </LocationContext.Provider>
  );
};
