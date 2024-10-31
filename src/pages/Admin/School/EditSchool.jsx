import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./School.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import GeneralContext from "../../../context/General/GeneralContext";
import SchoolContext from "../../../context/School/SchoolContext";
import Loading from "../../../components/Loading/Loading";
import { scrollToTop } from "../../../utils/HelperFunc";

function EditSchool() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getSingleSchool,
    getSingleSchoolIsLoading,
    handleEditSchool,
    seteditedFormData,
    editedFormData,
    editSchoolIsLoading,
    editSchoolError,
    editSchoolResponse,
    seteditSchoolError,
    seteditSchoolResponse,
  } = useContext(SchoolContext);

  const { lgaList } = useContext(GeneralContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getSingleSchool(pk);
  }, []);

  useEffect(() => {
    if (!editSchoolIsLoading && editSchoolResponse) {
      navigate(`/SchoolDetail/${pk}`, {
        state: { message: "Edit successful!" },
      });
      seteditSchoolResponse(null);
    }
  }, [editSchoolIsLoading, editSchoolResponse, navigate]);

  useEffect(() => {
    if (!editSchoolIsLoading && editSchoolError) {
      scrollToTop();
      handleComfirmationPopUps(editSchoolError, "bg-danger");
      setButtonLoading(false);
      seteditSchoolError(null);
    }
  }, [editSchoolIsLoading, editSchoolError]);

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
      editSchoolIsLoading ||
      (!editSchoolIsLoading && !editSchoolError && !editSchoolResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    handleEditSchool(e, pk);
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
      school_image: file.name,
    });

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
            <TitleHeader text={"Edit School"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {getSingleSchoolIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleSchoolIsLoading} />
            </Container>
          ) : (
            <Form onSubmit={handleEditSubmit}>
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
                        value={editedFormData.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="School ID/Code"
                        className="UserCreateInput"
                        name="school_id"
                        value={editedFormData.school_id}
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
                        value={editedFormData.website}
                        onChange={handleChange}
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
                        value={editedFormData.email}
                        onChange={handleChange}
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
                        value={editedFormData.phone_number}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                      <Form.Select
                        className="UserCreateInput"
                        name="level"
                        required
                        value={editedFormData.level}
                        onChange={handleChange}
                      >
                        <option value="">School Level</option>
                        <option value="Primary">Primary</option>
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
                        name="school_image"
                        ref={fileInputRef}
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
                        value={editedFormData.address}
                        onChange={handleChange}
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
                        value={editedFormData.city}
                        onChange={handleChange}
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
                        value={editedFormData.lga}
                        onChange={handleChange}
                      >
                        <option value="">Local Government Area</option>
                        {lgaList.map((lga) => (
                          <option value={lga.type} key={lgaList.pk}>
                            {lga.type}
                          </option>
                        ))}
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
                        value={editedFormData.postal_code}
                        onChange={handleChange}
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
                      "Save Changes"
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

export default EditSchool;
