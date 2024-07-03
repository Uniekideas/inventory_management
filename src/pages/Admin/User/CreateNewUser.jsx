import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
// import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";

function CreateNewUser() {
  // const navigate = useNavigate();
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
            <TitleHeader text={"Create New User"} />
          </div>
          <Row>
            <TitleHeader text={"User Information"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Username"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="User ID"
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
                      placeholder="Phone Number"
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
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="userfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <CustomFileInput
                      fieldName={"userfileInput"}
                      title={"Upload User Image"}
                      icon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Account Settings"} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-3">
              <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                <Filter defult={"Admin"} optionTitle={"User Role:"} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                <Filter defult={"Admin"} optionTitle={"Department:"} />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                <Filter defult={"Activfe"} optionTitle={"Status:"} />
              </Col>
            </Row>
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
                        placeholder="Date Employed"
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
                <Button variant="success" className="w-100 p-2">Save User</Button> 
              </Form>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CreateNewUser;
