import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";

function AddNewItem() {
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Add New Item"} />
          </div>
          <Row>
            <TitleHeader text={"School Information "} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="url"
                      className="UserCreateInput"
                      placeholder="Item Description"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="email"
                      placeholder="Brand"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                  <Filter
                      defult={"Office Supplies"}
                      optionTitle={"Category:"}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                    <Filter
                      defult={"High"}
                      optionTitle={"Value:"}
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload Item Image"}
                      icon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Inventory Details"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Unit Cost"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Quantity on Hand"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Reorder Point"
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Supplier"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Addittional Information"} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-3">
              <Form>
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Serial Number"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Warrant Information"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Addittional Information"
                        className="UserCreateTextArea"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2">Save Item </Button> 
              </Form>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AddNewItem;
