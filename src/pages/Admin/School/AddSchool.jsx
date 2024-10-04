import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./School.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import SchoolContext from "../../../context/School/SchoolContext";
import { scrollToTop } from "../../../utils/HelperFunc";

function AddSchool() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    handleAddSchool,
    addSchoolIsLoading,
    addSchoolResponse,
    addSchoolError,
    setAddSchoolError,
    setAddSchoolResponse,
  } = useContext(SchoolContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!addSchoolIsLoading && addSchoolResponse) {
      navigate("/SchoolsManagement", {
        state: { message: "School added successful!" },
      });
      setAddSchoolResponse(null);
    }
  }, [addSchoolIsLoading, addSchoolResponse, navigate]);

  useEffect(() => {
    if (!addSchoolIsLoading && addSchoolError) {
      scrollToTop();
      handleComfirmationPopUps(addSchoolError, "bg-danger");
      setButtonLoading(false);
    }
    setAddSchoolError(null);
  }, [addSchoolIsLoading, addSchoolError]);

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
      addSchoolIsLoading ||
      (!addSchoolIsLoading && !addSchoolError && !addSchoolResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleAddSubmit = (e) => {
    handleAddSchool(e);
    handleLoadingClick();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
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
            <TitleHeader text={"Add School"} />
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
                text={"School Information "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="School Name"
                      className="UserCreateInput"
                      name="name"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="url"
                      className="UserCreateInput"
                      placeholder="School Website"
                      name="website"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="email"
                      placeholder="School Email Address"
                      className="UserCreateInput"
                      name="email"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="School Phone Number"
                      className="UserCreateInput"
                      name="phone_number"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="level"
                      required
                    >
                      <option value="">School Level</option>
                      <option value="Primary">Elementary</option>
                      <option value="JSS">JSS</option>
                      <option value="Progressive">Progressive</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      name="school_image"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload School Logo"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Location Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      className="UserCreateInput"
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
                      placeholder="City"
                      name="city"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="lga"
                      required
                    >
                      <option value="">Local Government Area</option>
                      <option value="Akoko Edo">Akoko Edo</option>
                      <option value="Egor">Egor</option>
                      <option value="Esan Central">Esan Central</option>
                      <option value="Esan North-East">Esan North-East</option>
                      <option value="Esan South-East">Esan North-East</option>
                      <option value="Esan West">Esan West</option>
                      <option value="Etsako Central">Etsako Central</option>
                      <option value="Etsako East">Etsako East</option>
                      <option value="Etsako West">Etsako West</option>
                      <option value="Igueben">Igueben</option>
                      <option value="Ikpoba Okha">Ikpoba Okha</option>
                      <option value="Oredo">Oredo</option>
                      <option value="Orhionmwon">Orhionmwon</option>
                      <option value="Ovia North East">Ovia North East</option>
                      <option value="Ovia South Wast">Ovia South Wast</option>
                      <option value="Owan East">Owan East</option>
                      <option value="Owan West">Owan West</option>
                      <option value="Uhunmwode">Uhunmwode</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Postal Code"
                      name="postal_code"
                      required
                    />
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
                        placeholder="Date Established"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Number Of Staff"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Number Of Staff"
                        className="UserCreateInput"
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
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="sumbit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save School"
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

export default AddSchool;
