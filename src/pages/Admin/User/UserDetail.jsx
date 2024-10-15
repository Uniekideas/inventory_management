import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import UserContext from "../../../context/User/UserContext";
import { scrollToTop, convertDate } from "../../../utils/HelperFunc";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";

function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  let { pk } = useParams();

  const { getSingleUser, getSingleUserData, getSingleUserIsLoading } =
    useContext(UserContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");

  useEffect(() => {
    getSingleUser(pk);
  }, []);

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

  const handleEdit = () => {
    navigate(`/EditUser/${pk}`);
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
            <TitleHeader text={"View User"} />
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
          ) : getSingleUserData ? (
            <div>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={" User Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    User Image:
                    <Image
                      src={getSingleUserData.image}
                      rounded
                      width="50"
                      height="50"
                      className="mx-2"
                    />
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Full Name:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Username:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.username}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    User ID:
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.oracle_id}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Email Address:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.email}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.school}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School ID:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.school_id}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Location:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.location.title}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    School Level:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.level}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Phone Number:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.phone_number}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Account Settings "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    User Role:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.role.name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Department:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.department}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Status:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleUserData.status}
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
                    Date Employed:{" "}
                    <b className="itemDetailText mx-2">
                      {convertDate(getSingleUserData.created_at)}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Custom Fields: <b className="itemDetailText mx-2">__</b>{" "}
                  </Col>
                </Row>
              </Row>
              <PrimaryButton
                text={"Edit User Data"}
                Primarystyle={"w-100 itemDetailEditButton"}
                clickEvent={() => handleEdit()}
              />
            </div>
          ) : (
            <NonAvaliable
              textMessage={"Sorry, User not available"}
              imageWidth={"300px"}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default UserDetail;
