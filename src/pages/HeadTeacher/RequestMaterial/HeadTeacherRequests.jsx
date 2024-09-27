import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherRequestMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { scrollToTop } from "../../../utils/HelperFunc";
import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import axios from "axios";

function HeadTeacherRequests() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const navigate = useNavigate();

  const getRequest = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request`);
      setAllRequest(response.data.itemRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleCreateItem = () => {
    navigate("/HeadTeacherRequestMaterial");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon />
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Request Materials"} />
            <PrimaryButton
              Primaryicon={faAdd}
              text={"New Request"}
              Primarystyle={"UserManagementCreateButton"}
              clickEvent={handleCreateItem}
            />
          </div>

          <Table responsive="lg" striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>SN</th>
                <th>Item Name</th>
                <th>Code</th>
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
                  <td>{request.item.code}</td>
                  <td>{request.quantity}</td>
                  <td>{request.comment}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}

export default HeadTeacherRequests;
