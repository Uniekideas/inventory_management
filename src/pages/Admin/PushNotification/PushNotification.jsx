import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Notification.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";


function PushNotification() {
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Push Notifications"} />

          <Row>
            <Row className="d-lg-none">
              <Col className="d-flex text-center justify-content-end mb-3">
                <PrimaryButton
                  icon={faClockRotateLeft}
                  text={"Notification History"}
                  Primarystyle={"pushNotificationTimer "}
                />
              </Col>
            </Row>

            <Col className="d-flex justify-content-end ms-auto gap-3 mb-5">
              <Filter
                optionTitle={"Select Target Audience:"}
                options={filterData}
                defult={"All"}
              />
              <PrimaryButton
                icon={faClockRotateLeft}
                text={"Notification History"}
                Primarystyle={"pushNotificationTimer d-none d-lg-flex"}
              />
            </Col>
          </Row>
          <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row>
                <Col lg={8} md={8} xl={8} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Notification Title"
                    className="pushNotificationTitle"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <Form.Group className="mb-3" controlId="notificationMessage">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Enter your message here..."
                    className="pushNotificationTextArea"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-center mb-3  d-flex justify-content-between">
              <Col xs={12} lg={3} sm={12} className="mb-2 mb-lg-0">
                <Form.Control
                  type="file"
                  id="fileInput" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <CustomFileInput fieldName={'fileInput'} title={'Attach File'} icon={faPaperclip}/>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                lg={12}
                sm={12}
                className="text-end d-flex justify-content-between"
              >
                <Button variant="success" className="w-100">
                  Send Notification
                </Button>

                <Button variant="success" className="ms-2">
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default PushNotification;
