import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../Inventory/Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import LocationContext from "../../../context/Location/LocationContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import MessageContext from "../../../context/Message/MessageContext";
import axios from "axios";

function AddLocation() {
  const navigate = useNavigate();

  const {
    seteditItemError,
    seteditItemResponse,
    editItemIsLoading,
    editItemError,
    editItemResponse,
  } = useContext(LocationContext);

  const { setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!editItemIsLoading && editItemResponse) {
      setnavigationMessages("Edit successful!");
      navigate(-1);
      seteditItemResponse(null);
    }
  }, [editItemIsLoading, editItemResponse, navigate]);

  useEffect(() => {
    if (!editItemIsLoading && editItemError) {
      scrollToTop();
      handleComfirmationPopUps(editItemError, "bg-danger");
      setButtonLoading(false);
      seteditItemError(null);
    }
  }, [editItemIsLoading, editItemError]);

  const addLocation = async (e) => {
    e.preventDefault();
    setButtonLoading(true);

    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    try {
      const result = await axios.post(`${baseUrl}/api/location`, formData);
      setButtonLoading(false);
      setnavigationMessages("Location created successful!");
      navigate(-1);
    } catch (error) {
      handleComfirmationPopUps(error.response.data.message, "bg-danger");
      console.log(error);
    }

    setButtonLoading(false);
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Add Location"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={addLocation}>
            <Row>
              <TitleHeader
                text={"Location "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Location Name"
                      className="UserCreateInput"
                      name="title"
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      name="description"
                      className="UserCreateTextArea"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                ) : (
                  "Create Location"
                )}
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AddLocation;
