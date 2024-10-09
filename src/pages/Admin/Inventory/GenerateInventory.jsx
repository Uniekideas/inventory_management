import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import { LoadingPropagate } from "../../../components/Loading/Loading";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import GeneralContext from "../../../context/General/GeneralContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function GenerateInventory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [buttonText, setButtonText] = useState("Generate Report");
  const [format, setFormat] = useState("");
  const [lga, setLga] = useState("");
  const [schoolType, setSchoolType] = useState("");

  const {
    generateReport,
    createReportResponse,
    createReportIsLoading,
    createReportError,
    setCreateReportError,
    setCreateReportResponse,
  } = useContext(InventoryItemContext);

  const { lgaList, schoolLevel, exportAccordingToType } =
    useContext(GeneralContext);

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "pdf",
      },

      {
        pk: 2,
        type: "excel",
      },
    ],
    []
  );
  const filterOptionforLGA = useMemo(() => lgaList, []);

  const filterOptionForType = useMemo(() => schoolLevel);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!createReportIsLoading && createReportResponse) {
      setButtonClick(false);
      console.log(createReportResponse);
      setButtonText("Report Generated →");
      setCreateReportResponse(null);
    }
  }, [createReportIsLoading, createReportResponse]);

  useEffect(() => {
    if (!createReportIsLoading && createReportError) {
      setButtonClick(false);
      console.log(createReportError);
      setButtonText("Error X");
      setCreateReportError(null);
    }
  }, [createReportIsLoading, createReportError]);

  const handleLoadingClick = () => {
    if (
      createReportIsLoading ||
      (!createReportIsLoading && !createReportError && !createReportError)
    ) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!format) {
      alert("Select a format");
      return;
    }
    generateReport(format, e.target.maximum.value, lga, schoolType);
    handleLoadingClick();
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Generate Reports"} />
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/* <Col lg={6} md={6} xl={6} sm={12} xs={12} className="mb-3">
                <p style={{ marginLeft: 10 }}>from</p>
                <Form.Control
                  type="date"
                  placeholder=""
                  className="pushNotificationTitle"
                />
              </Col> */}
              <Col lg={12} md={12} xl={12} sm={12} xs={12} className="mb-3">
                <p style={{ marginLeft: 10 }}>Maximum Quantity</p>
                <Form.Control
                  name="maximum"
                  type="number"
                  placeholder="Maximum Stock Level"
                  className="pushNotificationTitle"
                  defaultValue="0"
                />
              </Col>
              {/* <Col md={4} sm={12} xs={12} className="mb-3">
                <Filter
                  defult={"All"}
                  options={filterOptionforLGA}
                  optionTitle={"LGA"}
                  onSelect={(value) => setLga(value)}
                  Filterstyle={"w-100"}
                />
              </Col> */}
              <Col md={4} sm={12} xs={12} className="mb-3">
                <Filter
                  defult={"All"}
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  onSelect={(value) => setSchoolType(value)}
                />
              </Col>
              <Col md={4} sm={12} xs={12} className="mb-3">
                <Filter
                  defult={"None"}
                  optionTitle={"Report Format"}
                  options={filterOption}
                  onSelect={(value) => setFormat(value)}
                />
              </Col>
            </Row>

            {!buttonClick ? (
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonText}
              </Button>
            ) : (
              <Button variant="success" className="w-100 p-2" type="submit">
                <LoadingPropagate loading={buttonClick} />
              </Button>
            )}
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default GenerateInventory;
