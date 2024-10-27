import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "./QualityDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import QualityNavigation from "../../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";

function ApprovalDetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  let { pk } = useParams();

  const getRequest = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/item-request/${pk}`);
      setRequestData(res.data.itemRequest);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/item-request/status/${id}`,
        { status: "approved" }
      );
      setIsLoading(true);
      getRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/item-request/status/${id}`,
        { status: "denied" }
      );
      setIsLoading(true);
      getRequest();
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
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Approval Details"} />
          </div>

          {!isLoading ? (
            <>
              <Row>
                <Table responsive="lg" striped bordered hover className="mt-3">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{requestData.item.item_name}</td>
                    </tr>
                    <tr>
                      <th>School</th>
                      <td>{requestData.school.name}</td>
                    </tr>
                    <tr>
                      <th>Quantity</th>
                      <td>{requestData.quantity}</td>
                    </tr>
                    <tr>
                      <th>Comment</th>
                      <td>{requestData.comment}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{requestData.status}</td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              {requestData.status == "pending" ? (
                <Row>
                  <TitleHeader
                    text={"Approval Update"}
                    headerTextStyle={"headerTextStyle"}
                  />

                  <Row>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-2">
                      <Button
                        variant="success"
                        className="w-100 p-2"
                        onClick={() => handleApprove(requestData.id)}
                      >
                        {" "}
                        Approve{" "}
                      </Button>
                    </Col>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-2">
                      <Button
                        variant="danger"
                        className="w-100 p-2"
                        onClick={() => handleDecline(requestData.id)}
                      >
                        {" "}
                        Deny{" "}
                      </Button>
                    </Col>
                  </Row>
                </Row>
              ) : (
                ""
              )}
            </>
          ) : (
            <Container className="d-flex justify-content-center align-items-center h-50">
              <Loading loading={isLoading} />
            </Container>
          )}
        </Container>
      </div>
    </div>
  );
}

export default ApprovalDetail;
