import React, { useState, useContext } from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import LogoutIcon from "../../../assets/bigIcon/logoutIcon.png";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import HeadTeacherNavigation from "../../HeadTeacher/Navigation/HeadTeacherNavigation";
import WareHouseSideNavigation from "../../WareHouseStaff/Navigation/WareHouseSideNavigation";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";

function Logout() {
  const navigate = useNavigate();

  const { handleLogOutSubmit, isAdmin, isWareHouser, isHeadTeacher } =
    useContext(AuthenticationContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickYes = () => {
    handleLogOutSubmit();
    navigate("/", { state: { message: "Logout successful!" } });
  };

  const handleClickNo = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <TitleHeader text={"Logout"} />
          <Row className="">
            <Container className="d-flex flex-column align-items-center justify-content-center">
              <Image src={LogoutIcon} className="my-3" />
              <h6 className="LogoutComfirmText text-center m-3">
                Are you sure you want to logout?
              </h6>
              <Row className="w-100">
                <Col>
                  <PrimaryButton
                    text={"Yes"}
                    Primarystyle={"bg-danger w-100 border-0"}
                    clickEvent={handleClickYes}
                  />
                </Col>
                <Col>
                  <PrimaryButton
                    text={"No"}
                    Primarystyle={"bg-success w-100 border-0"}
                    clickEvent={handleClickNo}
                  />
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Logout;
