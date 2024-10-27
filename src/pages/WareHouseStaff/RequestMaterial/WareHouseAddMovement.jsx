import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./WareHouseTrack.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import TrackingContext from "../../../context/Tracking/TrackingContext";

function WareHouseAddMovement() {
  const navigate = useNavigate();

  const {
    addTrackingError,
    addTrackingResponse,
    addTrackingIsLoading,
    setAddTrackingResponse,
    setAddTrackingError,
    handleAddTracking,
  } = useContext(TrackingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!addTrackingIsLoading && addTrackingResponse) {
      navigate("/WareHouseTrack", {
        state: { message: "Movement added successfully!" },
      });
      setAddTrackingResponse(null);
    }
  }, [addTrackingIsLoading, addTrackingResponse, navigate]);

  useEffect(() => {
    if (!addTrackingIsLoading && addTrackingError) {
      scrollToTop();
      handleComfirmationPopUps(addTrackingError, "bg-danger");
      setButtonLoading(false);
    }
    setAddTrackingError(null);
  }, [addTrackingIsLoading, addTrackingError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      addTrackingIsLoading ||
      (!addTrackingIsLoading && !addTrackingError && !addTrackingResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleAddSubmit = (e) => {
    handleAddTracking(e);
    handleLoadingClick();
  };


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
            <TitleHeader text={"Add Movement"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={handleAddSubmit}>
          <Row>
            <TitleHeader
              text={"Item Information "}
              headerTextStyle={"headerTextStyle"}
            />
          
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                      name="item_name"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Item Description"
                      name="item_description"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      className="UserCreateInput"
                      name="brand"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="category"
                      required
                    >
                      <option value="">Category</option>
                      <option value="Office Supplies">Office Supplies</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="priority"
                      required
                    >
                      <option value="">Priority</option>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
          </Row>
          <Row>
            <TitleHeader
              text={"Movement Details"}
              headerTextStyle={"headerTextStyle"}
            />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="date"
                      className="UserCreateInput"
                      name="date_moved"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="time"
                      className="UserCreateInput"
                      name="time_moved"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Aisle 3, Bin 12"
                      name="address"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Picking Area"
                      name="picking_area"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="building_number"
                      name="building_number"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="action"
                      required
                    >
                      <option value="">Action</option>
                      <option value="In transit">In transit</option>
                      <option value="received">Received</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
          </Row>
          <Row>
            <TitleHeader
              text={"Addittional Information"}
              headerTextStyle={"headerTextStyle"}
            />
            <Row className="mb-3">
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Reference Number"
                        className="UserCreateInput"
                        name="reference_number"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Addittional Information"
                        className="UserCreateTextArea"
                        name="additional_info"
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save Movement"
                  )}
                </Button>
            
            </Row>
          </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseAddMovement;
