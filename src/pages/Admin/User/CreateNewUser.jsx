import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
// import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import UserContext from "../../../context/User/UserContext";
import { scrollToTop } from "../../../utils/HelperFunc";
<<<<<<< HEAD
import axios from "axios";

function CreateNewUser() {
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [csvFile, setCsvFile] = useState(null);
=======

function CreateNewUser() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e

  const {
    handleAddUser,
    addUserIsLoading,
    addUserResponse,
    addUserError,
    setAddUserError,
    setAddUserResponse,
  } = useContext(UserContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!addUserIsLoading && addUserResponse) {
      navigate("/UserManagement", {
        state: { message: "User added successful!" },
      });
      setAddUserResponse(null);
    }
  }, [addUserIsLoading, addUserResponse, navigate]);

  useEffect(() => {
    if (!addUserIsLoading && addUserError) {
      scrollToTop();
      handleComfirmationPopUps(addUserError, "bg-danger");
      setButtonLoading(false);
    }
    setAddUserError(null);
  }, [addUserIsLoading, addUserError]);

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
      addUserIsLoading ||
      (!addUserIsLoading && !addUserError && !addUserResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleAddSubmit = (e) => {
    handleAddUser(e);
    handleLoadingClick();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
<<<<<<< HEAD

  const handleCsvSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await axios.post(`${baseUrl}/api/user/upload-users`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleCsvChange = (e)=>{
    setCsvFile(e.target.files[0])
  }
=======
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Create New User"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
<<<<<<< HEAD
            <Form onSubmit={handleCsvSubmit}>
              <h2>Upload CSV</h2>
            <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      placeholder="Full Name"
                      className="UserCreateInput"
                      name="users"
                      accept=".csv"
                      onChange={handleCsvChange}
                      
                    />
                  </Col>
                </Row>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save Users"
                  )}
                </Button>
            </Form>
=======
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
          <Form onSubmit={handleAddSubmit}>
            <Row>
              <TitleHeader
                text={"User Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="UserCreateInput"
                      name="name"
                      required
                    />
                  </Col>
                </Row>
<<<<<<< HEAD
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Username"
                      name="username"
                      required
                    />
                  </Col>
                </Row>
=======
                
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Oracle ID"
                      className="UserCreateInput"
                      name="oracle_id"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
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
                      className="UserCreateInput"
                      placeholder="Phone Number"
                      name="phone_number"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="level"
<<<<<<< HEAD
                      required
                    >
                      <option value="">School Level</option>
=======
                      required >
                      <option value="">User Category</option>
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
                      <option value="Elementery">Elementery</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="userfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                      required
                    />
                    <CustomFileInput
                      fieldName={"userfileInput"}
                      title={"Upload User Image"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
<<<<<<< HEAD
            <Row>
=======
            {/* <Row>
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
              <TitleHeader
                text={"Account Settings"}
                headerTextStyle={"headerTextStyle"}
              />
              <Row className="mb-3">
                <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                  <Form.Select className="UserCreateInput" name="role" required>
                    <option value="">User Role</option>F{" "}
                    <option value="qa">QA</option>
                    <option value="admin">Admin</option>
                    <option value="head-teacher">HeadTecher</option>
                    <option value="warehouse-staff">WareHouseStaff</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                  <Form.Select
                    className="UserCreateInput"
                    name="department"
                    required
                  >
                    <option value="">Department</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Col>
              </Row>
<<<<<<< HEAD
            </Row>
=======
            </Row> */}
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
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
                        placeholder="Date Employed"
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
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
<<<<<<< HEAD
                    "Save User"
=======
                    "Save User Information"
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
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

export default CreateNewUser;
