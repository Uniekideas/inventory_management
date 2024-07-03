import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherRequestMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";

function HeadTeacherRequestMaterial() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <TitleHeader text={"Request Materials"} />
        <Row>
          <TitleHeader
            text={"Requestor Information"}
            headerTextStyle={"headerTextStyle"}
          />
          <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="School Name"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Head Teacher Name"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>

        <Row>
          <TitleHeader
            text={"Item Details"}
            headerTextStyle={"headerTextStyle"}
          />
          <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Item Name"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Quantity"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    as="textarea"
                    rows={15}
                    placeholder="Description..."
                    className="DiscrepancyTextArea"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Button variant="success" className="w-100 p-2">Send Request </Button> 
          </Form>
        </Row>
      </Container>
    </div>
  </div>
  )
}

export default HeadTeacherRequestMaterial