import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./School.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
// import PrimaryButton from "../../../components/Button/PrimaryButton";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";

function AddSchool() {
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
            <BackButtonIcon/>
            <TitleHeader text={"Add School"} />
          </div>
          <Row>
            <TitleHeader text={"School Information "} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="School Name"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="url"
                      className="UserCreateInput"
                      placeholder="School Website"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="email"
                      placeholder="School Email Address"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="School Phone Number"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                    <Filter
                      defult={"Elementery"}
                      optionTitle={"School Level"}
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
                      title={"Upload School Logo"}
                      icon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Location Details"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="City"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                    <Filter
                      defult={"Esan North-East"}
                      optionTitle={"Local Government Area:"}
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Postal Code"
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
                        placeholder="Date Established"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Number Of Staff"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Number Of Staff"
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
                <Button variant="success" className="w-100 p-2">Save School </Button> 
              </Form>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AddSchool;
