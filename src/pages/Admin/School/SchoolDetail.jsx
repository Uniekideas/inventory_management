import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./School.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import userListImage from "../../../assets/bigIcon/userList.png";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import SchoolContext from "../../../context/School/SchoolContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop, convertDate } from "../../../utils/HelperFunc";

function SchoolDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  let { pk } = useParams();

  const {
    getSingleSchool,
    getSingleSchoolData,
    getSingleSchoolIsLoading,
    deleteSchool,
    deleteSchoolResponse,
    deleteSchoolIsLoading,
    deleteSchoolError,
  } = useContext(SchoolContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getSingleSchool(pk);
  }, []);

  useEffect(() => {
    if (!deleteSchoolIsLoading && deleteSchoolResponse) {
      navigate("/SchoolsManagement", {
        state: { message: "School deleted successful!" },
      });
    }
  }, [deleteSchoolIsLoading, deleteSchoolResponse, navigate]);

  useEffect(() => {
    if (!deleteSchoolIsLoading && deleteSchoolError) {
      scrollToTop();
      handleComfirmationPopUps(deleteSchoolError, "bg-danger");
      setButtonLoading(false);
    }
  }, [deleteSchoolIsLoading, deleteSchoolError]);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    deleteSchoolIsLoading
      ? setButtonLoading(true)
      : !deleteSchoolIsLoading && deleteSchoolError
      ? setButtonLoading(true)
      : setButtonLoading(false);
  };

  const handleDeleteSubmit = () => {
    deleteSchool(pk);
    handleLoadingClick();
  };

  const handleEdit = () => {
    navigate(`/EditSchool/${pk}`);
  };

  const viewSchoolInventory = () => {
    navigate(`/SchoolInventory/${pk}`);
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
            <TitleHeader text={"View School Details"} />
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
            <div>
              <Row className="itemDetailMainRow mb-2">
                <div className="row justify-content-between">
                  <div className="col">
                    <TitleHeader
                      text={"School Information  "}
                      headerTextStyle={"headerTextStyle"}
                    />
                  </div>
                  <div className="col text-end">
                    <PrimaryButton
                      text={"Inventory"}
                      Primarystyle={"InventoryReportButton"}
                      clickEvent={() =>
                        viewSchoolInventory(getSingleSchoolData.id)
                      }
                    />
                  </div>
                </div>

                <Row className="mb-4 align-items-center">
                  {/* <Col className="itemHeaderText">School Logo:<Image src={getSingleSchoolData.school_image} rounded width="50" height="50" className="mx-2" /></Col> */}
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Name:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Level:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.level}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Website:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.website}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Email Address:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.email}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Phone Number:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.phone_number}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Location Details "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Address:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.address}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    City:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.city}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Local Government Area:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.lga}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Postal Code:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleSchoolData.postal_code}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Additional Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Date Established:{" "}
                    <b className="itemDetailText mx-2">
                      {convertDate(getSingleSchoolData.created_at)}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Number Of Staff: <b className="itemDetailText mx-2">123</b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Number Of Student :{" "}
                    <b className="itemDetailText mx-2">456</b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Custom Fields: <b className="itemDetailText mx-2">__</b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} xs={12} sm={12} className="mb-2">
                  <PrimaryButton
                    text={"Edit School Data"}
                    Primarystyle={"w-100 itemDetailEditButton"}
                    clickEvent={() => handleEdit()}
                  />
                </Col>

                <Col xl={12} lg={12} md={12} xs={12} sm={12}>
                  <Button
                    className="w-100 itemDetailEditButton bg-danger"
                    onClick={handleDeleteSubmit}
                  >
                    {buttonLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    ) : (
                      "Delete School Data"
                    )}
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default SchoolDetail;
