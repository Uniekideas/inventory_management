import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherReportDiscrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import DiscrepancyContext from "../../../context/Discrepancy/DiscrepancyContext";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function HeadTeacherReportDiscrepancy() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const {
    addDiscrepancyResponse,
    addDiscrepancyIsLoading,
    addDiscrepancyError,
    setAddDiscrepancyResponse,
    setAddDiscrepancyError,
    handleAddDiscrepancy,
    formData: formData,
    setFormData: setFormData,
  } = useContext(DiscrepancyContext);

  const { userData } = useContext(AuthenticationContext);

  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const formattedDate = date.getFullYear() + "-" + month + "-" + day;

  const initialFormData = {
    report_id: Math.floor(Date.now() * Math.random()),
    reporter: userData.name,
    item_name: "",
    supplier: "",
    expected_quantity: 0,
    actual_quantity: 0,
    discrepancy_type: "",
    description: "",
    date: formattedDate,
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  const handleLoadingClick = () => {
    if (
      addDiscrepancyIsLoading ||
      (!addDiscrepancyIsLoading &&
        !addDiscrepancyError &&
        !addDiscrepancyResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    handleAddDiscrepancy(e);
    handleLoadingClick();
  };

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
            <Form onSubmit={handleSubmit}>
              <Row>
                <TitleHeader
                  text={"Report Information"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        value={formData.report_id}
                        onChange={handleChange}
                        placeholder="Report ID"
                        className="DiscrepancyInput"
                        name="report_id"
                        required
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="DiscrepancyInput"
                        name="date"
                        required
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        value={formData.reporter}
                        onChange={handleChange}
                        className="DiscrepancyInput"
                        name="reporter"
                        readOnly
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Row>

              <Row>
                <TitleHeader
                  text={"Discrepancy Details"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        value={formData.item_name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        className="DiscrepancyInput"
                        name="item_name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        value={formData.supplier}
                        onChange={handleChange}
                        placeholder="Supplier"
                        className="DiscrepancyInput"
                        name="supplier"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="number"
                        value={formData.expected_quantity}
                        onChange={handleChange}
                        placeholder="Expected Quantity"
                        className="DiscrepancyInput"
                        name="expected_quantity"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="number"
                        value={formData.actual_quantity}
                        onChange={handleChange}
                        placeholder="Actual Quantity"
                        className="DiscrepancyInput"
                        name="actual_quantity"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Select
                        className="UserCreateInput"
                        name="discrepancy_type"
                        required
                      >
                        <option value="">Discrepancy Type</option>
                        <option value="shortfall">Short Fall</option>
                        <option value="excess">Excess</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Description..."
                        className="DiscrepancyTextArea"
                        name="description"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Report Discrepancy"
                  )}
                </Button>
              </Row>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherReportDiscrepancy;
