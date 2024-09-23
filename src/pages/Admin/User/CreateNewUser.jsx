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
import Select from "react-select";
import axios from "axios";

function CreateNewUser() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
  const [schools, setSchools] = useState([]);

  const getSchoolsNew = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school/all-schools`);

      setSchools(
        response.data.schools.map((item) => ({
          id: item.school_id,
          name: item.name,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchoolsNew();
  }, []);

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
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      className="UserCreateInput"
                      name="username"
                      required
                    />
                  </Col>
                </Row>
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
                  <Col
                    className="UserCreateInput d-flex ms-2"
                    lg={6}
                    md={6}
                    xl={6}
                    sm={12}
                    xs={12}
                  >
                    <label className="my-auto flex-fill">School Level</label>
                    <Form.Select
                      className="no-border shadow-none w-auto"
                      name="level"
                      required
                    >
                      <option value="">Select Level</option>
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
            <Row>
              <TitleHeader
                text={"Account Settings"}
                headerTextStyle={"headerTextStyle"}
              />
              <Row className="mb-3">
                <Col
                  className="UserCreateInput d-flex ms-2"
                  lg={6}
                  md={6}
                  xl={6}
                  sm={12}
                  xs={12}
                >
                  <label className="my-auto flex-fill">User Role</label>
                  <Form.Select
                    className="no-border shadow-none w-auto"
                    name="role"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="qa">QA</option>
                    <option value="admin">Admin</option>
                    <option value="head-teacher">Head Techer</option>
                    <option value="warehouse-staff">WareHouse Staff</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  className="UserCreateInput d-flex ms-2"
                  lg={6}
                  md={6}
                  xl={6}
                  sm={12}
                  xs={12}
                >
                  <label className="my-auto">School</label>
                  <div className="flex-fill">
                    <Select
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? "border-0 py-2 shadow-none w-100"
                            : "border-0 py-2 w-100",
                      }}
                      name="school"
                      placeholder="Select the School"
                      options={schools}
                      getOptionLabel={(options) => options["name"]}
                      getOptionValue={(options) => options["school_id"]}
                      isSearchable
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  className="UserCreateInput d-flex ms-2"
                  lg={6}
                  md={6}
                  xl={6}
                  sm={12}
                  xs={12}
                >
                  <label className="my-auto flex-fill">Department</label>
                  <Form.Select
                    className="no-border shadow-none w-auto"
                    name="department"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  className="UserCreateInput d-flex ms-2"
                  lg={6}
                  md={6}
                  xl={6}
                  sm={12}
                  xs={12}
                >
                  <label className="my-auto flex-fill">Status</label>
                  <Form.Select
                    className="no-border shadow-none w-auto"
                    name="status"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Col>
              </Row>
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
                        type="date"
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
                    "Save User Information"
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
