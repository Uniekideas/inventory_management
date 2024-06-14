import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./User.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import userListImage from "../../../assets/bigIcon/userList.png";
import PrimaryButton from "../../../components/Button/PrimaryButton";

function UserDetail() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"User Information   "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">User Image:<Image src={userListImage} rounded width="50" height="50" className="mx-2" /></Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Full Name: <b className="itemDetailText mx-2">John Doe</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Username: <b className="itemDetailText mx-2">John Doe</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">User ID:<b className="itemDetailText mx-2">USR-001</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Email Address: <b className="itemDetailText mx-2">Johndoe@xyz.com</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Level: <b className="itemDetailText mx-2">Elementary School</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Phone Number: <b className="itemDetailText mx-2">(555) 555-1234</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Account Settings "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">User Role: <b className="itemDetailText mx-2">Admin</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Department: <b className="itemDetailText mx-2">Admin</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Status: <b className="itemDetailText mx-2">Active</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Additional Information "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Date Employed: <b className="itemDetailText mx-2">11th january, 1111</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Custom Fields: <b className="itemDetailText mx-2">__</b> </Col>
            </Row> 
          </Row>
          <PrimaryButton text={'Edit User Data'} Primarystyle={'w-100 itemDetailEditButton'}/>
        </Container>
      </div>
    </div>
  )
}

export default UserDetail