import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
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

          {/* {!isLoading ? (
            allQa.length ? (
              <Table responsive="lg" striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>School Count</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  {allQa.map((qa, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{qa.name}</td>
                      <td>{qa.username}</td>
                      <td>{qa.schoolqa.length}</td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/SchoolQADetail/" + qa.id);
                          }}
                        >
                          View
                        </a>
                      </td>
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
          )} */}
        </Container>
      </div>
    </>
  );
}

export default SchoolQADetail;
