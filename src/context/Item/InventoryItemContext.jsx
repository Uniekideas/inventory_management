import { React, createContext, useState, useContext } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import GeneralContext from "../General/GeneralContext";

const InventoryItemContext = createContext();
export default InventoryItemContext;

export const InventoryItemProvider = ({ children }) => {
  const [getItemsData, setGetItemsData] = useState([]);
  const [getItemsDataCount, setGetItemsDataCount] = useState(0);
  const [getLowStockItemsData, setGetLowStockItemsData] = useState([]);
  const [getLowStockItemsDataCount, setGetLowStockItemsDataCount] = useState(0);
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
  const [editItemIsLoading, seteditItemIsLoading] = useState(true);
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

  const [createReportError, setCreateReportError] = useState(null);
  const [createReportIsLoading, setCreateReportIsLoading] = useState(true);
  const [createReportResponse, setCreateReportResponse] = useState(null);

  const { handleAddFile, addFileError } = useContext(GeneralContext);
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const getInventoryItems = async (url = `${baseUrl}/api/item`) => {
    setGetItemsIsLoading(true);

    try {
      const response = await axios.get(url);

      setGetItemsData(response.data.items);
      setGetItemsDataCount(response.data.allItems);
      setGetLowStockItemsData(response.data.lowStockItems);
      setGetLowStockItemsDataCount(response.data.lowStock);
      setGetItemsPagination(response.data.pagination);
    } catch (error) {
      console.log(error);
      setGetItemsError(error);
    } finally {
      setGetItemsIsLoading(false);
    }
  };

  const handleNextPage = (e, url) => {
    e.preventDefault();
    if (url) {
      const secureUrl = url.replace("http://", "https://");
      getInventoryItems(secureUrl);
    }
  };

  const handlePrevPage = (e, url) => {
    e.preventDefault();
    if (url) {
      const secureUrl = url.replace("http://", "https://");
      getInventoryItems(secureUrl);
    }
  };

  const getInventorySingleItem = async (pk) => {
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

  const handleAddItem = async (e) => {
    e.preventDefault();
    setAddItemIsLoading(true);

    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    let fileResponse = null;
    console.log(e.target.image.files.length);
    if (e.target.image.files.length) {
      const imageData = e.target.image.files[0];

      let uploadResponse = await handleAddFile(imageData);

      if (uploadResponse && uploadResponse.success) {
        fileResponse = uploadResponse.url;
      } else {
        setAddItemError(addFileError || "File upload failed");
      }
    }

    const formData = {
      item_name: e.target.item_name.value,
      item_code: e.target.item_code.value,
      brand: e.target.brand.value,
      subject_category: e.target.category.value,
      barcode_id: e.target.barcode_id.value,
      category_id: e.target.category.value,
      image: fileResponse,
      // unit_cost: e.target.unit_cost.value,
      quantity: e.target.quantity.value,
      // reorder_point: e.target.reorder_point.value,
      distribution: e.target.distribution.value,
    };

    try {
      const result = await axios.post(`${baseUrl}/api/item`, formData);

      setAddItemResponse(result.data);
    } catch (error) {
      setAddItemError(error.response.data.message);
      console.log(error);
    }

    setAddItemIsLoading(false);
  };

  const handleEditItem = async (e, pk) => {
    e.preventDefault();
    seteditItemIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    let fileResponse;

    if (e.target.image.files[0]) {
      const imageData = e.target.image.files[0];
      fileResponse = await handleAddFile(imageData);
    }

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
      image:
        fileResponse && fileResponse.success
          ? fileResponse.url
          : editedFormData.image,
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
      seteditItemIsLoading(false);
    }

    if (!fileResponse || !fileResponse.success) {
      seteditItemError(addFileError || "File upload failed");
      seteditItemIsLoading(false);
    }
  };

  const generateReport = async (formatQuery, maximum, lga, schoolType) => {
    setCreateReportIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(
        `${baseUrl}/api/item/inventory-report?max=${maximum}&lga=${lga}&schoolType=${schoolType}`
      );

      if (formatQuery === "pdf") {
        let doc = new jsPDF();
        autoTable(doc, {
          head: [["SN", "Name", "Brand", "Category", "Quantity", "Supplier"]],
          body: response.data.data.map((item, index) => [
            index + 1,
            item.item_name,
            item.brand,
            item.category,
            item.quantity,
            item.supplier,
          ]),
        });
        doc.save("edo-inventory.pdf");
        setCreateReportResponse(response);
      } else {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(response.data.data);

        XLSX.utils.book_append_sheet(wb, ws, "edo_iventory_report");
        XLSX.writeFile(wb, "edo_inventory_report.xlsx");
        setCreateReportResponse(response);
      }
    } catch (error) {
      setCreateReportError(error);
    } finally {
      setCreateReportIsLoading(false);
    }
  };

  let contextData = {
    getItemsIsLoading: getItemsIsLoading,
    getItemsError: getItemsError,
    getItemsData: getItemsData,
    getItemsDataCount: getItemsDataCount,
    getLowStockItemsData: getLowStockItemsData,
    getLowStockItemsDataCount: getLowStockItemsDataCount,
    getItemsPagination: getItemsPagination,
    setGetItemsPagination,
    setGetItemsData,
    setGetItemsDataCount,
    addItemError: addItemError,
    addItemIsLoading: addItemIsLoading,
    addItemResponse: addItemResponse,
    getSingleItemIsLoading: getSingleItemIsLoading,
    getSingleItemError: getSingleItemError,
    getSingleItemData: getSingleItemData,
    editedFormData: editedFormData,
    editItemIsLoading: editItemIsLoading,
    editItemError: editItemError,
    editItemResponse: editItemResponse,
    createReportError: createReportError,
    createReportIsLoading: createReportIsLoading,
    createReportResponse: createReportResponse,

    getInventoryItems: getInventoryItems,
    handleAddItem: handleAddItem,
    setAddItemError: setAddItemError,
    setAddItemResponse: setAddItemResponse,
    getInventorySingleItem: getInventorySingleItem,
    seteditItemError: seteditItemError,
    seteditItemResponse: seteditItemResponse,
    handleEditItem: handleEditItem,
    seteditedFormData: seteditedFormData,
    generateReport: generateReport,
    setCreateReportResponse: setCreateReportResponse,
    setCreateReportError: setCreateReportError,
    handleNextPage: handleNextPage,
    handlePrevPage: handlePrevPage,
  };

  return (
    <InventoryItemContext.Provider value={contextData}>
      {children}
    </InventoryItemContext.Provider>
  );
};
