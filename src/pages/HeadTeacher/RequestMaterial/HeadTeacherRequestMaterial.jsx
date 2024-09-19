import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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

function HeadTeacherRequestMaterial() {
  const {
    addItemRequestResponse,
    addItemRequestIsLoading,
    addItemRequestError,
    setAddItemRequestResponse,
    setAddItemRequestError,
    handleAddItemRequest,
    formData,
    setFormData,
  } = useContext(ItemRequestContext);

  const { userData } = useContext(AuthenticationContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const initialFormData = {
    school_name: userData.school,
    head_teacher_name: userData.name,
    item_name: "",
    quantity: 0,
    comment: "",
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, []);

  useEffect(() => {
    if (!addItemRequestIsLoading && addItemRequestResponse) {
      scrollToTop();
      handleComfirmationPopUps("Report created successfully!", "bg-success");
      setButtonLoading(false);
      setAddItemRequestResponse(null);
      setFormData(initialFormData);
    }
  }, [addItemRequestIsLoading, addItemRequestResponse]);

  useEffect(() => {
    if (!addItemRequestIsLoading && addItemRequestError) {
      scrollToTop();
      handleComfirmationPopUps(addItemRequestError, "bg-danger");
      setButtonLoading(false);
    }
    setAddItemRequestError(null);
  }, [addItemRequestIsLoading, addItemRequestError]);

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
      addItemRequestIsLoading ||
      (!addItemRequestIsLoading &&
        !addItemRequestError &&
        !addItemRequestResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    handleAddItemRequest(e);
    handleLoadingClick();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon />
          <TitleHeader text={"Request Materials"} />
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={handleSubmit}>
            <Row>
              <TitleHeader
                text={"Requestor Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="School Name"
                      className="DiscrepancyInput"
                      value={formData.school_name}
                      onChange={handleChange}
                      name="school_name"
                      required
                      readOnly
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Head Teacher Name"
                      className="DiscrepancyInput"
                      value={formData.head_teacher_name}
                      onChange={handleChange}
                      name="head_teacher_name"
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>

            <Row>
              <TitleHeader
                text={"Item Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="DiscrepancyInput"
                      value={formData.item_name}
                      onChange={handleChange}
                      name="item_name"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      placeholder="Quantity"
                      className="DiscrepancyInput"
                      value={formData.quantity}
                      onChange={handleChange}
                      name="quantity"
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={15}
                      placeholder="Description..."
                      className="DiscrepancyTextArea"
                      value={formData.comment}
                      onChange={handleChange}
                      name="comment"
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                ) : (
                  "Request Material"
                )}
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherRequestMaterial;
