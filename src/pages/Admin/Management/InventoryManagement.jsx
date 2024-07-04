import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import { useNavigate } from "react-router-dom";

function InventoryManagement() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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
const getItems = async()=>{
  const res = await axios.get('https://195d-102-89-34-7.ngrok-free.app/api/item/')
  console.log(res.data);
  setItems(res.data.items)
}
  useEffect(()=>{
    getItems();
  }, [])
  

  const users = [
    {
      id: 1,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 50,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 24,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      itemId: "INV-001",
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      price: "$0.25",
      quantity: 0,
      location: "Aisle 2, Shelf C1",
      status: "Active",
      joinDate: "2024-05-18",
    },
    // Add more users as needed
  ];
  const handleCreateItem = () => {
    navigate('/AddNewItem')
  }
  const handleGenerateReport = () => {
    navigate('/GenerateInventory')
  }
  const handleItemDetail = () => {
    navigate('/ItemDetail')
  }
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
            <PrimaryButton text={"Generate Inventory Report"} Primarystyle={"InventoryReportButton"} clickEvent={() => handleGenerateReport()}
/>
            </Col>
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
            <PrimaryButton text={"View Inventory Reports"} Primarystyle={"InventoryReportButton"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={inventoryImage}
                figure={"12,674"}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={inventoryImage}
                figure={"46"}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                icon={faAdd}
                text={"Create New Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateItem()}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <PrimaryButton
                icon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateItem()}
              />
            </Col>
          </Row>
          <Container>
            {items.map((item) => (
              <Row
                key={item.id}
                className="UserListRow my-2 py-2 align-items-center"
              >
                <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                  <Image
                    src={item.image}
                    rounded
                    width="50"
                    height="50"
                  />
                  <div>
                    <h6>{item.name}</h6>
                    <h7 className="fs-6">
                      {" "}
                      {item.id}
                      <span className="text-muted InventoryCategoryText">
                        {" "}
                        | {item.quantity}{" "}
                        <span className="d-none d-lg-inline me">
                          {item.name} | {item.quantity} | {item.quantity}
                          <span
                            className={
                              item.quantity > 35
                                ? "text-success"
                                : item.quantity < 1
                                ? "text-danger"
                                : "text-warning"
                            }
                          >
                            {" "}
                            {item.quantity > 35
                              ? "In stock"
                              : item.quantity < 1
                              ? "Out of stock"
                              : "Low on stock"}
                          </span>{" "}
                          &nbsp;| &nbsp; {item.supplier} | &nbsp;
                          <span
                            className={
                              // user.status === "Active"
                                // ? "text-success"
                                // : "text-danger"
                                'text-success'
                            }
                          >
                            {" "}
                            {item.brand}
                          </span>{" "}
                          | {item.bar_code}
                        </span>{" "}
                      </span>
                    </h7>
                  </div>
                </Col>
                <Col
                  xs={3}
                  md={3}
                  sm={3}
                  lg={3}
                  className="d-flex justify-content-end gap-2"
                >
                  <PrimaryButton text={"Edit"} Primarystyle={"UserViewButton d-none d-lg-block"} />
                  <PrimaryButton
                    text={"View"}
                    Primarystyle={"schoolViewButton "}
                    clickEvent={() => handleItemDetail()}
                  />
                </Col>
                <Col
                  xs={3}
                  md={3}
                  sm={3}
                  lg={3}
                  className="d-flex justify-content-end gap-2"
                >
                 
                </Col>
              </Row>
            ))}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default InventoryManagement;
