import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

function SchoolQADetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [selectSchool, setSelectSchool] = useState(null);
  const [locations, setLocations] = useState([]);
  const [Qa, setQa] = useState([]);

  let { pk } = useParams();

  const getAllQa = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school/qa/${pk}`);
      setQa(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSchools = async () => {
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

  const assignSchool = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const handleSchoolChange = (event) => {
    setSelectSchool(event.id);
  };

  useEffect(() => {
    getAllQa();
    getLocations();
    getSchools();
  }, []);

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
            <TitleHeader text={"School QA"} />
          </div>

          <Form onSubmit={assignSchool}>
            <Row className="mb-3">
              <Col className="UserCreateInput d-flex ms-2 mb-3" lg={10} md={10}>
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
              <Col className="UserCreateInput d-flex ms-2 mb-3" lg={10} md={10}>
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

          {!isLoading ? (
            // Qa.length ? (
            <>
              <Table responsive="lg" striped bordered hover className="mt-3">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{Qa.name}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{Qa.username}</td>
                  </tr>
                </tbody>
              </Table>

              <h3 className="mt-5">Schools</h3>
              {Qa.schoolqa.length ? (
                <Table responsive="lg" striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>School Code</th>
                      <th>School Name</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Qa.schoolqa.map((school, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{school.school_id}</td>
                        <td>{school.name}</td>
                        <td>
                          <button className="btn btn-danger">remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Table responsive="lg" striped bordered hover className="mt-3">
                  <tbody>
                    <tr>
                      <td>There are no schools attached</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </>
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

export default SchoolQADetail;
