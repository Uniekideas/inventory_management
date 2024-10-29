import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";
const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

function SchoolQADetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schools, setSchools] = useState([]);
  const [locations, setLocations] = useState([]);
  const [Qa, setQa] = useState([]);

  let { pk } = useParams();

  const getAllQa = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school/qa/${pk}`);
      setQa(response.data);
      console.log(Qa);
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

  useEffect(() => {
    getAllQa();
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

          {!isLoading ? (
            Qa.length ? (
              <Table responsive="lg" striped bordered hover className="mt-3">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{Qa.name}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>{Qa.username}</td>
                  </tr>
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

export default SchoolQADetail;
