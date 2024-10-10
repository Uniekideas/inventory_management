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
import "./WareHouseDashboard.css";
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
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

function WareHouseDashboard() {
  const {
    getInventoryItems,
    getItemsData,
    getItemsDataCount,
    getLowStockItemsData,
    getLowStockItemsDataCount,
    getItemsIsLoading,
    setGetItemsData,
  } = useContext(InventoryItemContext);

  const [filter, setFilter] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [count, setCount] = useState(0);
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
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
            />
          </div>
          <Row className="mb-3">
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"Scan Item "}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/ScanMaterial")}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"View Inventory"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/WareHouseInventory")}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Report Discrepancy"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/ReportDiscrepancy")}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Push Notification"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate("/WareHousePushNotification")}
              />
            </Col>
          </Row>
          <Row className="mb-3 mt-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <TitleHeader
                text={"Inventory Overview"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={5} md={6} xl={5} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Inventory Items"}
                image={schoolImage}
                figure={getItemsDataCount}
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
            <Col lg={5} md={6} xl={5} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={inventoryImage}
                figure={getLowStockItemsDataCount}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col className="my-3">
              <div className="d-flex justify-content-between">
                <h3 className="px-2">Low Stock Items</h3>
                <div
                  className="d-none d-flex justify-content-end "
                  style={{ gap: 5 }}
                >
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
                </div>
              </div>
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
            </Col>

            {/* <Col className="d-flex justify-content-end">
              <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
              />
            </Col> */}
          </Row>
          {/* <Row className="mb-3 mt-5 gap-3">
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
          </Row> */}
        </Container>
      </div>
    </div>
  );
}

export default WareHouseDashboard;
