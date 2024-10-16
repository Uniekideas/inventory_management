import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form } from "react-bootstrap";
// import "./HeadTeacherRequestMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
// import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { scrollToTop } from "../../../utils/HelperFunc";
import Filter from "../../../components/Filter/Filter";
import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/Loading/Loading";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Select from "react-select";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AllItemRequests() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const [createReportError, setCreateReportError] = useState(null);
  const [createReportIsLoading, setCreateReportIsLoading] = useState(true);
  const [createReportResponse, setCreateReportResponse] = useState(null);
  const [schools, setSchools] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectSchool, setSelectSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchError, setSearchError] = useState(null);
  const [format, setFormat] = useState(null);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const getRequest = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request`);
      setAllRequest(response.data.itemRequests);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSchoolsNew = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/school/all-schools`);

      setSchools(
        response.data.schools.map((item) => ({
          id: item.id,
          code: item.school_id,
          name: item.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getLocations = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/location`);

      setLocations(
        response.data.data.map((location) => ({
          id: location.id,
          title: location.title,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filterOption = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type: "pdf",
    },
  ];

  const handleSchoolChange = (event) => {
    setSelectSchool(event.id);
  };

  useEffect(() => {
    getSchoolsNew();
    getLocations();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getRequest();
  }, []);

  const searchRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      school_id: selectSchool,
      location_id: e.target.location.value,
      status: e.target.status.value,
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
    };

    try {
      const result = await axios.post(
        `${baseUrl}/api/item-request/search`,
        formData
      );

      setAllRequest(result.data.itemRequest);
    } catch (error) {
      setSearchError(error.response.data.message);
      console.log(error);
    }

    setIsLoading(false);
  };

  const generateReport = async (formatQuery, resultData) => {
    setCreateReportIsLoading(true);

    if (formatQuery === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [
          [
            "SN",
            "Item Name",
            "School/Location",
            "Quantity",
            "Comment",
            "Status",
          ],
        ],
        body: resultData.map((item, index) => [
          index + 1,
          item.item.name,
          item.school.name,
          item.quantity,
          item.comment,
          item.status,
        ]),
      });
      doc.save("edo_distribution_report.pdf");
      //   setCreateReportResponse(response);
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(resultData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_distribution_report");
      XLSX.writeFile(wb, "edo_distribution_report.xlsx");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <BackButtonIcon />
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Request Materials"} />
          </div>
          <Form onSubmit={searchRequest}>
            <Row className="mb-3">
              <Col
                className="UserCreateInput d-flex ms-2 mb-3"
                lg={3}
                md={3}
                xl={3}
                sm={12}
                xs={12}
              >
                <div className="flex-fill">
                  <Select
                    classNames={{
                      control: (state) =>
                        state.isFocused
                          ? "border-0 py-2 shadow-none w-100"
                          : "border-0 py-2 w-100",
                    }}
                    name="school"
                    placeholder="Select School"
                    options={schools}
                    getOptionLabel={(options) => options["name"]}
                    getOptionValue={(options) => options["id"]}
                    isSearchable
                    onChange={handleSchoolChange}
                  />
                </div>
              </Col>
              <Col
                className="UserCreateInput d-flex ms-2 mb-3"
                lg={2}
                md={3}
                xl={2}
                sm={12}
                xs={12}
              >
                <Form.Select
                  className="no-border shadow-none w-auto"
                  name="location"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => {
                    return (
                      <option key={location.id} value={location.id}>
                        {location.title}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col
                className="UserCreateInput d-flex ms-2 mb-3"
                lg={2}
                md={3}
                xl={2}
                sm={12}
                xs={12}
              >
                <Form.Select
                  className="no-border shadow-none w-auto"
                  name="status"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>
              </Col>
              <Col
                className="UserCreateInput d-flex ms-2 mb-3"
                lg={2}
                md={3}
                xl={2}
                sm={12}
                xs={12}
              >
                <Form.Control
                  type="date"
                  className="no-border shadow-none w-auto"
                  name="start_date"
                  placeholder="start_date"
                />
              </Col>
              <Col
                className="UserCreateInput d-flex ms-2 mb-3"
                lg={2}
                md={3}
                xl={2}
                sm={12}
                xs={12}
              >
                <Form.Control
                  type="date"
                  className="no-border shadow-none w-auto"
                  name="end_date"
                  placeholder="end_date"
                />
              </Col>
              <Col className="ms-2">
                <button className="btn btn-success" type="submit">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="sideNavSearchIcon"
                  />
                </button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col md={4} sm={12} xs={12} className="mb-3">
              <Filter
                defult={"None"}
                optionTitle={"Report Format"}
                options={filterOption}
                onSelect={(value) => {
                  generateReport(value, allRequest);
                }}
              />
            </Col>
          </Row>

          {!isLoading ? (
            allRequest.length ? (
              <Table responsive="lg" striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Item Name</th>
                    <th>School/Location</th>
                    <th>Quantity</th>
                    <th>Comment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allRequest.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{request.item.name}</td>
                      <td>{request.school.name}</td>
                      <td>{request.quantity}</td>
                      <td>{request.comment}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <NonAvaliable
                textMessage={"Sorry, there is currently no available item! 😥"}
                imageWidth={"300px"}
              />
            )
          ) : (
            <Container className="d-flex justify-content-center align-items-center h-50">
              <Loading loading={isLoading} />
            </Container>
          )}
        </Container>
      </div>
    </>
  );
}

export default AllItemRequests;
