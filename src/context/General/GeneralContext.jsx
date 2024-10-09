import { React, createContext, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const GeneralContext = createContext();
export default GeneralContext;

export const GeneralProvider = ({ children }) => {
  const [addFileError, setAddFileError] = useState(null);
  const [FileResponse, setFileResponse] = useState(null);
  const [addFileIsLoading, setAddFileIsLoading] = useState(true);

  const handleAddFile = async (FileData) => {
    setAddFileIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const formDataForImage = new FormData();
    formDataForImage.append("file", FileData);

    try {
      const result = await axios.post(
        `${baseUrl}/api/upload`,
        formDataForImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileResponse(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
      setAddFileError(error.response.data.message);
      return null;
    } finally {
      setAddFileIsLoading(false);
    }
  };

  const exportAccordingToType = (exportType, itemsData) => {
    if (exportType === "") {
      return;
    }
    if (exportType === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["Id", "Name", "Brand", "Category", "Quantity", "Supplier"]],
        body: itemsData.map((item) => [
          item.id,
          item.item_name,
          item.brand,
          item.subject_category,
          item.quantity,
          item.distribution,
        ]),
      });
      doc.save("edo-inventory.pdf");
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(itemsData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_iventory_report");
      XLSX.writeFile(wb, "edo_inventory_report.xlsx");
    }
  };

  const lgaList = [
    {
      pk: 1,
      type: "All",
    },
    {
      pk: 2,
      type: "Akoko Edo",
    },
    {
      pk: 3,
      type: "Egor",
    },
    {
      pk: 4,
      type: "Esan Central",
    },
    {
      pk: 5,
      type: "Esan North-East",
    },
    {
      pk: 6,
      type: "Esan South-East",
    },
    {
      pk: 7,
      type: "Esan West",
    },
    {
      pk: 8,
      type: "Etsako Central",
    },
    {
      pk: 9,
      type: "Etsako East",
    },
    {
      pk: 10,
      type: "Etsako West",
    },
    {
      pk: 11,
      type: "Igueben",
    },
    {
      pk: 12,
      type: "Ikpoba Okha",
    },
    {
      pk: 13,
      type: "Oredo",
    },
    {
      pk: 14,
      type: "Orhionmwon",
    },
    {
      pk: 15,
      type: "Ovia North East",
    },
    {
      pk: 16,
      type: "Ovia South Wast",
    },
    {
      pk: 17,
      type: "Owan East",
    },
    {
      pk: 18,
      type: "Owan West",
    },
    {
      pk: 19,
      type: "Uhunmwode",
    },
  ];

  const schoolLevel = [
    {
      pk: 2,
      type: "JSS",
    },
    {
      pk: 3,
      type: "Primary",
    },
    {
      pk: 4,
      type: "Progressive",
    },
  ];

  let contextData = {
    lgaList: lgaList,
    schoolLevel: schoolLevel,
    addFileError: addFileError,
    FileResponse: FileResponse,
    addFileIsLoading: addFileIsLoading,
    exportAccordingToType: exportAccordingToType,

    handleAddFile: handleAddFile,
  };

  return (
    <GeneralContext.Provider value={contextData}>
      {children}
    </GeneralContext.Provider>
  );
};
