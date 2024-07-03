import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherPushNotification.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import PushNotification from "../../../components/Notification/PushNotification";


function HeadTeacherPushNotification() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
    const filterData = [
      {
        pk: 1,
        type: "Date",
      },
    ];
  return (
    <div>
    <NavigationHeader toggleSidebar={toggleSidebar} />
    <div className="d-flex justify-content-between">
      <HeadTeacherNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Container className="reportContainer">
        <TitleHeader text={"Push Notifications"} />

        <Row>
          <Row className="d-lg-none">
            <Col className="d-flex text-center justify-content-end mb-3">
              <PrimaryButton
                icon={faClockRotateLeft}
                text={"Notification History"}
                Primarystyle={"pushNotificationTimer "}
              />
            </Col>
          </Row>

          <Col className="d-flex justify-content-end ms-auto gap-3 mb-5">
            <Filter
              optionTitle={"Select Target Audience:"}
              options={filterData}
              defult={"All"}
            />
            <PrimaryButton
              icon={faClockRotateLeft}
              text={"Notification History"}
              Primarystyle={"pushNotificationTimer d-none d-lg-flex"}
            />
          </Col>
        </Row>
        <PushNotification />
      </Container>
    </div>
  </div>
  )
}

export default HeadTeacherPushNotification