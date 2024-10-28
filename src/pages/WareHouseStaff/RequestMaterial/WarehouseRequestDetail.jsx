import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
// import "./QualityDashboard.css";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";

function WarehouseRequestDetail() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApprove(e);
  };

  const handleApprove = async (e) => {
    const quantity = e.target.quantity.value;
    try {
      const res = await axios.patch(
        `${baseUrl}/api/item-request/warehousestatus/${pk}`,
        { status: "in-transit", quantity_given: quantity }
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
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Request Details"} />
          </div>

          {!isLoading ? (
            <>
              <Row>
                <Table responsive="lg" striped bordered hover className="mt-3">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{requestData.item.name}</td>
                    </tr>
                    <tr>
                      <th>School</th>
                      <td>{requestData.school.name}</td>
                    </tr>
                    <tr>
                      <th>Quantity</th>
                      <td>{requestData.quantity}</td>
                    </tr>
                    {requestData.status !== "approved" && (
                      <tr>
                        <th>Quantity Issued</th>
                        <td>{requestData.quantity_issued}</td>
                      </tr>
                    )}
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
              {requestData.status == "approved" ? (
                <Row>
                  <TitleHeader
                    text={"Warehouse Inventory"}
                    headerTextStyle={"headerTextStyle"}
                  />

                  <Form onSubmit={handleSubmit}>
                    <Table
                      responsive="lg"
                      striped
                      bordered
                      hover
                      className="mt-3"
                    >
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{requestData.item.name}</td>
                        </tr>
                        <tr>
                          <th>Code</th>
                          <td>{requestData.item.code}</td>
                        </tr>
                        <tr>
                          <th>Quantity</th>
                          <td>{requestData.item.quantity}</td>
                        </tr>
                        <tr>
                          <th>Quantity Sent</th>
                          <td>
                            {/* <input
                              name="quantity"
                              type="number"
                              className=""
                              defaultValue={requestData.quantity}
                            /> */}
                            <Form.Control
                              type="number"
                              placeholder="Quantity"
                              className="DiscrepancyInput"
                              defaultValue={requestData.quantity}
                              name="quantity"
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Row>
                      <Col md={6} sm={6} xs={6} className="mb-2">
                        <Button
                          variant="success"
                          type="submit"
                          className="w-100 p-2"
                        >
                          {" "}
                          Approve{" "}
                        </Button>
                      </Col>
                      <Col md={6} sm={6} xs={6} className="mb-2">
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
                  </Form>
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

export default WarehouseRequestDetail;
