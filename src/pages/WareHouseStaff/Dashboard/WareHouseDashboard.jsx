import React, { useState } from "react";
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
import { Container, Row, Col, Card } from "react-bootstrap";
import "./WareHouseDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard, { NoImagCard } from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import BarGraph from "../../../components/Graph/BarGraph";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
  const Bardata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 650, 520],
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
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"View Inventory"}
                Primarystyle={"InventoryReportButton"}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Report Discrepancy"}
                Primarystyle={"InventoryReportButton"}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Push Notification"}
                Primarystyle={"InventoryReportButton"}
              />
            </Col>
          </Row>
          <Row className="mb-3 mt-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <TitleHeader text={"Inventory Overview"} headerTextStyle={'headerTextStyle'}/>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <Row className="mb-3">
                <PresentaionCard
                  title={"Total Inventory Items"}
                  image={inventoryImage}
                  figure={"12,674"}
                  margin={"↓"}
                  marginColor={"red"}
                />
              </Row>
              <Row className="mb-3">
                <PresentaionCard
                  title={"Low Stock Alerts"}
                  image={inventoryImage}
                  figure={"46"}
                  margin={"↓"}
                  marginColor={"red"}
                />
              </Row>
            </Col>
            <Col lg={6} md={12} xl={8} sm={12} xs={12} className="">
              <BarGraph data={Bardata} options={Baroptions} />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
            <Filter
              optionTitle={"Export Data"}
              options={filterData}
              dropdrowStyle={'DashboardExportData'}
            />
            </Col>
          </Row>
          <Row className="mb-3 mt-5 gap-3">
            <TitleHeader text={"Recent User Activity"} headerTextStyle={'headerTextStyle'}/>
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
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseDashboard;
