import React, { useState } from "react";
import { Container, Row, Col, Badge, Form } from "react-bootstrap";
import "./Discrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { useNavigate } from "react-router-dom";



function DiscrepancyList() {
  const navigate = useNavigate();

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
  const items = [
    {
      id: 1,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "New",
    },
    {
      id: 2,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "Under Review",
    },
    {
      id: 3,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "Resolved",
    },
    {
      id: 4,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "New",
    },
    {
      id: 5,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "New",
    },
    {
      id: 6,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "New",
    },
    {
      id: 7,
      description: "Inventory Mismatch (Warehouse A)",
      date: "2024-05-20",
      time: "10:30 AM",
      user: "John Smith",
      location: "Warehouse",
      status: "New",
    },
  ];
  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return (
          <Badge
            bg="none"
            className="BadgeList"
            style={{ color: "rgba(41, 141, 44, 1)" }}
          >
            New.
          </Badge>
        );
      case "Under Review":
        return (
          <Badge
            bg="none"
            className="BadgeList"
            style={{ color: "rgba(215, 154, 0, 1)" }}
          >
            Under Review
          </Badge>
        );
      case "Resolved":
        return <Badge bg="success">Resolved</Badge>;
      default:
        return null;
    }
  };

  const handleViewDetail = () => {
    navigate('/DiscrepancyDetail')
  }

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Discrepancy"} />
          <Row className="mb-3 ">
            <Col className="mb-3 " lg={6} xl={8} md={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
            <Col
              lg={3}
              md={3}
              xl={2}
              sm={6}
              xs={6}
              className="d-none d-lg-block"
            >
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>

            <Col
              lg={3}
              md={3}
              xl={2}
              sm={6}
              xs={6}
              className="d-none d-lg-block"
            >
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                icon={faTrashCan}
                text={"Delete"}
                Primarystyle={"DiscrepancyDeleteButton"}
              />
            </Col>
          </Row>
          <Row>
            <Container>
              {items.map((item) => (
                <Row
                  key={item.id}
                  className=" align-items-center mb-3 border p-2 ListRow"
                >
                  <Col xs={12} className="d-flex justify-content-between gap-3">
                    <Form.Check type="checkbox" />
                    <div>{item.description}</div>
                    <div className="text-muted d-none d-lg-block">
                      {item.date} | {item.time} | {item.user} | {item.location}|{" "}
                      {getStatusBadge(item.status)}
                    </div>
                    <PrimaryButton text={"View"} Primarystyle={"ListButton"} clickEvent={() => handleViewDetail()}/>
                  </Col>
                </Row>
              ))}
            </Container>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DiscrepancyList;
