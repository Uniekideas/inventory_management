import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Discrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { useParams } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/Loading/Loading";
import DiscrepancyContext from "../../../context/Discrepancy/DiscrepancyContext";
import { convertDate } from "../../../utils/HelperFunc";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import axios from "axios";

function DiscrepancyDetail() {
  let { pk } = useParams();

  const { getDiscrepancyData, getDiscrepancyIsLoading, getDiscrepancy } =
    useContext(DiscrepancyContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");
  const [status, setStatus] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getDiscrepancy(pk);
  }, []);

  const handleUpdateStatus = async (e, pk) => {
    e.preventDefault();
    setButtonLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const updatedData = {
      status: e.target.status.value,
    };
    try {
      const result = await axios.patch(
        `${baseUrl}/api/discrepancy/status/${pk}`,
        updatedData
      );
      
      setSuccess(result.data.message);
      setStatus(e.target.status.value);
      getDiscrepancy(pk);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleSubmit = (e) => {
    handleUpdateStatus(e, pk);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"View Discrepancy Details"} />
          </div>
          {getDiscrepancyIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getDiscrepancyIsLoading} />
            </Container>
          ) : getDiscrepancyData ? (
            <div>
              <Row>
                <TitleHeader
                  text={"Report Information"}
                  headerTextStyle={"headerTextStyle"}
                />
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Report ID</th>
                      <td>{getDiscrepancyData.report_id}</td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td>{getDiscrepancyData.date}</td>
                    </tr>
                    <tr>
                      <th>Reporter</th>
                      <td>{getDiscrepancyData.reporter}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>
                        <span
                          className={
                            getDiscrepancyData.status == "review"
                              ? "badge text-bg-danger"
                              : "badge text-bg-success"
                          }
                        >
                          {getDiscrepancyData.status == "review"
                            ? "Under Review"
                            : "Resolved"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
              <Row>
                <TitleHeader
                  text={"Discrepancy Details"}
                  headerTextStyle={"headerTextStyle"}
                />
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Item Name</th>
                      <td>{getDiscrepancyData.item_name}</td>
                    </tr>
                    <tr>
                      <th>Supplier</th>
                      <td>{getDiscrepancyData.supplier}</td>
                    </tr>
                    <tr>
                      <th>Expected Quantity</th>
                      <td>{getDiscrepancyData.expected_quantity}</td>
                    </tr>
                    <tr>
                      <th>Actual Quantity</th>
                      <td>{getDiscrepancyData.actual_quantity}</td>
                    </tr>
                    <tr>
                      <th>Discrepancy Type</th>
                      <td>{getDiscrepancyData.discrepancy_type}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{getDiscrepancyData.description}</td>
                    </tr>
                  </tbody>
                </table>
              </Row>

              <Form onSubmit={handleSubmit}>
                {success && (
                  <div className="alert alert-success alert-dismissible fade show">
                    {success}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSuccess("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                {failed && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {failed}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setFailed("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
                {getDiscrepancyData.status == "review" && (
                  <Row>
                  <TitleHeader
                    text={"Update Status"}
                    headerTextStyle={"headerTextStyle"}
                  />

                  <Row className="mb-3">
                    <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                      <Form.Select
                        className="UserCreateInput mb-3"
                        name="status"
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="review">Under Review</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Col>
                    <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                      <Button
                        variant="success"
                        className="w-100 p-2 mb-3"
                        type="submit"
                        style={{ height: "55px" }}
                      >
                        {buttonLoading ? (
                          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                        ) : (
                          "Save Item"
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Row>
                )}
                
              </Form>
            </div>
          ) : (
            <NonAvaliable
              textMessage={"Sorry, Discrepancy not available"}
              imageWidth={"300px"}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default DiscrepancyDetail;
