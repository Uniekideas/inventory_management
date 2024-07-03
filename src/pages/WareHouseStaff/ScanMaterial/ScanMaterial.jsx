import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./ScanMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";

function ScanMaterial() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [stockCount, setStockCount] = useState(5);

  const handleScanClick = () => {
    // Handle scan button click
  };

  const handleEnterDatabaseClick = () => {
    // Handle enter item into database button click
  };
  const handleViewItem = () => {
    navigate('/WareHouseViewItem')
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <TitleHeader text={"Scan Materials"} />
          <Row className="justify-content-center">
            <Col xs={12} lg={12} className="text-center mb-3">
              <div className="scanArea ">
                <FontAwesomeIcon
                  className="text-muted"
                  icon={faExpand}
                  size="4x"
                />
                <p className="mt-2 text-muted">Please connect your Scanner!</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12} className="text-center ">
              <hr />
              <span>OR</span>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12}>
              <Form.Control
                type="text"
                placeholder="Enter ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="DiscrepancyInput"
              />
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12}>
              <Button
                variant="success"
                className="w-100 p-3"
                onClick={handleScanClick}
              >
                Scan
              </Button>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mb-4">
            <Col xs={12} lg={5} sm={12} xl={4} className="text-center mb-2">
              <div className="border rounded rounded-4 p-2">
                <span className=" text-muted">
                  Number of Items Scanned: <b>1</b>
                </span>
              </div>
            </Col>
            <Col xs={12} lg={5} sm={12} xl={4} className="text-center ">
              <PrimaryButton
                text={"View"}
                Primarystyle={"schoolViewButton w-100"}
                clickEvent={() => handleViewItem()}

              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={12} md={12} lg={12} xl={2} className="text-center">
              <Form.Group className="d-flex justify-content-between align-items-center">
                <Form.Label className=" w-100">Stock Count</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="scanStockCountInput p-3 rounded rounded-4 mx-1"
                    type="number"
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs={12} lg={12}>
              <Button
                variant="outline-success"
                className="w-100 p-3"
                onClick={handleEnterDatabaseClick}
              >
                Enter Item Into Database
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ScanMaterial;
