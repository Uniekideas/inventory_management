import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./HeaderTeacherInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";

function HeaderTeacherGenerateReport() {
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
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Generate Report"} />
          </div>
          <Row className="mb-3 d-flex justify-content-end">
            <Col
              lg={12}
              md={12}
              xl={12}
              sm={12}
              xs={12}
              className="d-none d-lg-flex d-flex justify-content-end gap-3"
            >
              <Filter defult={"PDF"} optionTitle={"Report Format"} />
              <Filter defult={"Random"} optionTitle={"Sort by"} />
            </Col>

          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3">
              <Row>
                <Col lg={6} md={6} xl={6} sm={6} xs={6} className="">
                  <Filter defult={"24th Aug. 2023"} optionTitle={"From-"} />
                </Col>
                <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                  <Filter defult={"24th Aug. 2023"} optionTitle={"To-"} />
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xl={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3">
                  <Filter
                    defult={"Aisle 2, Shelf C1"}
                    optionTitle={"Location"}
                  />
                </Col>
                <Col lg={12} md={12} xl={6} sm={12} xs={12}>
                  <Filter defult={"Office Supplies"} optionTitle={"Category"} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row>
                <Col
                  lg={4}
                  md={12}
                  xl={4}
                  sm={12}
                  xs={12}
                  className="d-lg-none mb-3"
                >
                  <Filter defult={"PDF"} optionTitle={"Report Format"} />
                </Col>
                <Col lg={8} md={12} xl={8} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Minimum Stock Level"
                    className="pushNotificationTitle"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <Form.Group className="mb-3" controlId="InventoryMessage">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Comment..."
                    className="pushNotificationTextArea"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="success" className="w-100 p-2">
              Generate Report
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default HeaderTeacherGenerateReport;
