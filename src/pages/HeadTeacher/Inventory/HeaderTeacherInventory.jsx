import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./HeaderTeacherInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import schoolImage from "../../../assets/schools/shelves.jpg";
import { Link, useNavigate } from "react-router-dom";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import { convertDate } from "../../../utils/HelperFunc";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HeaderTeacherInventory() {
  const navigate = useNavigate();

  const {
    getInventoryItems,
    getItemsData,
    getLowStockItemsData,
    getItemsPagination,
    getItemsDataCount,
    getItemsIsLoading,
    handleNextPage,
    handlePrevPage,
  } = useContext(InventoryItemContext);

  const { ProcessAnalysis, itemDataAnalysis } = useContext(AnalysisContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getInventoryItems();
    setFilteredData(getItemsData);
  }, []);

  const { value, trend } = itemDataAnalysis;

  useEffect(() => {
    ProcessAnalysis(getItemsData, "items");
  }, [getItemsIsLoading]);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getItemsData]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "pdf",
      },
      {
        pk: 2,
        type: "excel",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "ascending",
      },
      {
        pk: 2,
        type: "descending",
      },
    ],
    []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getItemsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handleGenerateReport = () => {
    navigate("/HeadTeacherGenerateInventory");
  };

  const generateReport = async (formatQuery, resultData) => {
    // setCreateReportIsLoading(true);

    const exportData = resultData.map((item, index) => [
      index + 1,
      item.item_name,
      item.subject_category,
      item.quantity,
      item.quantity > 35
        ? "In stock"
        : item.quantity < 1
        ? "Out of stock"
        : "Low on stock",
    ]);

    if (formatQuery === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["SN", "Item Name", "Subject", "Quantity", "stock"]],
        body: exportData,
      });
      doc.save("edo_leader_subeb_inventory_report.pdf");
      //   setCreateReportResponse(response);
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.sheet_add_aoa(
        ws,
        [["SN", "Item Name", "Subject", "Quantity", "stock"]],
        { origin: "A1" }
      );

      XLSX.utils.book_append_sheet(wb, ws, "edo_subeb_inventory_report");
      XLSX.writeFile(wb, "edo_subeb_inventory_report.xlsx");
    }
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon />
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <input
                type="text"
                placeholder="Search Inventory"
                className="seachContentBar px-2"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ display: "block", width: "100%", borderRadius: 10 }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={getItemsDataCount ? getItemsDataCount : 0}
                margin={`${
                  trend === "up" ? "↑" : trend === "down" ? "↓" : "~"
                } ${value}`}
                marginColor={
                  trend === "up"
                    ? "text-success"
                    : trend === "down"
                    ? "text-danger"
                    : "text-primary"
                }
              />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={schoolImage}
                figure={getLowStockItemsData.length}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row>
            <Col className="">
              <Filter
                defult={"None"}
                optionTitle={"Report Format"}
                options={filterOption}
                onSelect={(value) => {
                  generateReport(value, filteredData);
                }}
              />
            </Col>
          </Row>

          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                <>
                  <table className="table rounded mt-5">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Quantity</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((Item, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>
                            <Image
                              src={Item.image}
                              rounded
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>{Item.item_name}</td>
                          <td>{Item.subject_category}</td>
                          <td>{Item.quantity}</td>
                          <td>
                            <span
                              className={
                                Item.quantity > 35
                                  ? "text-success"
                                  : Item.quantity < 1
                                  ? "text-danger"
                                  : "text-warning"
                              }
                            >
                              {Item.quantity > 35
                                ? "In stock"
                                : Item.quantity < 1
                                ? "Out of stock"
                                : "Low on stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 4,
                      marginBottom: 10,
                    }}
                  ></div>
                </>
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no available item! 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default HeaderTeacherInventory;
