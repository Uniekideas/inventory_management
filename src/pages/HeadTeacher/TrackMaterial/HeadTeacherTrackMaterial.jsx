import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./HeadTeacherTrackMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { useNavigate } from "react-router-dom";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";

function HeadTeacherTrackMaterial() {
  const navigate = useNavigate();

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
  const handleAddMovement = () => {
    navigate("/WareHouseAddMovement");
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Track"} />
            <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This Week"}
            />
          </div>
          <Row className="mb-5">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <TitleHeader
              text={"Movement Log"}
              headerTextStyle={"headerTextStyle"}
            />
            <PrimaryButton
              icon={faClockRotateLeft}
              text={"Log History"}
              Primarystyle={"pushNotificationTimer d-lg-none mb-2"}
            />
          </div>
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <PrimaryButton
                icon={faClockRotateLeft}
                text={"Log History"}
                Primarystyle={"pushNotificationTimer "}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherTrackMaterial;
