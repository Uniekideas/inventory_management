import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
// import { useNavigate } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../context/User/UserContext";
import GeneralContext from "../../../context/General/GeneralContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { scrollToTop } from "../../../utils/HelperFunc";
import Select from "react-select";
import axios from "axios";

function EditUser() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getSingleUserIsLoading,
    getSingleUser,
    handleEditUser,
    seteditedFormData,
    editedFormData,
    editUserIsLoading,
    editUserError,
    editUserResponse,
    seteditUserError,
    seteditUserResponse,
  } = useContext(UserContext);

  const { schoolLevel } = useContext(GeneralContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const getLocations = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/location`);

      setLocations(
        response.data.data.map((location) => ({
          id: location.id,
          title: location.title,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchoolsNew();
    getLocations();
    getSingleUser(pk);
  }, []);

  useEffect(() => {
    if (!editUserIsLoading && editUserResponse) {
      navigate(`/UserDetail/${pk}`, {
        state: { message: "Edit successful!" },
      });
      seteditUserResponse(null);
    }
  }, [editUserIsLoading, editUserResponse]);

  useEffect(() => {
    if (!editUserIsLoading && editUserError) {
      scrollToTop();
      handleComfirmationPopUps(editUserError, "bg-danger");
      setButtonLoading(false);
      seteditUserError(null);
    }
  }, [editUserIsLoading, editUserError]);

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
      editUserIsLoading ||
      (!editUserIsLoading && !editUserError && !editUserResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    handleEditUser(e, pk);
    handleLoadingClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "Choose a file";

    seteditedFormData({
      ...editedFormData,
      image: file.name,
    });

    document.getElementById("fileLabel").innerText = fileName;
  };

  const handleSchoolChange = (event) => {
    setSelectedOption(event.id);
    seteditedFormData({
      ...editedFormData,
      school: event.id,
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  console.log(editedFormData);
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Edit User"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {getSingleUserIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleUserIsLoading} />
            </Container>
          ) : (
            <Form onSubmit={handleEditSubmit}>
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
                        value={editedFormData.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        className="UserCreateInput"
                        placeholder="Username"
                        defaultValue={editedFormData.username}
                        onChange={handleChange}
                        name="username"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="User ID"
                        className="UserCreateInput"
                        value={editedFormData.oracle_id}
                        onChange={handleChange}
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
                        value={editedFormData.email}
                        onChange={handleChange}
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
                        value={editedFormData.phone_number}
                        onChange={handleChange}
                        name="phone_number"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                      <Form.Select
                        className="UserCreateInput"
                        name="level"
                        value={editedFormData.level}
                        onChange={handleChange}
                        required
                      >
                        <option value="">School Level</option>
                        {schoolLevel.map((slevel) => {
                          return (
                            <option key={slevel.pk} value={slevel.type}>
                              {slevel.type}
                            </option>
                          );
                        })}
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
                  <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                    <Form.Select
                      className="UserCreateInput"
                      name="role"
                      defaultValue={editedFormData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">User Role</option>
                      <option value="qa">QA</option>
                      <option value="admin">Admin</option>
                      <option value="head-teacher">Head Techer</option>
                      <option value="subeb-user">SUBEB User</option>
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
                    <label className="my-auto flex-fill">Location</label>
                    <Form.Select
                      className="no-border shadow-none w-auto"
                      name="location"
                    >
                      <option value="">Select Location</option>
                      {locations.map((location) => {
                        return (
                          <option key={location.id} value={location.id}>
                            {location.title}
                          </option>
                        );
                      })}
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
                        onChange={handleSchoolChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                    <Form.Select
                      className="UserCreateInput"
                      name="department"
                      value={editedFormData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Department</option>
                      <option value="Admin">Admin</option>
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
                  <Button variant="success" type="submit" className="w-100 p-2">
                    {buttonLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    ) : (
                      "Save Cahanges"
                    )}
                  </Button>
                </Row>
              </Row>
            </Form>
          )}
        </Container>
      </div>
    </div>
  );
}

export default EditUser;
