import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherRequestMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import ItemRequestContext from "../../../context/ItemRequest/ItemRequestContext";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Select from "react-select";
import axios from "axios";

function HeadTeacherRequests() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [allRequest, setAllRequest] = useState([]);

  const getRequest = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request`);
      console.log("Request");
      console.log(response);
      setAllRequest(response.data.itemRequests);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

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
          <TitleHeader text={"Request Materials"} />

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
