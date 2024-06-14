import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./School.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import userListImage from "../../../assets/bigIcon/userList.png";
import PrimaryButton from "../../../components/Button/PrimaryButton";

function SchoolDetail() {
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
            <TitleHeader text={"View School Details"} />
          </div>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"School Information  "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Logo:<Image src={userListImage} rounded width="50" height="50" className="mx-2" /></Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Name: <b className="itemDetailText mx-2">Central Elementary School</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Level: <b className="itemDetailText mx-2">Elementary School</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Website: <b className="itemDetailText mx-2">www.ces.xyz</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Email Address: <b className="itemDetailText mx-2">ces@xyz.xyz</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">School Phone Number: <b className="itemDetailText mx-2">(+234)0123456789</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Location Details "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Address: <b className="itemDetailText mx-2">123 Main St, Anytown</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">City: <b className="itemDetailText mx-2">Anytown</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Local Government Area: <b className="itemDetailText mx-2">Esan North-East</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Postal Code: <b className="itemDetailText mx-2">123344</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Additional Information "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Date Established: <b className="itemDetailText mx-2">11th january, 1111</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Number Of Staff: <b className="itemDetailText mx-2">123</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Number Of Student : <b className="itemDetailText mx-2">456</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Custom Fields: <b className="itemDetailText mx-2">__</b> </Col>
            </Row> 
          </Row>
          <PrimaryButton text={'Edit School Data'} Primarystyle={'w-100 itemDetailEditButton'}/>
        </Container>
      </div>
    </div>
  );
}

export default SchoolDetail;
