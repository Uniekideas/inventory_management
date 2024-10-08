import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Container, Row, Col, Table } from "react-bootstrap";
import "../../WareHouseStaff/Dashboard/WareHouseDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard, {
  NoImagCard,
} from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import BarGraph from "../../../components/Graph/BarGraph";

import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import LineGraph from "../../../components/Graph/LineGraph";
import DoughnutGraph from "../../../components/Graph/DoughnutGraph";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function HeadTeacherDashboard() {
  const {
    getInventoryItems,
    getItemsData,
    getLowStockItemsData,
    getItemsIsLoading,
    setGetItemsData,
  } = useContext(InventoryItemContext);

  const [filter, setFilter] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [count, setCount] = useState(0);
  const [exportType, setExportType] = useState("");
  const { ProcessAnalysis, itemDataAnalysis, schoolDataAnalysis } =
    useContext(AnalysisContext);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(getItemsData.length / itemsPerPage);
  const paginatedData = getItemsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getInventoryItems();
  }, []);

  const exportAccordingToType = () => {
    if (exportType === "") {
      return;
    }
    if (exportType === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["Id", "Name", "Brand", "Category", "Quantity", "Supplier"]],
        body: getItemsData.map((item) => [
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
      var ws = XLSX.utils.json_to_sheet(getItemsData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_iventory_report");
      XLSX.writeFile(wb, "edo_inventory_report.xlsx");
    }
  };
  useEffect(() => {
    exportAccordingToType();
  }, [exportType]);

  useEffect(() => {
    ProcessAnalysis(getItemsData);
    if (filter === "All") {
      setGetItemsData(originalItems);
    }

    if (filter === "AKOKO EDO") {
      setGetItemsData(
        originalItems.filter(
          (item) =>
            item.name === "Pencil" ||
            item.name === "Eraser" ||
            item.name === "Sharpner"
        )
      );
    }
    if (filter === "EGOR") {
      setGetItemsData(
        originalItems.filter(
          (item) =>
            item.name === "Mathematics Textbook – Grade 1" ||
            item.name === "Mathematics Textbook - Grade 2" ||
            item.name === "Literacy Text Book - Grade 1"
        )
      );
    }
    if (filter === "ESAN CENTRAL") {
      setGetItemsData(
        originalItems.filter(
          (item) => item.name === "Laptops" || item.name === "ChalkBoard"
        )
      );
    }
    if (filter && filter === "JSS") {
      setGetItemsData(
        originalItems.filter(
          (item) =>
            item.name === "Pencil" ||
            item.name === "Eraser" ||
            item.name === "Sharpner"
        )
      );
    }
    if (filter && filter === "Primary") {
      setGetItemsData(
        originalItems.filter(
          (item) =>
            item.name === "Mathematics Textbook – Grade 1" ||
            item.name === "Mathematics Textbook - Grade 2" ||
            item.name === "Literacy Text Book - Grade 1"
        )
      );
    }
    if (filter && filter === "Progressive") {
      setGetItemsData(
        originalItems.filter(
          (item) => item.name === "Laptops" || item.name === "ChalkBoard"
        )
      );
    }
  }, [getItemsIsLoading]);

  const { value: InvetoryDifference, trend: InvetoryTrend } = itemDataAnalysis;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterForExport = [
    {
      pk: 1,
      type: "pdf",
    },
    {
      pk: 2,
      type: "excel",
    },
  ];
  const filterData = [
    {
      pk: 1,
      type: "Last 24hrs",
    },
    {
      pk: 2,
      type: "Last 3 Days",
    },
    {
      pk: 3,
      type: "Last 7 Days",
    },
  ];
  const filterOptionforLGA = useMemo(
    () => [
      {
        pk: 1,
        type: "All",
      },

      {
        pk: 2,
        type: "AKOKO EDO",
      },
      {
        pk: 3,
        type: "EGOR",
      },
      {
        pk: 4,
        type: "ESAN CENTRAL",
      },
      {
        pk: 5,
        type: "ESAN NORTH EAST",
      },
      {
        pk: 6,
        type: "ESAN SOUTH EAST",
      },
      {
        pk: 7,
        type: "ESAN WEST",
      },
      {
        pk: 8,
        type: "ETSAKO CENTRAL",
      },
      {
        pk: 9,
        type: "ETSAKO EAST",
      },
      {
        pk: 10,
        type: "ETSAKO WEST",
      },
      {
        pk: 11,
        type: "IGUEBEN",
      },
      {
        pk: 12,
        type: "IKPOBA OKHA",
      },
      {
        pk: 13,
        type: "OREDO",
      },
      {
        pk: 14,
        type: "ORHIONMWON",
      },
      {
        pk: 15,
        type: "OVIA NORTH EAST",
      },
      {
        pk: 16,
        type: "OVIA SOUTH WEST",
      },
      {
        pk: 17,
        type: "OWAN EAST",
      },
      {
        pk: 18,
        type: "OWAN WEST",
      },
      {
        pk: 19,
        type: "UHUNMWODE",
      },
    ],
    []
  );

  const filterOptionForType = useMemo(() => [
    {
      pk: 1,
      type: "All",
    },
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
  ]);
  const Bardata = {
    labels: paginatedData.map((item) => item.item_name),

    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: getItemsData.map((item) => item.quantity),
      },
    ],
  };
  const Baroptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        type: "linear",
        ticks: {
          font: {
            size: "12px",
            weight: "400",
            lineHeight: "25.6px",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: "12px",
            weight: "400",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Piedata = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [300, 50, 100, 40, 120, 75],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    cutout: "50%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Arkdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Material Usage",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 750, 650],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const Arkoptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  const handleRequestMaterial = () => {
    navigate("/HeadTeacherRequestMaterial");
  };

  const handleHeaderTeacherInventory = () => {
    navigate("/HeaderTeacherInventory");
  };
  const handleReports = () => {
    navigate("/ReportDiscrepancy");
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   // Add your date filtering logic here
  // };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            {/* <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
              onDateChange={handleDateChange}
            /> */}
          </div>
          <Row className="mb-3" style={{ margin: "auto" }}>
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"View Inventory"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/HeaderTeacherInventory")}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Request Materials"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/HeadTeacherRequestMaterial")}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Report Discrepancy"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/ReportDiscrepancy")}
              />
            </Col>
          </Row>
          <Row className="mb-3 mt-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <TitleHeader
                text={"Inventory Overview"}
                headerTextStyle={"headerTextStyle"}
              />
              {/* <div className="d-flex justify-content-end " style={{ gap: 5 }}>
                <Filter
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
                <Filter
                  optionTitle={"LGA"}
                  options={filterOptionforLGA}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
              </div> */}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={6} xl={5} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Inventory Items"}
                image={schoolImage}
                figure={getItemsData.length ? getItemsData.length : 0}
                margin={`${
                  InvetoryTrend === "up"
                    ? "↑"
                    : InvetoryTrend === "down"
                    ? "↓"
                    : "~"
                } ${InvetoryDifference}`}
                marginColor={
                  InvetoryTrend === "up"
                    ? "text-success"
                    : InvetoryTrend === "down"
                    ? "text-danger"
                    : "text-primary"
                }
              />
            </Col>
            <Col lg={6} md={6} xl={5} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={inventoryImage}
                figure={
                  getLowStockItemsData.length ? getLowStockItemsData.length : 0
                }
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>

            <Row className="mt-5">
              <Col className="">
                <h3 className="px-2">Low Stock Items</h3>
                <Container>
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <Table
                      responsive="lg"
                      striped
                      bordered
                      hover
                      className="mt-3"
                    >
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Item Code</th>
                          <th className="">Barcode ID</th>
                          <th className="">Category</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getLowStockItemsData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.item_name}</td>
                            <td>{item.item_code}</td>
                            <td className="">{item.barcode_id}</td>
                            <td className="">{item.subject_category}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Container>
                {/* <BarGraph data={Bardata} options={Baroptions} />
              <div style={{ width: 150, margin: "auto" }}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mt-3 mx-3 fa-2x backButtonIcon"
                  onClick={handlePreviousPage}
                />

                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="mt-3 mx-3 fa-2x backButtonIcon"
                  onClick={handleNextPage}
                />
              </div> */}
              </Col>
            </Row>
          </Row>
          <Row className="d-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <Filter
                optionTitle={"Export Data"}
                options={filterForExport}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
              />
            </Col>
          </Row>

          {/* <Row className="d-none d-lg-flex">
            <Col lg={6} md={5} xl={6}>
              <TitleHeader
                text={"Inventory Insights"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={6} xl={4} sm={12} xs={12} className="mb-3">
              <DoughnutGraph data={Piedata} options={Pieoptions} />
            </Col>
            <Col lg={6} md={6} xl={8} sm={12} xs={12} className="">
              <LineGraph data={Arkdata} options={Arkoptions} />
            </Col>
          </Row> 
          <Row className="mb-3 mt-5 gap-3">
            <TitleHeader
              text={"Recent Activity"}
              headerTextStyle={"headerTextStyle"}
            />
            <NoImagCard
              title={"Requested Material"}
              figure={"4,678"}
              margin={"↓"}
              marginColor={"red"}
            />
            <NoImagCard
              title={"Reported Items"}
              figure={"26"}
              margin={"↑"}
              marginColor={"green"}
            />
          </Row>

          <Row className="mb-3 mt-5 gap-3">
            <TitleHeader
              text={"Recent User Activity"}
              headerTextStyle={"headerTextStyle"}
            />
            <NoImagCard
              title={"Scanned Items"}
              figure={"4,678"}
              margin={"↓"}
              marginColor={"red"}
            />
            <NoImagCard
              title={"Reported Items"}
              figure={"26"}
              margin={"↑"}
              marginColor={"green"}
            />
          </Row>*/}
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherDashboard;
