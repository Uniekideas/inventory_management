import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./HeadTeacherReportDiscrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";

function HeadTeacherReportDiscrepancy() {
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
        <TitleHeader text={"Report Discrepancy"} />
        <Row>
          <TitleHeader
            text={"Report Information"}
            headerTextStyle={"headerTextStyle"}
          />
          <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Report ID"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Date"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Reporter"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>

        <Row>
          <TitleHeader
            text={"Discrepancy Details"}
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
                    placeholder="Supplier"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Expected Quantity"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Actual Quantity"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Discrepancy Type"
                    className="DiscrepancyInput"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Description..."
                    className="DiscrepancyTextArea"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </div>
  </div>
  )
}

export default HeadTeacherReportDiscrepancy